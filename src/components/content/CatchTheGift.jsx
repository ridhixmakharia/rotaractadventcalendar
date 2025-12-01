import React, { useState, useEffect, useRef } from 'react';
import { Gift } from 'lucide-react';

const CatchTheGift = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gifts, setGifts] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        let gameLoop;
        let timerInterval;

        if (isPlaying) {
            // Timer
            timerInterval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Game Loop: Spawn gifts and move them
            gameLoop = setInterval(() => {
                // Spawn new gift occasionally
                if (Math.random() < 0.1) {
                    const newGift = {
                        id: Date.now(),
                        x: Math.random() * 90, // percent
                        y: -10, // percent
                        speed: Math.random() * 1 + 0.5
                    };
                    setGifts(prev => [...prev, newGift]);
                }

                // Move gifts
                setGifts(prev => prev.map(g => ({ ...g, y: g.y + g.speed })).filter(g => g.y < 110));
            }, 50);
        }

        return () => {
            clearInterval(gameLoop);
            clearInterval(timerInterval);
        };
    }, [isPlaying]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGifts([]);
        setIsPlaying(true);
    };

    const catchGift = (id) => {
        setGifts(prev => prev.filter(g => g.id !== id));
        setScore(prev => prev + 10);
    };

    return (
        <div className="catch-game">
            <h3>Catch the Gifts! 🎁</h3>
            <div className="stats">
                <span>Score: {score}</span>
                <span>Time: {timeLeft}s</span>
            </div>

            <div className="game-area" ref={containerRef}>
                {!isPlaying && timeLeft === 30 && (
                    <button onClick={startGame} className="play-btn">Start Game</button>
                )}
                {!isPlaying && timeLeft === 0 && (
                    <div className="game-over">
                        <p>Time's Up! Final Score: {score}</p>
                        <button onClick={startGame} className="play-btn">Play Again</button>
                    </div>
                )}

                {gifts.map(gift => (
                    <div
                        key={gift.id}
                        className="falling-gift"
                        style={{ left: `${gift.x}%`, top: `${gift.y}%` }}
                        onClick={() => catchGift(gift.id)}
                    >
                        <Gift size={32} color="var(--christmas-gold)" fill="var(--christmas-red)" />
                    </div>
                ))}
            </div>

            <style>{`
                .catch-game {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .stats {
                    display: flex;
                    justify-content: space-between;
                    font-weight: bold;
                    color: var(--christmas-gold);
                }

                .game-area {
                    position: relative;
                    height: 300px;
                    background: rgba(0,0,0,0.3);
                    border: 2px solid var(--christmas-gold);
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .play-btn {
                    background: var(--christmas-green);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    z-index: 10;
                }

                .game-over {
                    text-align: center;
                    z-index: 10;
                    background: rgba(0,0,0,0.8);
                    padding: 20px;
                    border-radius: 12px;
                }

                .falling-gift {
                    position: absolute;
                    cursor: pointer;
                    transition: transform 0.1s;
                }

                .falling-gift:active {
                    transform: scale(0.9);
                }
            `}</style>
        </div>
    );
};

export default CatchTheGift;
