import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // If Webpack chunk failed to load due to dev server re-build / stale cache, auto-reload once to fetch fresh bundle
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      (error?.message && error.message.includes('Loading chunk')) ||
      (error?.message && error.message.includes('Unexpected token'));

    if (isChunkError) {
      const chunkReloadKey = 'chunk_reload_timestamp';
      const lastReload = sessionStorage.getItem(chunkReloadKey);
      const now = Date.now();

      // Prevent infinite reload loop (reload only if not reloaded in the last 10 seconds)
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(chunkReloadKey, now.toString());
        window.location.reload();
        return;
      }
    }
  }

  handleReset = () => {
    // Clear chunk reload key and reload
    sessionStorage.removeItem('chunk_reload_timestamp');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.name === 'ChunkLoadError' ||
        (this.state.error?.message && this.state.error.message.includes('Loading chunk'));

      return (
        <div className="p-8 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-center space-y-4 my-8">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              {isChunkError ? 'New Update Available' : 'Something went wrong loading this section'}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              {isChunkError
                ? 'The application was recently updated. Click below to refresh and load the latest bundle.'
                : 'An unexpected error occurred while rendering this component.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isChunkError ? 'Refresh Page' : 'Try Again'}</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
