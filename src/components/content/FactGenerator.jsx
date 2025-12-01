import React, { useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

const facts = [
    "Jingle Bells was originally written for Thanksgiving, not Christmas!",
    "The tradition of Christmas stockings comes from a legend about St. Nicholas putting gold coins in socks drying by the fire.",
    "In Japan, it is a tradition to eat KFC for Christmas dinner.",
    "The first artificial Christmas trees were made in Germany in the 19th century using dyed goose feathers.",
    "Rudolph the Red-Nosed Reindeer was created by a department store (Montgomery Ward) as a marketing gimmick.",
    "The tallest Christmas tree ever displayed was in Seattle, Washington, in 1950. It was 221 feet tall!",
    "All the gifts in the song 'The Twelve Days of Christmas' would equal 364 gifts.",
    "Spider webs are common Christmas tree decorations in Poland because of a legend that a spider wove a blanket for Baby Jesus.",
    "Santa Claus has his own postal code in Canada: H0H 0H0.",
    "The Statue of Liberty was the largest Christmas gift ever given (from France to the US in 1886)."
];

const FactGenerator = () => {
    const [currentFact, setCurrentFact] = useState(facts[Math.floor(Math.random() * facts.length)]);
    const [isAnimating, setIsAnimating] = useState(false);

    const getNewFact = () => {
        setIsAnimating(true);
        setTimeout(() => {
            let newFact;
            do {
                newFact = facts[Math.floor(Math.random() * facts.length)];
            } while (newFact === currentFact);

            setCurrentFact(newFact);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="fact-container">
            <div className="fact-header">
                <Lightbulb size={32} className="bulb-icon" />
                <h3>Did You Know?</h3>
            </div>

            <div className={`fact-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <p>"{currentFact}"</p>
            </div>

            <button className="next-fact-btn" onClick={getNewFact}>
                <RefreshCw size={18} className={isAnimating ? 'spinning' : ''} />
                Another Fact
            </button>

            <style>{`
                .fact-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 10px;
                }

                .fact-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    color: var(--christmas-gold);
                }

                .bulb-icon {
                    filter: drop-shadow(0 0 5px var(--christmas-gold));
                }

                .fact-card {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    min-height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    font-size: 1.1rem;
                    line-height: 1.5;
                    transition: opacity 0.3s;
                }

                .fade-out {
                    opacity: 0;
                }

                .fade-in {
                    opacity: 1;
                }

                .next-fact-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--christmas-green);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background 0.2s;
                }

                .next-fact-btn:hover {
                    background: #15803d;
                }

                .spinning {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default FactGenerator;
