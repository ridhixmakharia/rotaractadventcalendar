import React from 'react';
import { Lock, Gift } from 'lucide-react';

const DayCard = ({ day, isUnlocked, onOpen }) => {
    return (
        <div
            className={`day-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            onClick={() => isUnlocked && onOpen(day)}
        >
            <div className="card-inner">
                <div className="card-front">
                    <span className="day-number">{day.id}</span>
                    {isUnlocked ? (
                        <Gift className="icon-unlocked" size={32} />
                    ) : (
                        <Lock className="icon-locked" size={24} />
                    )}
                </div>
                <div className="card-back">
                    <span>Open!</span>
                </div>
            </div>

            <style>{`
        .day-card {
          aspect-ratio: 1;
          perspective: 1000px;
          cursor: pointer;
          position: relative;
        }

        .day-card.locked {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .day-card:hover .card-inner {
          transform: scale(1.02);
        }

        .day-card.unlocked:hover .card-inner {
          box-shadow: 0 0 15px var(--christmas-gold);
        }

        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .card-front {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: var(--christmas-cream);
        }

        .day-card.unlocked .card-front {
          background: linear-gradient(135deg, var(--christmas-red), #a01a1c);
          border-color: var(--christmas-gold);
        }

        .day-number {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .icon-locked {
          color: var(--text-secondary);
        }

        .icon-unlocked {
          color: var(--christmas-gold);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
        </div>
    );
};

export default DayCard;
