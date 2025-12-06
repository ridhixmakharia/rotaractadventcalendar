import React, { useState } from 'react';
import DayCard from './DayCard';
import Modal from './Modal';
import QuoteCard from './content/QuoteCard';
import ServiceTask from './content/ServiceTask';
import Quiz from './content/Quiz';
import MemoryGame from './content/MemoryGame';
import WordleGame from './content/WordleGame';
import NaughtyOrNice from './content/NaughtyOrNice';
import FactGenerator from './content/FactGenerator';
import ChristmasTreeDecorator from './content/ChristmasTreeDecorator';
import GingerbreadDecorator from './content/GingerbreadDecorator';
import ChristmasScramble from './content/ChristmasScramble';
import SimonSays from './content/SimonSays';
import CatchTheGift from './content/CatchTheGift';
import CarbonChallenge from './content/CarbonChallenge';
import { adventData } from '../utils/contentData';
import { ENABLE_COMING_SOON } from '../config';

const AdventGrid = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper to check if a day is unlocked
    // Starts Dec 1, 2025. Day 1 = Dec 1, Day 12 = Dec 12.
    const isDayUnlocked = (dayId) => {
        // If coming soon mode is disabled (Test Mode), unlock everything
        if (!ENABLE_COMING_SOON) return true;

        const today = new Date();
        const currentYear = today.getFullYear();

        // Target start date: Dec 7, 2025
        const targetYear = 2025;
        const startMonth = 11; // December is 11
        const startDay = 7;

        // If we are not in 2025 yet, everything is locked
        if (currentYear < targetYear) return false;

        // If we are past 2025, everything is unlocked
        if (currentYear > targetYear) return true;

        // We are in 2025. Check month.
        const currentMonth = today.getMonth();
        if (currentMonth < startMonth) return false; // Before December

        // We are in Dec 2025. Check day.
        const currentDay = today.getDate();
        const unlockDay = startDay + (dayId - 1);

        return currentDay >= unlockDay;
    };

    const handleOpenDay = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDay(null);
    };

    const renderContent = (day) => {
        if (!day) return null;
        switch (day.type) {
            case 'quote':
                return <QuoteCard text={day.content} />;
            case 'task':
                return <ServiceTask task={day.content} />;
            case 'quiz':
                return <Quiz data={day.content} />;
            case 'game':
                if (day.content === 'memory') return <MemoryGame />;
                if (day.content === 'wordle') return <WordleGame />;
                return <p>Game loading...</p>;
            case 'naughty-nice':
                return <NaughtyOrNice />;
            case 'fact':
                return <FactGenerator />;
            case 'tree-decorator':
                return <ChristmasTreeDecorator />;
            case 'gingerbread-decorator':
                return <GingerbreadDecorator />;
            case 'scramble':
                return <ChristmasScramble />;
            case 'simon-says':
                return <SimonSays />;
            case 'catch-gift':
                return <CatchTheGift />;
            case 'carbon-challenge':
                return <CarbonChallenge />;
            default:
                return <p>Content coming soon!</p>;
        }
    };

    return (
        <div className="advent-grid">
            {adventData.map((day) => (
                <DayCard
                    key={day.id}
                    day={day}
                    isUnlocked={isDayUnlocked(day.id)}
                    onOpen={handleOpenDay}
                />
            ))}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedDay ? `Day ${selectedDay.id}` : ''}
            >
                {renderContent(selectedDay)}
            </Modal>

            <style>{`
        .advent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-md);
          padding: var(--spacing-md);
        }

        @media (max-width: 600px) {
          .advent-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-sm);
          }
        }
      `}</style>
        </div>
    );
};

export default AdventGrid;
