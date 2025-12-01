import React, { useState } from 'react';
import Modal from './Modal';
import { Info } from 'lucide-react';

const AboutSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="about-btn" onClick={() => setIsOpen(true)}>
                <Info size={16} /> About
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="About Us">
                <div className="about-content">
                    <p>
                        Welcome to the <strong>Rotaract Bangalore Junction</strong> 12-Day Advent Calendar!
                    </p>
                    <p>
                        This digital experience was crafted to bring joy, community spirit, and a little bit of challenge to your holiday season.
                    </p>
                    <p>
                        Each day unlocks a new surprise—from games to community service tasks—designed to embody the spirit of giving and celebration.
                    </p>
                    <p className="credits">
                        Built with ❤️ for RBJ.
                    </p>
                </div>
            </Modal>

            <style>{`
        .about-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.5rem;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .about-btn:hover {
          color: var(--christmas-gold);
        }

        .about-content p {
          margin-bottom: var(--spacing-md);
          line-height: 1.6;
          color: var(--christmas-cream);
        }

        .credits {
          font-style: italic;
          text-align: center;
          margin-top: var(--spacing-lg);
          color: var(--text-secondary);
        }
      `}</style>
        </>
    );
};

export default AboutSection;
