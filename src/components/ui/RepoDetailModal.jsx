import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Star, GitFork, ExternalLink, Github, Clock, Code,
  BookOpen, Layers, Zap, Image as ImageIcon, ChevronLeft,
  ChevronRight, Tag, Eye, Maximize2
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { ReadmeSkeleton } from './SkeletonLoader';
import { useRepoDetail } from '../../hooks/useGitHubRepos';
import { extractReadmeSection } from '../../services/githubApi';
import { GITHUB_CONFIG } from '../../config/github';
import ImageLightbox from './ImageLightbox';

// Language color mapping
const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  Markdown: '#083fa1',
};

const getLangColor = (lang) => LANG_COLORS[lang] || '#6e7681';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ─── Screenshot Gallery with Lightbox ─────────────────────────────────────────

const ScreenshotGallery = ({ screenshots }) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  const prev = () => setActive((p) => (p - 1 + screenshots.length) % screenshots.length);
  const next = () => setActive((p) => (p + 1) % screenshots.length);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="relative rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group/gallery cursor-zoom-in">
          <img
            src={screenshots[active]}
            alt={`Screenshot ${active + 1}`}
            className="w-full max-h-72 object-contain transition-transform duration-300 group-hover/gallery:scale-[1.01]"
            onError={(e) => { e.target.style.display = 'none'; }}
            onClick={() => openLightbox(active)}
          />
          {/* Fullscreen overlay hint */}
          <button
            onClick={() => openLightbox(active)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === active ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {screenshots.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {screenshots.map((shot, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  i === active
                    ? 'border-blue-500'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                <img
                  src={shot}
                  alt={`Thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <ImageLightbox
        images={screenshots}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

// ─── Tab Panel ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'readme', label: 'README', icon: BookOpen },
  { id: 'screenshots', label: 'Screenshots', icon: ImageIcon },
];

// ─── Main Modal ────────────────────────────────────────────────────────────────

const RepoDetailModal = ({ repo, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { readme, screenshots, detailLoading } = useRepoDetail(repo);

  if (!repo || !isOpen) return null;

  const { readmeSections } = GITHUB_CONFIG;

  const featuresSection = extractReadmeSection(readme, readmeSections.features);
  const installSection = extractReadmeSection(readme, readmeSections.installation);
  const techSection = extractReadmeSection(readme, readmeSections.techStack);

  const visibleTabs = TABS.filter((t) => {
    if (t.id === 'screenshots') return screenshots && screenshots.length > 0;
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* ─── Header ── */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80">
            <div className="space-y-1.5 flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 flex-wrap">
                {repo.isFeatured && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    Featured
                  </span>
                )}
                {repo.topics && repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="px-2 py-0.5 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
                    {topic}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white truncate">
                {repo.name}
              </h2>
              {repo.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ─── Stats Row ── */}
          <div className="flex items-center gap-5 px-6 py-3 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs font-mono flex-wrap">
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>{repo.stargazers_count || 0} stars</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <GitFork className="w-3.5 h-3.5 text-blue-500" />
              <span>{repo.forks_count || 0} forks</span>
            </div>
            {repo.language && (
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getLangColor(repo.language) }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </div>

          {/* ─── Tabs ── */}
          <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 ${
                    isActive
                      ? 'text-neutral-900 dark:text-white border-neutral-900 dark:border-white'
                      : 'text-neutral-500 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ─── Body ── */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* ── Overview Tab ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Languages */}
                {repo.languages && repo.languages.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {repo.languages.map((lang) => (
                        <span
                          key={lang}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getLangColor(lang) }}
                          />
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features from README */}
                {detailLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                  </div>
                ) : featuresSection ? (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Key Features
                    </h3>
                    <MarkdownRenderer content={featuresSection} />
                  </div>
                ) : null}

                {/* Installation from README */}
                {!detailLoading && installSection && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" /> Installation & Setup
                    </h3>
                    <MarkdownRenderer content={installSection} />
                  </div>
                )}

                {/* Tech Stack from README */}
                {!detailLoading && techSection && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-purple-500" /> Tech Stack
                    </h3>
                    <MarkdownRenderer content={techSection} />
                  </div>
                )}

                {/* Screenshots preview in overview */}
                {screenshots.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Screenshots
                    </h3>
                    <ScreenshotGallery screenshots={screenshots.slice(0, 2)} />
                  </div>
                )}
              </div>
            )}

            {/* ── README Tab ── */}
            {activeTab === 'readme' && (
              <div>
                {detailLoading ? (
                  <ReadmeSkeleton />
                ) : readme ? (
                  <MarkdownRenderer content={readme} />
                ) : (
                  <div className="py-12 text-center text-sm text-neutral-400">
                    No README found for this repository.
                  </div>
                )}
              </div>
            )}

            {/* ── Screenshots Tab ── */}
            {activeTab === 'screenshots' && (
              <div>
                {detailLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  </div>
                ) : screenshots.length > 0 ? (
                  <ScreenshotGallery screenshots={screenshots} />
                ) : (
                  <div className="py-12 text-center text-sm text-neutral-400">
                    No screenshots detected.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── Footer ── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <button
              onClick={onClose}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Close
            </button>
            <div className="flex items-center gap-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                View on GitHub
              </a>
              <a
                href={repo.homepage || repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RepoDetailModal;
