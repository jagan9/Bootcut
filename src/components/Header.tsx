import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenUpgrade: () => void;
  onOpenVault: () => void;
  editsLeft: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenUpgrade,
  onOpenVault,
  editsLeft
}) => {
  const isSubScreen =
    currentScreen === 'processing' ||
    currentScreen === 'preview' ||
    currentScreen === 'signin' ||
    currentScreen === 'signup' ||
    currentScreen === 'forgot';

  const getSubScreenTitle = () => {
    switch (currentScreen) {
      case 'processing':
        return 'Timeline Studio';
      case 'preview':
        return 'Export Preview';
      case 'create':
        return 'Create';
      case 'projects':
        return 'Projects';
      case 'settings':
        return 'Settings & Privacy';
      case 'signin':
        return 'Sign In';
      case 'signup':
        return 'Sign Up';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Home';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#111319]/90 backdrop-blur-xl pt-safe border-b border-white/[0.06] shadow-[0_1px_16px_rgba(0,0,0,0.4)]">
      <div className="h-16 max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Side: Back button or Logo + Wordmark */}
        <div className="flex items-center gap-3 min-w-0">
          {isSubScreen ? (
            <button
              onClick={() => {
                if (currentScreen === 'forgot' || currentScreen === 'signup') {
                  onNavigate('signin');
                } else if (currentScreen === 'signin') {
                  onNavigate('settings');
                } else {
                  onNavigate('home');
                }
              }}
              aria-label="Go Back"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#c7c4d7] hover:text-[#e2e2eb] rounded-xl hover:bg-white/[0.05] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* BeatCut Custom Waveform Box Logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8083ff]/30 to-[#ffb2b7]/20 border border-[#8083ff]/40 flex items-center justify-center flex-shrink-0 group-hover:border-[#c0c1ff] transition-all shadow-[0_0_12px_rgba(128,131,255,0.2)]">
              <span className="material-symbols-outlined text-[20px] text-[#ffb2b7]">graphic_eq</span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-[#e2e2eb] text-lg leading-tight truncate">
                  BeatCut
                </span>
                <span className="text-[10px] text-[#c0c1ff] font-bold uppercase bg-[#8083ff]/20 border border-[#8083ff]/40 px-1.5 py-0.2 rounded-full tracking-wider">
                  AI
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#bdc2ff] truncate uppercase tracking-widest leading-none mt-0.5">
                {getSubScreenTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quota pill & User Profile */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={onOpenUpgrade}
            className="flex items-center gap-2 bg-[#282a30] hover:bg-[#33343b] px-3 py-1.5 rounded-full border border-white/[0.08] shadow-[0_0_12px_rgba(128,131,255,0.12)] transition-all active:scale-95 text-left"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffb2b7] animate-pulse"></span>
            <span className="font-mono text-xs text-[#e2e2eb] whitespace-nowrap">
              {editsLeft} edits left
            </span>
          </button>

          <button
            onClick={() => {
              if (currentScreen === 'settings') {
                onOpenVault();
              } else {
                onNavigate('settings');
              }
            }}
            aria-label="User Profile"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-0.5 rounded-full ring-2 ring-[#8083ff]/30 hover:ring-[#c0c1ff] transition-transform active:scale-95"
          >
            <img
              alt="Alex Profile"
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKklERnzk6JB6pHiKu4rk9iB-GxWGqOU8kNZPJyh7KO4gCDdwveTRN8AYRK2UfaBzoOMc_FN2cJp7pzck7X8qahdTP7dv-oPTfo35gKLLFOgLj8go9MK1PCJYM6UqKWxNwUUEyLEYOD5_zvB9qnsshOJ4TEti7vTbldTfxeCCB86kJ3NMc18QbxHXie_tvxCG1fP6lKymcI0UNLgrR-SF_0q70zUv8tCfjktuiyfU7bISK68-Mmnie-g"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
