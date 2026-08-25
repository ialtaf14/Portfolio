import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { mockData } from '../data/mockData';
import AIChatbot from './ui/AIChatbot';
import FloatingContactButton from './ui/FloatingContactButton';
import ScrollProgress from './ui/ScrollProgress';

import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import GitHubProjects from './GitHubProjects';
import GitHubStats from './GitHubStats';
import Education from './Education';
import Training from './Training';
import LearningTimeline from './LearningTimeline';
import Certifications from './Certifications';
import Contact from './Contact';

const Portfolio = ({ onOpenCommandPalette }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <ScrollProgress />
      <Header onOpenCommandPalette={onOpenCommandPalette} />

      <main id="main-content" tabIndex="-1" className="focus:outline-none">
          
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

          <ErrorBoundary>
            <LearningTimeline />
          </ErrorBoundary>

          <ErrorBoundary>
            <Certifications data={mockData.education} />
          </ErrorBoundary>

          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>

      </main>

      <Footer />
      <AIChatbot />
      <FloatingContactButton />
    </div>
  );
};

export default Portfolio;