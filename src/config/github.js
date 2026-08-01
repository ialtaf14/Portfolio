// GitHub integration configuration
// Set REACT_APP_GITHUB_TOKEN in .env to increase rate limit from 60 → 5000 req/hour

export const GITHUB_CONFIG = {
  username: 'ialtaf14',

  // Repos to pin/feature at the top (order matters)
  featuredRepos: ['RealityML', 'Nova-AI'],

  // Repos to exclude entirely (e.g. forks, private mirrors)
  excludeRepos: [],

  // Max repos to display in the grid
  maxRepos: 12,

  // Cache TTL in milliseconds (10 minutes)
  cacheTimeout: 10 * 60 * 1000,

  // Folders to scan for screenshots inside repos
  screenshotFolders: ['assets', 'images', 'screenshots', 'docs', 'media', 'demo'],

  // Allowed image extensions for screenshots
  imageExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],

  // README sections to extract (case-insensitive heading match)
  readmeSections: {
    features: ['features', 'key features', 'highlights', 'what it does'],
    installation: ['installation', 'setup', 'getting started', 'quick start'],
    usage: ['usage', 'how to use', 'demo'],
    techStack: ['tech stack', 'technologies', 'built with', 'stack'],
  },
};
