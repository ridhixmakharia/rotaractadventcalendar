import React, { useState, useEffect, useRef } from 'react';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonSays = () => {
    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIdx, setPlayingIdx] = useState(0);
    const [userTurn, setUserTurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [flashColor, setFlashColor] = useState('');

    useEffect(() => {
        if (playing) {
            if (playingIdx < sequence.length) {
                const color = sequence[playingIdx];
                setFlashColor(color);
                const timer = setTimeout(() => {
                    setFlashColor('');
                    const pauseTimer = setTimeout(() => {
                        setPlayingIdx(playingIdx + 1);
                    }, 250); // Pause between flashes
                    return () => clearTimeout(pauseTimer);
                }, 500); // Flash duration
                return () => clearTimeout(timer);
            } else {
                // Sequence finished, user's turn
                setPlaying(false);
                setUserTurn(true);
                setPlayingIdx(0);
            }
        }
    }, [playing, playingIdx, sequence]);

    const startGame = () => {
        setSequence([colors[Math.floor(Math.random() * 4)]]);
        setPlaying(true);
        setPlayingIdx(0);
        setUserTurn(false);
        setGameOver(false);
        setScore(0);
    };

    const handleColorClick = (color) => {
        if (!userTurn || gameOver) return;

        // Flash clicked color briefly
        setFlashColor(color);
        setTimeout(() => setFlashColor(''), 200);

        if (color === sequence[playingIdx]) {
            if (playingIdx === sequence.length - 1) {
                // Completed sequence correctly
                setScore(score + 1);
                setUserTurn(false);
                setTimeout(() => {
                    setSequence([...sequence, colors[Math.floor(Math.random() * 4)]]);
                    setPlaying(true);
                    setPlayingIdx(0);
                }, 1000);
            } else {
                setPlayingIdx(playingIdx + 1);
            }
        } else {
            setGameOver(true);
            setUserTurn(false);
        }
    };

    return (
        <div className="simon-game">
            <h3>Simon Says 🔔</h3>
            <p>Watch the lights and repeat the pattern!</p>

            <div className="game-board">
                <div
                    className={`simon-btn red ${flashColor === 'red' ? 'active' : ''}`}
                    onClick={() => handleColorClick('red')}
                ></div>
                <div
                    className={`simon-btn green ${flashColor === 'green' ? 'active' : ''}`}
                    onClick={() => handleColorClick('green')}
                ></div>
                <div
                    className={`simon-btn blue ${flashColor === 'blue' ? 'active' : ''}`}
                    onClick={() => handleColorClick('blue')}
                ></div>
                <div
                    className={`simon-btn yellow ${flashColor === 'yellow' ? 'active' : ''}`}
                    onClick={() => handleColorClick('yellow')}
                ></div>
            </div>

            <div className="status-area">
                {!playing && !userTurn && !gameOver && (
                    <button onClick={startGame} className="start-btn">Start Game</button>
                )}
                {playing && <p>Watch...</p>}
                {userTurn && <p>Your Turn!</p>}
                {gameOver && (
                    <div className="game-over">
                        <p>Game Over! Score: {score}</p>
                        <button onClick={startGame} className="start-btn">Try Again</button>
                    </div>
                )}
            </div>

            <style>{`
                .simon-game {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                .game-board {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    background: #333;
                    padding: 10px;
                    border-radius: 50%;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                }

                .simon-btn {
                    width: 80px;
                    height: 80px;
                    border-radius: 10px;
                    cursor: pointer;
                    opacity: 0.4;
                    transition: opacity 0.1s, transform 0.1s;
                }

                .simon-btn:active {
                    transform: scale(0.95);
                }

                .simon-btn.active {
                    opacity: 1;
                    box-shadow: 0 0 20px currentColor;
                }

                .red { background-color: #ff4444; color: #ff4444; border-top-left-radius: 100%; }
                .green { background-color: #44ff44; color: #44ff44; border-top-right-radius: 100%; }
                .blue { background-color: #4444ff; color: #4444ff; border-bottom-left-radius: 100%; }
                .yellow { background-color: #ffff44; color: #ffff44; border-bottom-right-radius: 100%; }

                .start-btn {
                    background: var(--christmas-gold);
                    color: var(--christmas-red);
                    border: none;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .game-over {
                    color: #ff4444;
                    font-weight: bold;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default SimonSays;
