import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Download, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import CertificateModal from './ui/CertificateModal';
import MagneticCard from './ui/MagneticCard';

const Certifications = ({ data }) => {
  const certificationsList = (data && data.certifications) || [];
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-24 relative bg-neutral-50/50 dark:bg-neutral-950/50 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>VERIFIED INDUSTRY CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            NPTEL & Cisco Accredited Credentials
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All credentials are fully verified with official PDF certificates and transcript records available for immediate viewing or download.
          </p>
        </div>

        {/* Certifications Card Matrix */}
        <div className="grid md:grid-cols-2 gap-6">
          {certificationsList.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <MagneticCard maxTilt={4} className="h-full">
                <div
                  className="p-6 sm:p-8 rounded-2xl glass-panel-ultra glass-shimmer flex flex-col justify-between h-full transition-all duration-300 border border-neutral-200/80 dark:border-white/[0.08] hover:border-amber-500/40 shadow-sm"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  <div className="space-y-4">
                    {/* Header Badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wide uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                        <ShieldCheck className="w-3 h-3 text-amber-500" />
                        <span>{cert.issuer} Verified</span>
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        {cert.date}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2">
                        {cert.description}
                      </p>
                    </div>

                    {/* Credential ID tag */}
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono text-neutral-500">
                      <span>Credential ID:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">{cert.credentialId}</span>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                      <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>View PDF Certificate</span>
                    </button>

                    <a
                      href={cert.downloadUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      aria-label={`Download ${cert.name} PDF`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>

        {/* Certificate Modal */}
        <CertificateModal
          certificate={selectedCert}
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
        />

      </div>
    </section>
  );
};

export default Certifications;
