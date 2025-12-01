import React, { useState } from 'react';

const Quiz = ({ data }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple guesses
        setSelectedOption(option);
        setIsCorrect(option === data.answer);
    };

    return (
        <div className="quiz-container">
            <h3 className="question">{data.question}</h3>
            <div className="options-grid">
                {data.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${selectedOption === option
                                ? (option === data.answer ? 'correct' : 'wrong')
                                : ''
                            } ${selectedOption && option === data.answer ? 'correct' : ''}`}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!selectedOption}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {selectedOption && (
                <div className={`result-message ${isCorrect ? 'success' : 'error'}`}>
                    {isCorrect ? 'Correct! 🎉' : 'Oops! Try again next time.'}
                </div>
            )}

            <style>{`
        .quiz-container {
          text-align: center;
        }
        
        .question {
          font-size: 1.5rem;
          color: var(--christmas-cream);
          margin-bottom: var(--spacing-lg);
        }

        .options-grid {
          display: grid;
          gap: var(--spacing-sm);
        }

        .option-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
          padding: var(--spacing-md);
          color: white;
          border-radius: 8px;
          font-size: 1.1rem;
          transition: all 0.2s;
        }

        .option-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .option-btn.correct {
          background: var(--christmas-green);
          border-color: #4ade80;
        }

        .option-btn.wrong {
          background: var(--christmas-red);
          border-color: #f87171;
        }

        .result-message {
          margin-top: var(--spacing-md);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .result-message.success { color: var(--christmas-green); }
        .result-message.error { color: var(--christmas-red); }
      `}</style>
        </div>
    );
};

export default Quiz;
