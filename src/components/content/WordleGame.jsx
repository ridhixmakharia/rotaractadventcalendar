import React, { useState, useEffect } from 'react';

const WORD = 'SANTA';
const MAX_GUESSES = 5;

const WordleGame = () => {
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const handleKeyDown = (e) => {
        if (gameOver) return;

        const key = e.key.toUpperCase();

        if (key === 'ENTER') {
            if (currentGuess.length !== 5) return;

            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            setCurrentGuess('');

            if (currentGuess === WORD) {
                setWon(true);
                setGameOver(true);
            } else if (newGuesses.length >= MAX_GUESSES) {
                setGameOver(true);
            }
        } else if (key === 'BACKSPACE') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentGuess, guesses, gameOver]);

    // Virtual keyboard handler
    const handleVirtualKey = (key) => {
        handleKeyDown({ key });
    };

    const getLetterStatus = (letter, index, guess) => {
        if (letter === WORD[index]) return 'correct';
        if (WORD.includes(letter)) return 'present';
        return 'absent';
    };

    return (
        <div className="wordle-game">
            <h3>Guess the Christmas Word (5 Letters)</h3>

            <div className="board">
                {[...Array(MAX_GUESSES)].map((_, i) => {
                    const guess = guesses[i] || (i === guesses.length ? currentGuess : '');
                    const isCompleted = i < guesses.length;

                    return (
                        <div key={i} className="row">
                            {[...Array(5)].map((_, j) => {
                                const letter = guess[j] || '';
                                const status = isCompleted ? getLetterStatus(letter, j, guess) : '';
                                return (
                                    <div key={j} className={`tile ${status}`}>
                                        {letter}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {gameOver && (
                <div className="message">
                    {won ? 'You got it! 🎅' : `The word was ${WORD}`}
                </div>
            )}

            <div className="keyboard">
                {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map(key => (
                    <button key={key} onClick={() => handleVirtualKey(key)}>{key}</button>
                ))}
                <button className="wide" onClick={() => handleVirtualKey('Enter')}>Enter</button>
                <button className="wide" onClick={() => handleVirtualKey('Backspace')}>⌫</button>
            </div>

            <style>{`
        .wordle-game {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
        }

        .board {
          display: grid;
          gap: 5px;
          margin-bottom: var(--spacing-md);
        }

        .row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
        }

        .tile {
          width: 40px;
          height: 40px;
          border: 2px solid var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          text-transform: uppercase;
        }

        .tile.correct { background: var(--christmas-green); border-color: var(--christmas-green); }
        .tile.present { background: var(--christmas-gold); border-color: var(--christmas-gold); }
        .tile.absent { background: var(--bg-primary); border-color: var(--bg-primary); }

        .keyboard {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
          max-width: 350px;
        }

        .keyboard button {
          padding: 8px;
          background: var(--bg-secondary);
          border: none;
          color: white;
          border-radius: 4px;
          font-weight: bold;
        }

        .keyboard button.wide {
          padding: 8px 12px;
        }

        .message {
          font-size: 1.5rem;
          color: var(--christmas-gold);
          font-weight: bold;
        }
      `}</style>
        </div>
    );
};

export default WordleGame;
