import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Star, GitFork, Clock, ExternalLink, Tag, AlertCircle,
  RefreshCw, Pin, Code, Layers, Search, Filter
} from 'lucide-react';
import useGitHubRepos from '../hooks/useGitHubRepos';
import { useRecruiter } from '../contexts/RecruiterContext';
import RepoDetailModal from './ui/RepoDetailModal';
import ProjectCardMedia from './ui/ProjectCardMedia';
import { RepoCardSkeleton } from './ui/SkeletonLoader';
import { GITHUB_CONFIG } from '../config/github';

// Language dot colors
const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', 'C++': '#f34b7d',
  Shell: '#89e051', Jupyter: '#DA5B0B', Go: '#00ADD8', Rust: '#dea584',
};
const getLangColor = (lang) => LANG_COLORS[lang] || '#6e7681';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

// ─── Error/Rate Limit Banner ────────────────────────────────────────────────────
const ErrorBanner = ({ message, rateLimited, onRetry }) => (
  <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">
        {rateLimited ? 'GitHub API Rate Limit Reached' : 'Unable to Load GitHub Repositories'}
      </div>
      <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1 leading-relaxed">
        {message}
        {!rateLimited && ' Check your internet connection or try again.'}
      </p>
    </div>
    <button
      onClick={onRetry}
      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-colors"
    >
      <RefreshCw className="w-3.5 h-3.5" />
      Retry
    </button>
  </div>
);

