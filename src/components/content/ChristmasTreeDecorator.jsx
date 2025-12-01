import React, { useState } from 'react';
import { Trash2, Save, RefreshCw } from 'lucide-react';

const ornaments = [
    { id: 'red-ball', emoji: '🔴', type: 'ball' },
    { id: 'gold-ball', emoji: '🟡', type: 'ball' },
    { id: 'blue-ball', emoji: '🔵', type: 'ball' },
    { id: 'star', emoji: '⭐', type: 'topper' },
    { id: 'light', emoji: '💡', type: 'light' },
    { id: 'candy', emoji: '🍬', type: 'candy' },
    { id: 'cane', emoji: '🦯', type: 'candy' },
    { id: 'gift', emoji: '🎁', type: 'gift' },
    { id: 'snowflake', emoji: '❄️', type: 'flake' },
];

const ChristmasTreeDecorator = () => {
    const [decorations, setDecorations] = useState([]);
    const [selectedOrnament, setSelectedOrnament] = useState(null);

    const handleTreeClick = (e) => {
        if (!selectedOrnament) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newDecoration = {
            id: Date.now(),
            emoji: selectedOrnament.emoji,
            left: `${x}%`,
            top: `${y}%`,
            scale: Math.random() * 0.4 + 0.8 // Slight size variation
        };
        setDecorations([...decorations, newDecoration]);
    };

    const clearTree = () => setDecorations([]);

    return (
        <div className="decorator-container">
            <div className="tree-area">
                <div className="tree-container" onClick={handleTreeClick}>
                    <div className="tree-layer layer-1"></div>
                    <div className="tree-layer layer-2"></div>
                    <div className="tree-layer layer-3"></div>
                    <div className="tree-trunk"></div>

                    {decorations.map(dec => (
                        <div
                            key={dec.id}
                            className="decoration-item"
                            style={{
                                left: dec.left,
                                top: dec.top,
                                transform: `translate(-50%, -50%) scale(${dec.scale})`
                            }}
                        >
                            {dec.emoji}
                        </div>
                    ))}
                </div>
            </div>

            <div className="controls-area">
                <h3>Decorate the Tree! 🎄</h3>
                <p>{selectedOrnament ? `Tap on the tree to place ${selectedOrnament.emoji}` : "Select an ornament below, then tap on the tree!"}</p>

                <div className="ornament-palette">
                    {ornaments.map(orn => (
                        <button
                            key={orn.id}
                            className={`ornament-btn ${selectedOrnament?.id === orn.id ? 'selected' : ''}`}
                            onClick={() => setSelectedOrnament(orn)}
                        >
                            {orn.emoji}
                        </button>
                    ))}
                </div>

                <div className="action-buttons">
                    <button className="action-btn clear" onClick={clearTree}>
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

                .tree-area {
                    position: relative;
                    width: 300px;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    padding-top: 20px;
                }

                .tree-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .tree-layer {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: solid transparent;
                    border-right: solid transparent;
                    border-bottom: solid var(--christmas-green);
                    filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3));
                }

                .layer-1 {
                    top: 0;
                    border-left-width: 60px;
                    border-right-width: 60px;
                    border-bottom-width: 100px;
                    z-index: 3;
                }

                .layer-2 {
                    top: 60px;
                    border-left-width: 90px;
                    border-right-width: 90px;
                    border-bottom-width: 140px;
                    z-index: 2;
                }

                .layer-3 {
                    top: 140px;
                    border-left-width: 120px;
                    border-right-width: 120px;
                    border-bottom-width: 180px;
                    z-index: 1;
                }

                .tree-trunk {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 60px;
                    background: #5D4037;
                    z-index: 0;
                }

                .decoration-item {
                    position: absolute;
                    font-size: 24px;
                    z-index: 10;
                    cursor: pointer;
                    user-select: none;
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

export default ChristmasTreeDecorator;
