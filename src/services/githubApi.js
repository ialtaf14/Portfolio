/**
 * GitHub REST API Service
 * - LocalStorage caching with configurable TTL
 * - Rate limit detection and graceful error handling
 * - README base64 decoding
 * - Screenshot detection from README + folder tree
 * - Language stats aggregation
 */

const BASE_URL = 'https://api.github.com';
const CACHE_PREFIX = 'gh_portfolio_';

// ─── Cache helpers ─────────────────────────────────────────────────────────────

const getCache = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, timestamp, timeout } = JSON.parse(raw);
    if (Date.now() - timestamp > timeout) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCache = (key, data, timeout) => {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now(), timeout })
    );
  } catch {
    // localStorage quota exceeded — skip caching silently
  }
};

export const clearCache = () => {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
};

// ─── Request builder ───────────────────────────────────────────────────────────

const buildHeaders = () => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const headers = { Accept: 'application/vnd.github.v3+json' };
  if (token && token.trim()) {
    headers['Authorization'] = `token ${token.trim()}`;
  }
  return headers;
};

const ghFetch = async (url) => {
  const res = await fetch(url, { headers: buildHeaders() });

  if (res.status === 403 || res.status === 429) {
    const remaining = res.headers.get('X-RateLimit-Remaining');
    const reset = res.headers.get('X-RateLimit-Reset');
    if (remaining === '0' && reset) {
      const resetAt = new Date(parseInt(reset, 10) * 1000).toLocaleTimeString();
      throw Object.assign(new Error(`GitHub rate limit exceeded. Resets at ${resetAt}.`), {
        code: 'RATE_LIMIT',
        resetAt,
      });
    }
    throw new Error('GitHub API access forbidden (403).');
  }

  if (res.status === 404) {
    return null; // Not found — caller handles gracefully
  }

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

// ─── Public API functions ──────────────────────────────────────────────────────

/**
 * Fetch a user's public profile.
 */
export const fetchUserProfile = async (username, cacheTimeout) => {
  const key = `user_${username}`;
  const cached = getCache(key);
  if (cached) return cached;

  const data = await ghFetch(`${BASE_URL}/users/${username}`);
  if (data) setCache(key, data, cacheTimeout);
  return data;
};

/**
 * Fetch ALL public repos for a user (handles pagination).
 */
export const fetchUserRepos = async (username, cacheTimeout) => {
  const key = `repos_${username}`;
  const cached = getCache(key);
  if (cached) return cached;

  let all = [];
  let page = 1;

  while (true) {
    const batch = await ghFetch(
      `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100&page=${page}`
    );
    if (!batch || batch.length === 0) break;
    all = [...all, ...batch];
    if (batch.length < 100) break;
    page++;
  }

  setCache(key, all, cacheTimeout);
  return all;
};

/**
 * Fetch per-language byte counts for a single repo.
 */
export const fetchRepoLanguages = async (username, repoName, cacheTimeout) => {
  const key = `langs_${username}_${repoName}`;
  const cached = getCache(key);
  if (cached) return cached;

  const data = await ghFetch(`${BASE_URL}/repos/${username}/${repoName}/languages`);
  if (data) setCache(key, data, cacheTimeout);
  return data || {};
};

/**
 * Fetch and decode README content (returns plain text or null).
 */
export const fetchRepoReadme = async (username, repoName, cacheTimeout) => {
  const key = `readme_${username}_${repoName}`;
  const cached = getCache(key);
  if (cached !== null) return cached;

  try {
    const data = await ghFetch(`${BASE_URL}/repos/${username}/${repoName}/readme`);
    if (!data || !data.content) return null;
    // GitHub returns base64 with newlines interspersed
    const decoded = atob(data.content.replace(/\n/g, ''));
    setCache(key, decoded, cacheTimeout);
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Fetch directory contents from a repo path.
 */
export const fetchRepoContents = async (username, repoName, path, cacheTimeout) => {
  const key = `contents_${username}_${repoName}_${path.replace(/\//g, '_')}`;
  const cached = getCache(key);
  if (cached !== null) return cached;

  const data = await ghFetch(
    `${BASE_URL}/repos/${username}/${repoName}/contents/${path}`
  );
  const result = Array.isArray(data) ? data : null;
  if (result !== null) setCache(key, result, cacheTimeout);
  return result;
};

/**
 * Aggregate language bytes across an array of repos.
 * Returns { Python: 45, JavaScript: 30, ... } as percentages.
 */
export const aggregateLanguages = (langMaps) => {
  const totals = {};
  for (const map of langMaps) {
    for (const [lang, bytes] of Object.entries(map || {})) {
      totals[lang] = (totals[lang] || 0) + bytes;
    }
  }
  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  if (grandTotal === 0) return {};

  return Object.fromEntries(
    Object.entries(totals)
      .map(([lang, bytes]) => [lang, Math.round((bytes / grandTotal) * 100)])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
  );
};

// ─── Screenshot Detection ──────────────────────────────────────────────────────

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const SCREENSHOT_FOLDERS = ['assets', 'images', 'screenshots', 'docs', 'media', 'demo'];

/**
 * Extract image URLs from a README markdown string.
 * Converts relative paths to raw.githubusercontent.com URLs.
 */
const extractReadmeImages = (username, repoName, readme) => {
  if (!readme) return [];
  const images = [];
  // Match ![alt](url) — both absolute and relative
  const regex = /!\[(?:[^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(readme)) !== null) {
    let url = match[1].trim().split(' ')[0]; // strip title attr
    if (!url.startsWith('http')) {
      url = url.replace(/^\.\//, '');
      url = `https://raw.githubusercontent.com/${username}/${repoName}/main/${url}`;
    }
    // Only include image extensions or known raw URLs
    if (IMAGE_EXTS.some((ext) => url.toLowerCase().includes(ext))) {
      images.push(url);
    }
  }
  return images;
};

/**
 * Scan screenshot folders in the repo tree.
 */
const scanFolderScreenshots = async (username, repoName, cacheTimeout) => {
  const found = [];
  for (const folder of SCREENSHOT_FOLDERS) {
    try {
      const contents = await fetchRepoContents(username, repoName, folder, cacheTimeout);
      if (!contents) continue;
      for (const file of contents) {
        if (
          file.type === 'file' &&
          IMAGE_EXTS.some((ext) => file.name.toLowerCase().endsWith(ext))
        ) {
          found.push(file.download_url);
        }
      }
    } catch {
      // folder doesn't exist — skip
    }
  }
  return found;
};

/**
 * Full screenshot detection: README images + folder scan.
 * Returns up to 6 deduplicated URLs.
 */
export const detectScreenshots = async (username, repoName, readme, cacheTimeout) => {
  const key = `screenshots_${username}_${repoName}`;
  const cached = getCache(key);
  if (cached) return cached;

  const readmeImages = extractReadmeImages(username, repoName, readme);
  const folderImages = await scanFolderScreenshots(username, repoName, cacheTimeout);

  const merged = [...new Set([...readmeImages, ...folderImages])].slice(0, 6);
  setCache(key, merged, cacheTimeout);
  return merged;
};

// ─── README Section Extraction ─────────────────────────────────────────────────

/**
 * Extract a named section from a markdown README string.
 * Returns the raw markdown text of that section.
 */
export const extractReadmeSection = (readme, headingKeywords) => {
  if (!readme) return null;
  const lines = readme.split('\n');
  let inSection = false;
  let sectionLevel = 0;
  const sectionLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].toLowerCase().trim();
      if (inSection && level <= sectionLevel) {
        break; // New heading at same or higher level ends the section
      }
      if (headingKeywords.some((kw) => title.includes(kw.toLowerCase()))) {
        inSection = true;
        sectionLevel = level;
        continue;
      }
    }
    if (inSection) {
      sectionLines.push(line);
    }
  }

  return sectionLines.length > 0 ? sectionLines.join('\n').trim() : null;
};
