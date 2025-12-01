
import React, { useEffect } from 'react';
import { X, Share2 } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleShare = () => {
        const text = `Check out Day ${title?.replace('Day ', '')} on the Rotaract Advent Calendar! 🎄`;
        if (navigator.share) {
            navigator.share({
                title: 'Rotaract Advent Calendar',
                text: text,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${text} ${window.location.href} `);
            alert('Link copied to clipboard!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    {title && <h2 className="modal-title">{title}</h2>}
                    <div className="modal-actions">
                        <button className="action-button share" onClick={handleShare} aria-label="Share">
                            <Share2 size={20} />
                        </button>
                        <button className="action-button close" onClick={onClose} aria-label="Close">
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>

            <style>{`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: var(--spacing-md);
        animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
        background: var(--bg-secondary);
        border: 2px solid var(--christmas-gold);
        border-radius: 16px;
        padding: var(--spacing-xl);
        width: 100%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 0 30px rgba(248, 178, 41, 0.2);
        animation: slideUp 0.3s ease-out;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-lg);
    }

    .modal-title {
        color: var(--christmas-gold);
        font-size: 2rem;
        margin: 0;
    }

    .modal-actions {
        display: flex;
        gap: var(--spacing-sm);
    }

    .action-button {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        transition: color 0.2s;
        padding: 4px;
    }

    .action-button:hover {
        color: var(--christmas-red);
    }

    .action-button.share:hover {
        color: var(--christmas-gold);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`}</style>
        </div>
    );
};

export default Modal;
