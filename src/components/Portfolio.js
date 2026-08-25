import React, { Suspense, lazy } from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { mockData } from '../data/mockData';
import AIChatbot from './ui/AIChatbot';
import FloatingContactButton from './ui/FloatingContactButton';
import ScrollProgress from './ui/ScrollProgress';
import Background3DCanvas from './ui/Background3DCanvas';

// Lazy load sections
const Hero                = lazy(() => import('./Hero'));
const About               = lazy(() => import('./About'));
const Skills              = lazy(() => import('./Skills'));
const GitHubProjects      = lazy(() => import('./GitHubProjects'));
const GitHubStats         = lazy(() => import('./GitHubStats'));
const Education           = lazy(() => import('./Education'));
const Training            = lazy(() => import('./Training'));
const PracticalExperience = lazy(() => import('./PracticalExperience'));
const LearningTimeline    = lazy(() => import('./LearningTimeline'));
const Certifications      = lazy(() => import('./Certifications'));
const Testimonials        = lazy(() => import('./Testimonials'));
const Contact             = lazy(() => import('./Contact'));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
  </div>
);

const Portfolio = ({ onOpenCommandPalette }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Fixed 3D Particle Background Canvas */}
      <ErrorBoundary>
        <Background3DCanvas />
      </ErrorBoundary>
      <ScrollProgress />
      <Header onOpenCommandPalette={onOpenCommandPalette} />

      <main id="main-content" tabIndex="-1" className="focus:outline-none">
        <Suspense fallback={<SectionLoader />}>

          <ErrorBoundary>
            <Hero data={mockData.personal} />
          </ErrorBoundary>

          <ErrorBoundary>
            <About data={mockData.about} />
          </ErrorBoundary>

          <ErrorBoundary>
            <Skills data={mockData.skills} />
          </ErrorBoundary>

          <ErrorBoundary>
            <GitHubProjects />
          </ErrorBoundary>

          <ErrorBoundary>
            <GitHubStats />
          </ErrorBoundary>

          <ErrorBoundary>
            <Education data={mockData.education} />
          </ErrorBoundary>

          <ErrorBoundary>
            <Training data={mockData.training} />
          </ErrorBoundary>

          {/* Practical Experience: Deloitte, QSpiders, Projects */}
          <ErrorBoundary>
            <PracticalExperience data={mockData.practicalExperience} />
          </ErrorBoundary>

          <ErrorBoundary>
            <LearningTimeline />
          </ErrorBoundary>

          <ErrorBoundary>
            <Certifications data={mockData.education} />
          </ErrorBoundary>

          {/* Social Proof & Testimonials */}
          <ErrorBoundary>
            <Testimonials data={mockData.testimonials} />
          </ErrorBoundary>

          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>

        </Suspense>
      </main>

      <Footer />
      <AIChatbot />
      <FloatingContactButton />
    </div>
  );
};

export default Portfolio;
