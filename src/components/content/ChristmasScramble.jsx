import React, { useState, useEffect } from 'react';
import { Shuffle, Check, RefreshCw } from 'lucide-react';

const words = [
    { original: 'SNOWMAN', hint: 'Made of frozen water and has a carrot nose' },
    { original: 'REINDEER', hint: 'Pulls Santa\'s sleigh' },
    { original: 'STOCKING', hint: 'Hung by the chimney with care' },
    { original: 'MISTLETOE', hint: 'Stand under this for a kiss' },
    { original: 'GINGERBREAD', hint: 'A tasty cookie man' },
    { original: 'ORNAMENT', hint: 'Decorates the tree' },
    { original: 'SLEIGH', hint: 'Santa\'s vehicle' },
];

const ChristmasScramble = () => {
    const [currentWord, setCurrentWord] = useState(null);
    const [scrambled, setScrambled] = useState('');
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        newGame();
    }, []);

    const newGame = () => {
        const random = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(random);
        setScrambled(scrambleWord(random.original));
        setGuess('');
        setMessage('');
        setIsCorrect(false);
    };

    const scrambleWord = (word) => {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    };

    const checkGuess = () => {
        if (guess.toUpperCase() === currentWord.original) {
            setMessage('Correct! 🎉');
            setIsCorrect(true);
        } else {
            setMessage('Try again! ❌');
        }
    };

    if (!currentWord) return <div>Loading...</div>;

    return (
        <div className="scramble-game">
            <h3>Christmas Scramble 🎄</h3>
            <p className="hint">Hint: {currentWord.hint}</p>

            <div className="scrambled-word">
                {scrambled.split('').map((char, i) => (
                    <span key={i} className="char-box">{char}</span>
                ))}
            </div>

            <div className="input-area">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type your guess..."
                    disabled={isCorrect}
                    onKeyDown={(e) => e.key === 'Enter' && !isCorrect && checkGuess()}
                />
                <button onClick={checkGuess} disabled={isCorrect || !guess} className="check-btn">
                    <Check size={20} />
                </button>
            </div>

            {message && <p className={`message ${isCorrect ? 'success' : 'error'}`}>{message}</p>}

            {isCorrect && (
                <button onClick={newGame} className="play-again-btn">
                    <RefreshCw size={18} /> Play Again
                </button>
            )}

            <style>{`
                .scramble-game {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    width: 100%;
                    max-width: 400px;
                }

                .hint {
                    color: var(--christmas-gold);
                    font-style: italic;
                    font-size: 0.9rem;
                }

                .scrambled-word {
                    display: flex;
                    gap: 5px;
                    justify-content: center;
                    margin: 10px 0;
                    flex-wrap: wrap;
                }

                .char-box {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid var(--christmas-gold);
                    color: white;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    font-weight: bold;
                    font-family: monospace;
                    font-size: 1.2rem;
                }

                .input-area {
                    display: flex;
                    gap: 10px;
                    width: 100%;
                }

                input {
                    flex: 1;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.3);
                    background: rgba(0,0,0,0.2);
                    color: white;
                    font-size: 1rem;
                    text-transform: uppercase;
                }

                input:focus {
                    outline: none;
                    border-color: var(--christmas-gold);
                }

                .check-btn {
                    background: var(--christmas-green);
                    border: none;
                    color: white;
                    padding: 0 15px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .check-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .message {
                    font-weight: bold;
                    min-height: 24px;
                }

                .message.success { color: #4ade80; }
                .message.error { color: #f87171; }

                .play-again-btn {
                    background: var(--christmas-red);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default ChristmasScramble;
