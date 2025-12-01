import React, { useState } from 'react';
import { Sparkles, Frown } from 'lucide-react';

const NaughtyOrNice = () => {
    const [result, setResult] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const checkStatus = () => {
        setAnalyzing(true);
        setResult(null);

        // Simulate analysis
        setTimeout(() => {
            setAnalyzing(false);
            // 70% chance of being nice
            const isNice = Math.random() > 0.3;
            setResult(isNice ? 'nice' : 'naughty');
        }, 2000);
    };

    return (
        <div className="naughty-nice-container">
            {!result && !analyzing && (
                <div className="start-screen">
                    <h3>🎅 Santa's List Checker 📜</h3>
                    <p>Place your finger on the scanner to see if you've been good this year!</p>
                    <button className="scan-btn" onClick={checkStatus}>
                        Scan Now
                    </button>
                </div>
            )}

            {analyzing && (
                <div className="analyzing">
                    <div className="scanner-line"></div>
                    <p>Scanning behavior patterns...</p>
                    <p className="sub-text">Checking cookie consumption...</p>
                </div>
            )}

            {result && (
                <div className={`result ${result}`}>
                    {result === 'nice' ? (
                        <>
                            <Sparkles size={48} className="icon nice-icon" />
                            <h3>You're on the NICE List! 😇</h3>
                            <p>Santa is proud of you! Keep up the good work!</p>
                        </>
                    ) : (
                        <>
                            <Frown size={48} className="icon naughty-icon" />
                            <h3>Uh oh... NAUGHTY List! 😈</h3>
                            <p>There's still time to turn it around before Christmas!</p>
                        </>
                    )}
                    <button className="retry-btn" onClick={() => setResult(null)}>Check Again</button>
                </div>
            )}

            <style>{`
                .naughty-nice-container {
                    text-align: center;
                    color: var(--text-primary);
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .scan-btn {
                    background: var(--christmas-red);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    font-size: 1.2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: transform 0.2s;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
                }

                .scan-btn:hover {
                    transform: scale(1.05);
                    background: #b91c1c;
                }

                .analyzing {
                    position: relative;
                    width: 100%;
                    max-width: 300px;
                    height: 200px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    border: 2px solid var(--christmas-gold);
                }

                .scanner-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--christmas-gold);
                    box-shadow: 0 0 10px var(--christmas-gold);
                    animation: scan 1.5s infinite linear;
                }

                @keyframes scan {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }

                .result {
                    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .result.nice {
                    color: #4ade80;
                }

                .result.naughty {
                    color: #f87171;
                }

                .icon {
                    margin-bottom: 15px;
                }

                .nice-icon {
                    animation: spin 3s infinite linear;
                }

                .naughty-icon {
                    animation: shake 0.5s infinite;
                }

                .retry-btn {
                    margin-top: 20px;
                    background: transparent;
                    border: 1px solid currentColor;
                    color: currentColor;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                @keyframes popIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default NaughtyOrNice;
