import { useState, type FC } from 'react';

interface CookieIntroProps {
  onEnter: () => void;
}

export const CookieIntro: FC<CookieIntroProps> = ({ onEnter }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);

  const dodgeButton = () => {
    const randomX = Math.floor(Math.random() * 160) - 80;
    const randomY = Math.floor(Math.random() * 80) - 40;
    setNoPos({ x: randomX, y: randomY });
  };

  const handleAccept = () => {
    setClosing(true);
    setTimeout(() => {
      onEnter();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md transition-opacity duration-300 ${
        closing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-md mx-4 p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-left shadow-2xl">
        <div className="text-3xl mb-3">🍪</div>

        <h3 className="text-xl font-bold text-white mb-2">
          Before we get ahead of ourselves...
        </h3>

        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
          We use high-intent cookies, gut instinct, and questionable amounts of coffee 
          to convince you I’m worth hiring. By entering, you agree that marketing shouldn't be boring.
        </p>

        <div className="flex items-center gap-3 relative">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Accept & Be Impressed
          </button>

          <button
            type="button"
            onMouseEnter={dodgeButton}
            onClick={dodgeButton}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="py-2.5 px-4 rounded-xl border border-neutral-700 text-neutral-400 font-medium text-sm whitespace-nowrap hover:border-neutral-600 select-none"
          >
            No, I hate revenue
          </button>
        </div>
      </div>
    </div>
  );
};