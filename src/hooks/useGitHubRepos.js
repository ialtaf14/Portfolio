import { useState, useEffect, useCallback } from 'react';
import {
  fetchUserRepos,
  fetchRepoLanguages,
  fetchRepoReadme,
  detectScreenshots,
  aggregateLanguages,
} from '../services/githubApi';
import { GITHUB_CONFIG } from '../config/github';

// Known screenshots mapping for candidate projects
const LOCAL_REPO_SCREENSHOTS = {
  Portfolio: [
    '/images/screenshots/01-hero.png',
    '/images/screenshots/02-recruiter-view.png',
    '/images/screenshots/03-github-stats.png',
    '/images/screenshots/04-education.png',
    '/images/screenshots/05-certifications.png',
    '/images/screenshots/06-contact.png',
  ],
  portfolio: [
    '/images/screenshots/01-hero.png',
    '/images/screenshots/02-recruiter-view.png',
    '/images/screenshots/03-github-stats.png',
    '/images/screenshots/04-education.png',
    '/images/screenshots/05-certifications.png',
    '/images/screenshots/06-contact.png',
  ],
  RealityML: ['/images/RealityML.jpg'],
  realityml: ['/images/RealityML.jpg'],
  'Nova-AI': ['/images/Nova-AI.jpg'],
  'nova-ai': ['/images/Nova-AI.jpg'],
  nova: ['/images/Nova-AI.jpg'],
  Novaflix: ['/images/NovaFlix.jpg'],
  novaflix: ['/images/NovaFlix.jpg'],
  NovaFlix: ['/images/NovaFlix.jpg'],
  NovaRecon: ['/images/RealityML.jpg'],
  novarecon: ['/images/RealityML.jpg'],
};

/**
 * Hook: useGitHubRepos
 * Fetches, filters, enriches, and returns public repos for the configured username.
 */
const useGitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [langStats, setLangStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);

  const { username, featuredRepos, excludeRepos, maxRepos, cacheTimeout } = GITHUB_CONFIG;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRateLimited(false);

    try {
      // 1. Fetch all public repos
      const allRepos = await fetchUserRepos(username, cacheTimeout);

      // 2. Filter: remove archived, excluded, and forks
      const filtered = allRepos.filter(
        (r) =>
          !r.archived &&
          !r.fork &&
          !excludeRepos.includes(r.name)
      );

      // 3. Sort: featured first, then by stars desc
      filtered.sort((a, b) => {
        const aFeatured = featuredRepos.indexOf(a.name);
        const bFeatured = featuredRepos.indexOf(b.name);
        if (aFeatured !== -1 && bFeatured !== -1) return aFeatured - bFeatured;
        if (aFeatured !== -1) return -1;
        if (bFeatured !== -1) return 1;
        return b.stargazers_count - a.stargazers_count;
      });

      // 4. Limit to maxRepos
      const limited = filtered.slice(0, maxRepos);

      // 5. Enrich: fetch languages + screenshots for each repo (parallel)
      const enriched = await Promise.all(
        limited.map(async (repo) => {
          let languages = {};
          try {
            languages = await fetchRepoLanguages(username, repo.name, cacheTimeout);
          } catch {
            // language fetch failed
          }

          let screenshots =
            LOCAL_REPO_SCREENSHOTS[repo.name] ||
            LOCAL_REPO_SCREENSHOTS[repo.name.toLowerCase()] ||
            [];

          // If no local screenshots, detect from GitHub README dynamically
          if (screenshots.length === 0) {
            try {
              const readmeText = await fetchRepoReadme(username, repo.name, cacheTimeout);
              const detected = await detectScreenshots(username, repo.name, readmeText, cacheTimeout);
              if (detected && detected.length > 0) {
                screenshots = detected;
              }
            } catch {}
          }

          // Use GitHub homepage URL if set, otherwise null (no demo button shown)
          const demoUrl =
            repo.homepage && repo.homepage.trim() !== ''
              ? repo.homepage
              : null;

          return {
            ...repo,
            languages: Object.keys(languages || {}),
            languageBytes: languages || {},
            screenshots: screenshots,
            image: screenshots[0] || null,
            homepage: demoUrl,
            isFeatured: featuredRepos.includes(repo.name),
            isPinned: featuredRepos.indexOf(repo.name) !== -1,
          };
        })
      );

      // 6. Aggregate language stats
      const allLangMaps = enriched.map((r) => r.languageBytes);
      const stats = aggregateLanguages(allLangMaps);

      setRepos(enriched);
      setLangStats(stats);
    } catch (err) {
      if (err.code === 'RATE_LIMIT') {
        setRateLimited(true);
        setError(`GitHub rate limit hit. ${err.message}`);
      } else {
        setError(err.message || 'Failed to load repositories.');
      }
    } finally {
      setLoading(false);
    }
  }, [username, featuredRepos, excludeRepos, maxRepos, cacheTimeout]);

  useEffect(() => {
    load();
  }, [load]);

  return { repos, langStats, loading, error, rateLimited, refetch: load };
};

/**
 * Hook: useRepoDetail
 * Fetches README + screenshots for a single repo on-demand.
 */
export const useRepoDetail = (repo) => {
  const [readme, setReadme] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const { username, cacheTimeout } = GITHUB_CONFIG;

  useEffect(() => {
    if (!repo) return;

    const load = async () => {
      setDetailLoading(true);
      try {
        const readmeText = await fetchRepoReadme(username, repo.name, cacheTimeout);
        setReadme(readmeText);

        let shots =
          LOCAL_REPO_SCREENSHOTS[repo.name] ||
          LOCAL_REPO_SCREENSHOTS[repo.name.toLowerCase()] ||
          [];

        if (shots.length === 0) {
          const detected = await detectScreenshots(username, repo.name, readmeText, cacheTimeout);
          if (detected && detected.length > 0) shots = detected;
        }

        setScreenshots(shots);
      } catch {
        setReadme(null);
        setScreenshots([]);
      } finally {
        setDetailLoading(false);
      }
    };

    load();
  }, [repo, username, cacheTimeout]);

  return { readme, screenshots, detailLoading };
};

export default useGitHubRepos;