// ─── Repo Card ─────────────────────────────────────────────────────────────────
const RepoCard = ({ repo, onOpenDetail }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-2xl glass-panel-ultra glass-shimmer transition-all duration-300 overflow-hidden"
      style={{
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,240,255,0.2), 0 0 32px rgba(0,240,255,0.08)'
          : undefined,
      }}
    >
      {/* Card Top Media: Screenshots Carousel or Professional Placeholder */}
      <ProjectCardMedia
        images={repo.screenshots}
        fallbackImage={repo.image}
        title={repo.name}
        language={repo.language}
        isExpanded={hovered}
      />

      <div className="p-6 flex-1 flex flex-col">
        {/* Top Row: Name + Pin Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {repo.isPinned && (
              <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            )}
            <span className="text-sm font-bold text-neutral-900 dark:text-white truncate transition-colors"
              style={{ color: hovered ? '#4f8ef7' : undefined }}
            >
              {repo.name}
            </span>
          </div>
          {repo.isFeatured && (
            <span className="flex-shrink-0 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded">
              featured
            </span>
          )}
        </div>

        {/* Description — full when hovered, clamped when not */}
        <p
          className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1 mb-4 transition-all duration-300"
          style={{ WebkitLineClamp: hovered ? 'unset' : 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: hovered ? 'visible' : 'hidden' }}
        >
          {repo.description || 'No description available.'}
        </p>

        {/* Extra details: only visible on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {repo.open_issues_count !== undefined && (
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    {repo.open_issues_count} open issues
                  </span>
                )}
                {repo.size && (
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    {(repo.size / 1024).toFixed(1)} MB
                  </span>
                )}
                {repo.license?.spdx_id && (
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    {repo.license.spdx_id}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, hovered ? 6 : 4).map((topic) => (
              <motion.span
                key={topic}
                layout
                className="px-2 py-0.5 text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/8 border border-blue-500/20 rounded-full"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        )}

        {/* Bottom Stats Row */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500 border-t border-neutral-100 dark:border-neutral-800/60 pt-3 mt-auto">
          <div className="flex items-center gap-3">
            {repo.language && (
              <div className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getLangColor(repo.language) }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" />
              <span>{repo.stargazers_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3 h-3 text-blue-400" />
              <span>{repo.forks_count || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <Clock className="w-3 h-3" />
            <span>{formatDate(repo.updated_at)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            onClick={() => onOpenDetail(repo)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          <div className="flex items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 transition-colors"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                aria-label={`Live demo for ${repo.name}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const GitHubProjects = () => {
  const { isRecruiterMode } = useRecruiter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedRepo, setSelectedRepo] = useState(null);

  const { repos, loading, error, rateLimited, refetch } = useGitHubRepos();
  const { username } = GITHUB_CONFIG;

  // Filter chips options
  const FILTER_CHIPS = [
    { label: 'All', value: 'all' },
    { label: 'Python', value: 'Python' },
    { label: 'SQL', value: 'SQL' },
    { label: 'Machine Learning', value: 'Machine Learning' },
    { label: 'Power BI', value: 'Power BI' },
    { label: 'EDA', value: 'EDA' },
    { label: 'Automation', value: 'Automation' },
    { label: 'AI', value: 'AI' }
  ];

  // Filtering + Searching logic
  const filteredRepos = repos.filter((r) => {
    // Category / Filter check
    let matchesFilter = true;
    if (filter !== 'all') {
      const f = filter.toLowerCase();
      const matchLang = r.language && r.language.toLowerCase() === f;
      const matchTopics = r.topics && r.topics.some((t) => t.toLowerCase().includes(f));
      const matchName = r.name && r.name.toLowerCase().includes(f);
      const matchDesc = r.description && r.description.toLowerCase().includes(f);
      matchesFilter = matchLang || matchTopics || matchName || matchDesc;
    }

    // Search query check
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = r.name && r.name.toLowerCase().includes(q);
      const descMatch = r.description && r.description.toLowerCase().includes(q);
      const langMatch = r.language && r.language.toLowerCase().includes(q);
      const topicMatch = r.topics && r.topics.some((t) => t.toLowerCase().includes(q));
      const techMatch = r.techStack && r.techStack.some((ts) => ts.toLowerCase().includes(q));
      matchesSearch = nameMatch || descMatch || langMatch || topicMatch || techMatch;
    }

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="github-projects" className="py-24 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <Github className="w-3.5 h-3.5" />
              <span>LIVE FROM GITHUB / {username}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Open Source & Public Repositories
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Auto-fetched from GitHub REST API. Click any card to explore the README, tech stack, screenshots, and installation guide.
            </p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </a>
        </div>

        {/* Sync & Project Features Indicator Banner */}
        <div className="p-4 mb-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-semibold">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            <span>Projects automatically synchronized with GitHub</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Repo Info
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> README Documentation
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Tech Stack
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Screenshots
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Installation Guide
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Latest Updates
            </span>
          </div>
        </div>

        {/* Recruiter Mode Priority Banner */}
        {isRecruiterMode && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-mono flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-base">⭐</span>
              <span><strong>RECRUITER SELECTION ACTIVE:</strong> Highlighting top Data Analyst, ML & AI repositories with verified source code & live documentation.</span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-neutral-950 flex-shrink-0">
              Verified Stack
            </span>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-8">
            <ErrorBanner message={error} rateLimited={rateLimited} onRetry={refetch} />
          </div>
        )}

        {/* Search Input Bar + Filter Chips */}
        {!loading && !error && repos.length > 0 && (
          <div className="space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects by name, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Total count badge */}
              <div className="text-xs font-mono text-neutral-500 self-end sm:self-center">
                Showing <strong className="text-neutral-900 dark:text-white">{filteredRepos.length}</strong> of {repos.length} repositories
              </div>

            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-neutral-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {FILTER_CHIPS.map((chip) => (
                <motion.button
                  key={chip.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => setFilter(chip.value)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    filter === chip.value
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800/60'
                  }`}
                >
                  {chip.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Repo Grid */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <RepoCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredRepos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onOpenDetail={setSelectedRepo}
                />
              ))}
            </div>
          ) : !error ? (
            <div className="py-16 text-center text-sm text-neutral-400">
              No repositories match the current filter.
            </div>
          ) : null}
        </AnimatePresence>

        {/* Detail Modal */}
        <RepoDetailModal
          repo={selectedRepo}
          isOpen={!!selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      </div>
    </section>
  );
};

export default GitHubProjects;
