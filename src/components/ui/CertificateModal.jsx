import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Award, FileText, CheckCircle } from 'lucide-react';

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  if (!certificate || !isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white leading-snug">
                  {certificate.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {certificate.issuer} • Issued {certificate.date}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / PDF Preview */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden min-h-[400px] flex items-center justify-center">
              <iframe
                src={certificate.pdfUrl}
                title={certificate.name}
                className="w-full h-[500px] border-0"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 space-y-1">
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Credential ID</div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{certificate.credentialId}</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 space-y-1">
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Domain Category</div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{certificate.category}</div>
              </div>
            </div>

            {certificate.description && (
              <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {certificate.description}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open PDF in New Tab
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                Close
              </button>
              <a
                href={certificate.downloadUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertificateModal;
