import { useState, useEffect, useCallback } from 'react';
import { fetchUserProfile, fetchUserRepos, fetchRepoLanguages, aggregateLanguages } from '../services/githubApi';
import { GITHUB_CONFIG } from '../config/github';

/**
 * Hook: useGitHubStats
 * Fetches user profile stats + aggregated language percentages.
 *
 * Returns:
 *   profile     - GitHub user profile object
 *   langStats   - { Python: 45, JavaScript: 30, ... }
 *   totalStars  - sum of stars across all repos
 *   totalForks  - sum of forks across all repos
 *   loading     - boolean
 *   error       - error string or null
 *   rateLimited - boolean
 */
const useGitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [langStats, setLangStats] = useState({});
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);

  const { username, cacheTimeout } = GITHUB_CONFIG;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRateLimited(false);

    try {
      // Fetch profile and repos in parallel
      const [userProfile, allRepos] = await Promise.all([
        fetchUserProfile(username, cacheTimeout),
        fetchUserRepos(username, cacheTimeout),
      ]);

      setProfile(userProfile);

      if (allRepos && allRepos.length > 0) {
        // Compute total stars and forks
        const stars = allRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const forks = allRepos.reduce((s, r) => s + (r.forks_count || 0), 0);
        setTotalStars(stars);
        setTotalForks(forks);

        // Fetch languages for top 10 repos to aggregate (avoid API overuse)
        const topRepos = allRepos
          .filter((r) => !r.archived && !r.fork)
          .slice(0, 10);

        const langMaps = await Promise.all(
          topRepos.map(async (repo) => {
            try {
              return await fetchRepoLanguages(username, repo.name, cacheTimeout);
            } catch {
              return {};
            }
          })
        );

        setLangStats(aggregateLanguages(langMaps));
      }
    } catch (err) {
      if (err.code === 'RATE_LIMIT') {
        setRateLimited(true);
        setError(err.message);
      } else {
        setError(err.message || 'Failed to load GitHub stats.');
      }
    } finally {
      setLoading(false);
    }
  }, [username, cacheTimeout]);

  useEffect(() => {
    load();
  }, [load]);

  return { profile, langStats, totalStars, totalForks, loading, error, rateLimited, refetch: load };
};

export default useGitHubStats;
