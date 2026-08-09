import { useState, useEffect, useCallback } from 'react';
import {
  fetchUserRepos,
  fetchRepoLanguages,
  fetchRepoReadme,
  detectScreenshots,
  aggregateLanguages,
} from '../services/githubApi';
import { GITHUB_CONFIG } from '../config/github';


// Known screenshots mapping — uses real GitHub raw URLs from repo READMEs/folders
const LOCAL_REPO_SCREENSHOTS = {
  // Portfolio — local screenshots
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

  // RealityML — no images in README/repo, use local fallback
  RealityML: ['/images/RealityML.jpg'],
  realityml: ['/images/RealityML.jpg'],

  // Nova-AI — screenshots from main/screenshots folder
  'Nova-AI': [
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_3_welcome.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_1_vision.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_2_chat.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_4_maps.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_5_models.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_6_coding.png',
  ],
  'nova-ai': [
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_3_welcome.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_1_vision.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_2_chat.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_4_maps.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_5_models.png',
    'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_6_coding.png',
  ],

  // Novaflix — real screenshots from the repo's screenshots/ folder
  Novaflix: [
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/discover_page.jpg',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/movie_details.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/smart_recommendations.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/messages_page.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/user_profile.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/anime_collection.png',
  ],
  novaflix: [
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/discover_page.jpg',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/movie_details.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/smart_recommendations.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/messages_page.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/user_profile.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/anime_collection.png',
  ],
  NovaFlix: [
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/discover_page.jpg',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/movie_details.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/smart_recommendations.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/messages_page.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/user_profile.png',
    'https://raw.githubusercontent.com/ialtaf14/Novaflix/main/screenshots/anime_collection.png',
  ],

  // NovaRecon — real screenshots from the repo's docs/screenshots/ folder
  NovaRecon: [
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/dashboard.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/ip_lookup.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/username_scan.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/threat_alerts.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/settings.jpg',
  ],
  novarecon: [
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/dashboard.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/ip_lookup.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/username_scan.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/threat_alerts.jpg',
    'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/settings.jpg',
  ],
};


const CUSTOM_REPO_DESCRIPTIONS = {
  Portfolio: "Altaf Khan's official interactive Data Analyst portfolio built with React 19, Tailwind CSS, Framer Motion, and GitHub API integration featuring AI recruiter decks, live repo analytics, and skill pivot charts.",
  portfolio: "Altaf Khan's official interactive Data Analyst portfolio built with React 19, Tailwind CSS, Framer Motion, and GitHub API integration featuring AI recruiter decks, live repo analytics, and skill pivot charts.",
  'Nova-AI': "Nova AI is an advanced hybrid personal AI assistant combining local Ollama AI models, Google Live Web Search, Multimodal Vision Q&A, Voice interaction, interactive Google Maps, and an iOS Glassmorphic Web UI.",
  'nova-ai': "Nova AI is an advanced hybrid personal AI assistant combining local Ollama AI models, Google Live Web Search, Multimodal Vision Q&A, Voice interaction, interactive Google Maps, and an iOS Glassmorphic Web UI.",
  ialtaf14: "Official GitHub Profile README for Altaf Khan (ialtaf14) — Data Analyst & Python/SQL developer showcasing core technical skills, machine learning projects, SQL queries, and career achievements.",
  'ialtaf14/ialtaf14': "Official GitHub Profile README for Altaf Khan (ialtaf14) — Data Analyst & Python/SQL developer showcasing core technical skills, machine learning projects, SQL queries, and career achievements.",
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

      // 2. Filter out excluded repos & forks if needed
      const filtered = allRepos.filter(
        (repo) => !excludeRepos.includes(repo.name)
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
            description: CUSTOM_REPO_DESCRIPTIONS[repo.name] || repo.description || 'Data Analytics & Data Science repository by Altaf Khan.',
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
