import React, { useState } from 'react';
import { Leaf, CheckCircle } from 'lucide-react';

const challenges = [
    "Take a shorter shower (under 5 mins).",
    "Recycle everything you can today.",
    "Avoid single-use plastics today."
];

const CarbonChallenge = () => {
    const [challenge, setChallenge] = useState(challenges[Math.floor(Math.random() * challenges.length)]);
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
    };

    return (
        <div className="carbon-challenge">
            <div className="icon-container">
                <Leaf size={48} color="var(--christmas-green)" />
            </div>
            <h3>Carbon Footprint Challenge 🌍</h3>
            <p className="challenge-text">{challenge}</p>

            {!accepted ? (
                <button onClick={handleAccept} className="accept-btn">
                    Accept Challenge
                </button>
            ) : (
                <div className="accepted-message">
                    <CheckCircle size={24} color="var(--christmas-green)" />
                    <span>Challenge Accepted! Good luck!</span>
                </div>
            )}

            <style>{`
                .carbon-challenge {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    border: 1px solid var(--christmas-green);
                }

                .icon-container {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 15px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .challenge-text {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: var(--christmas-cream);
                    line-height: 1.4;
                }

                .accept-btn {
                    background: var(--christmas-green);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .accept-btn:hover {
                    transform: scale(1.05);
                }

                .accepted-message {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--christmas-green);
                    font-weight: bold;
                    animation: fadeIn 0.5s ease-in;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default CarbonChallenge;
