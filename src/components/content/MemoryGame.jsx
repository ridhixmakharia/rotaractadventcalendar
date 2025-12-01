import React, { useState, useEffect } from 'react';

const ICONS = ['🎅', '🎄', '🎁', '⛄', '🦌', '🔔'];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const shuffled = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((icon, id) => ({ id, icon }));
        setCards(shuffled);
    }, []);

    const handleClick = (id) => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);
            const firstId = flipped[0];
            const secondId = id;
            setFlipped([firstId, secondId]);

            if (cards[firstId].icon === cards[secondId].icon) {
                setSolved([...solved, firstId, secondId]);
                setFlipped([]);
                setDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    const isWon = solved.length === cards.length && cards.length > 0;

    return (
        <div className="memory-game">
            {isWon ? (
                <div className="win-message">
                    <h3>You Won! 🎄</h3>
                    <p>Merry Christmas!</p>
                </div>
            ) : (
                <div className="grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${flipped.includes(index) || solved.includes(index) ? 'flipped' : ''
                                }`}
                            onClick={() => handleClick(index)}
                        >
                            <div className="content">
                                {flipped.includes(index) || solved.includes(index) ? card.icon : '?'}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .memory-game {
          width: 100%;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .card {
          aspect-ratio: 1;
          background: var(--christmas-red);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 2rem;
          color: white;
          transition: transform 0.3s, background 0.3s;
        }

        .card.flipped {
          background: var(--christmas-cream);
          transform: rotateY(180deg);
        }

        .content {
          pointer-events: none;
        }

        .win-message {
          text-align: center;
          color: var(--christmas-gold);
          animation: bounce 1s infinite;
        }
      `}</style>
        </div>
    );
};

export default MemoryGame;
