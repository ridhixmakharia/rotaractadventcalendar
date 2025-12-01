import React from 'react';
import { Heart } from 'lucide-react';
import SaveTheDate from './SaveTheDate';
import AboutSection from './AboutSection';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo-container">
          <h1 className="brand-title">Rotaract Bangalore Junction</h1>
          <p className="brand-subtitle">12 Days of Christmas</p>
        </div>
      </header>

      <main className="main-content">
        <SaveTheDate />
        {children}
      </main>

      <footer className="footer">
        <p>Created with <Heart size={16} fill="var(--christmas-red)" color="var(--christmas-red)" /> for Rotaract Bangalore Junction — 2025 Advent Edition</p>
        <AboutSection />
      </footer>

      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          padding: var(--spacing-xl) var(--spacing-sm);
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent);
        }

        .brand-title {
          font-size: 2.5rem;
          color: var(--christmas-gold);
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          margin-bottom: var(--spacing-xs);
        }

        .brand-subtitle {
          font-family: var(--font-body);
          color: var(--christmas-cream);
          font-size: 1.2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .main-content {
          flex: 1;
          padding: var(--spacing-md);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .footer {
          text-align: center;
          padding: var(--spacing-lg);
          color: var(--text-secondary);
          font-size: 0.9rem;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent);
        }

        .footer p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .brand-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
