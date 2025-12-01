import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { ENABLE_COMING_SOON } from '../config';

const ComingSoonModal = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isVisible, setIsVisible] = useState(true);

    if (!ENABLE_COMING_SOON) return null;

    function calculateTimeLeft() {
        const targetDate = new Date('December 7, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return null;
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (!newTimeLeft) {
                setIsVisible(false);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible || !timeLeft) return null;

    return (
        <div className="coming-soon-overlay">
            <div className="coming-soon-modal">
                <div className="modal-header">
                    <Clock size={48} className="clock-icon" />
                    <h2>Coming Soon!</h2>
                </div>

                <p className="message">
                    Rotaract Bangalore Junction's Advent Calendar begins on<br />
                    <strong>December 7th, 2025</strong>
                </p>

                <div className="countdown-container">
                    <div className="time-unit">
                        <span className="number">{timeLeft.days}</span>
                        <span className="label">Days</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="time-unit">
                        <span className="number">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="label">Hours</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="time-unit">
                        <span className="number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="label">Mins</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="time-unit">
                        <span className="number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="label">Secs</span>
                    </div>
                </div>

                <p className="sub-message">Get ready for 12 days of joy, service, and fun!</p>
            </div>

            <style>{`
                .coming-soon-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 2000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                .coming-soon-modal {
                    background: linear-gradient(135deg, var(--christmas-red), #8B0000);
                    padding: 40px;
                    border-radius: 20px;
                    border: 2px solid var(--christmas-gold);
                    text-align: center;
                    color: white;
                    max-width: 500px;
                    width: 100%;
                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
                    animation: float 6s ease-in-out infinite;
                }

                .modal-header {
                    margin-bottom: 20px;
                }

                .clock-icon {
                    color: var(--christmas-gold);
                    margin-bottom: 10px;
                    animation: pulse 2s infinite;
                }

                h2 {
                    font-family: var(--font-heading);
                    font-size: 2.5rem;
                    margin: 0;
                    color: var(--christmas-gold);
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }

                .message {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }

                .countdown-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 30px;
                    font-family: monospace;
                }

                .time-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .number {
                    font-size: 2.5rem;
                    font-weight: bold;
                    background: rgba(0,0,0,0.3);
                    padding: 10px;
                    border-radius: 8px;
                    min-width: 60px;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .label {
                    font-size: 0.8rem;
                    margin-top: 5px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--christmas-gold);
                }

                .separator {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin-bottom: 25px;
                    color: var(--christmas-gold);
                }

                .sub-message {
                    font-style: italic;
                    opacity: 0.9;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @media (max-width: 480px) {
                    .countdown-container {
                        gap: 5px;
                    }
                    
                    .number {
                        font-size: 1.8rem;
                        min-width: 45px;
                        padding: 5px;
                    }

                    .separator {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ComingSoonModal;
