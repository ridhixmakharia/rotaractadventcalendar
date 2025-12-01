import React from 'react';
import { Calendar, Gift } from 'lucide-react';

const SaveTheDate = () => {
    return (
        <div className="save-the-date-banner">
            <div className="banner-content">
                <div className="event-item">
                    <Calendar className="banner-icon" size={24} />
                    <div className="text-content">
                        <span className="label">Save the Date!</span>
                        <span className="detail">Christmas Party • Dec 20th</span>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="event-item">
                    <Gift className="banner-icon" size={24} />
                    <div className="text-content">
                        <span className="label">Reminder</span>
                        <span className="detail">Register for Secret Santa!</span>
                    </div>
                </div>
            </div>

            <style>{`
                .save-the-date-banner {
                    background: linear-gradient(90deg, #1a472a, #2d5a3f);
                    border: 1px solid var(--christmas-gold);
                    border-radius: 12px;
                    padding: 15px 20px;
                    margin-bottom: var(--spacing-lg);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    position: relative;
                    overflow: hidden;
                }

                .save-the-date-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: repeating-linear-gradient(
                        90deg,
                        var(--christmas-red),
                        var(--christmas-red) 10px,
                        var(--christmas-cream) 10px,
                        var(--christmas-cream) 20px
                    );
                }

                .banner-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    flex-wrap: wrap;
                }

                .event-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .banner-icon {
                    color: var(--christmas-gold);
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                }

                .text-content {
                    display: flex;
                    flex-direction: column;
                }

                .label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--christmas-gold);
                    font-weight: bold;
                }

                .detail {
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    color: white;
                }

                .divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                }

                @media (max-width: 600px) {
                    .banner-content {
                        flex-direction: column;
                        gap: 15px;
                        align-items: flex-start;
                    }

                    .divider {
                        display: none;
                    }
                    
                    .save-the-date-banner {
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SaveTheDate;
