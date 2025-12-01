import React from 'react';
import { Quote } from 'lucide-react';

const QuoteCard = ({ text }) => {
    return (
        <div className="quote-card">
            <Quote size={48} className="quote-icon" />
            <p className="quote-text">{text}</p>

            <style>{`
        .quote-card {
          text-align: center;
          padding: var(--spacing-lg);
        }

        .quote-icon {
          color: var(--christmas-gold);
          margin-bottom: var(--spacing-md);
          opacity: 0.5;
        }

        .quote-text {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          line-height: 1.4;
          color: var(--christmas-cream);
        }
      `}</style>
        </div>
    );
};

export default QuoteCard;
