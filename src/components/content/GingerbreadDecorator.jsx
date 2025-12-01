import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const decorationsList = [
    { id: 'eye', emoji: '⚫', type: 'face' },
    { id: 'smile', emoji: '👄', type: 'face' },
    { id: 'button-red', emoji: '🔴', type: 'button' },
    { id: 'button-green', emoji: '🟢', type: 'button' },
    { id: 'bowtie', emoji: '🎀', type: 'accessory' },
    { id: 'heart', emoji: '❤️', type: 'accessory' },
    { id: 'star', emoji: '⭐', type: 'accessory' },
];

const GingerbreadDecorator = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleGingerbreadClick = (e) => {
        if (!selectedItem) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newItem = {
            id: Date.now(),
            emoji: selectedItem.emoji,
            left: `${x}%`,
            top: `${y}%`,
        };
        setItems([...items, newItem]);
    };

    const clearItems = () => setItems([]);

    return (
        <div className="decorator-container">
            <div className="gingerbread-area">
                <div className="gingerbread-man" onClick={handleGingerbreadClick}>
                    <div className="head"></div>
                    <div className="body"></div>
                    <div className="arm left"></div>
                    <div className="arm right"></div>
                    <div className="leg left"></div>
                    <div className="leg right"></div>

                    {items.map(item => (
                        <div
                            key={item.id}
                            className="decoration-item"
                            style={{
                                left: item.left,
                                top: item.top,
                            }}
                        >
                            {item.emoji}
                        </div>
                    ))}
                </div>
            </div>

            <div className="controls-area">
                <h3>Decorate the Gingerbread Man! 🍪</h3>
                <p>{selectedItem ? `Tap on the Gingerbread Man to place ${selectedItem.emoji}` : "Select an item below, then tap to place!"}</p>

                <div className="ornament-palette">
                    {decorationsList.map(dec => (
                        <button
                            key={dec.id}
                            className={`ornament-btn ${selectedItem?.id === dec.id ? 'selected' : ''}`}
                            onClick={() => setSelectedItem(dec)}
                        >
                            {dec.emoji}
                        </button>
                    ))}
                </div>

                <div className="action-buttons">
                    <button className="action-btn clear" onClick={clearItems}>
                        <Trash2 size={18} /> Clear
                    </button>
                </div>
            </div>

            <style>{`
                .decorator-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    width: 100%;
                }

                .gingerbread-area {
                    position: relative;
                    width: 300px;
                    height: 350px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .gingerbread-man {
                    position: relative;
                    width: 200px;
                    height: 300px;
                }

                .gingerbread-man div {
                    background: #D2691E; /* Chocolate */
                    position: absolute;
                    border-radius: 20px;
                    box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2);
                }

                .head {
                    width: 80px;
                    height: 80px;
                    top: 0;
                    left: 60px;
                    border-radius: 50% !important;
                    z-index: 2;
                }

                .body {
                    width: 90px;
                    height: 120px;
                    top: 75px;
                    left: 55px;
                    z-index: 1;
                    border-radius: 30px !important;
                }

                .arm {
                    width: 80px;
                    height: 35px;
                    top: 90px;
                    z-index: 0;
                }

                .arm.left {
                    left: -10px;
                    transform: rotate(20deg);
                }

                .arm.right {
                    right: -10px;
                    transform: rotate(-20deg);
                }

                .leg {
                    width: 35px;
                    height: 90px;
                    top: 180px;
                    z-index: 0;
                }

                .leg.left {
                    left: 65px;
                    transform: rotate(15deg);
                }

                .leg.right {
                    right: 65px;
                    transform: rotate(-15deg);
                }

                .decoration-item {
                    position: absolute;
                    font-size: 24px;
                    z-index: 10;
                    transform: translate(-50%, -50%);
                    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .controls-area {
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 16px;
                    text-align: center;
                    width: 100%;
                }

                .ornament-palette {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    margin: 15px 0;
                }

                .ornament-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    font-size: 24px;
                    padding: 8px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.2s;
                }

                .ornament-btn:hover {
                    transform: scale(1.1);
                    background: rgba(255,255,255,0.3);
                }

                .ornament-btn.selected {
                    background: var(--christmas-gold);
                    transform: scale(1.2);
                    box-shadow: 0 0 10px var(--christmas-gold);
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }

                .action-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 20px;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                    transition: opacity 0.2s;
                }

                .action-btn.clear {
                    background: #ef4444;
                    color: white;
                }

                .action-btn:hover {
                    opacity: 0.9;
                }

                @keyframes popIn {
                    from { transform: translate(-50%, -50%) scale(0); }
                    to { transform: translate(-50%, -50%) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default GingerbreadDecorator;
