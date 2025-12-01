import React from 'react';
import { HeartHandshake } from 'lucide-react';

const ServiceTask = ({ task }) => {
    return (
        <div className="service-task">
            <div className="icon-wrapper">
                <HeartHandshake size={64} color="var(--christmas-red)" />
            </div>
            <h3>Community Challenge</h3>
            <p>{task}</p>
            <button className="accept-btn" onClick={() => alert('Thank you for spreading joy!')}>
                I'll do it!
            </button>

            <style>{`
        .service-task {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
        }

        .icon-wrapper {
          background: var(--christmas-cream);
          padding: var(--spacing-md);
          border-radius: 50%;
          display: inline-flex;
        }

        h3 {
          color: var(--christmas-gold);
          font-size: 1.5rem;
        }

        p {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .accept-btn {
          background: var(--christmas-red);
          color: white;
          border: none;
          padding: var(--spacing-sm) var(--spacing-xl);
          border-radius: 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          transition: transform 0.2s, background 0.2s;
          margin-top: var(--spacing-sm);
        }

        .accept-btn:hover {
          background: #b91c1e;
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
};

export default ServiceTask;
