import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // If in fullscreen preview or processing, the bottom nav can be hidden or accessible
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0c0e14]/90 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 transition-all active:scale-95 ${
            currentScreen === 'home' ? 'text-[#c0c1ff]' : 'text-[#c7c4d7] hover:text-[#e2e2eb]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">space_dashboard</span>
          <span className="font-mono text-[11px] mt-0.5 font-medium">Home</span>
        </button>

        <button
          onClick={() => onNavigate('create')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 transition-all active:scale-95 ${
            currentScreen === 'create' ? 'text-[#c0c1ff]' : 'text-[#c7c4d7] hover:text-[#e2e2eb]'
          }`}
        >
          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
              currentScreen === 'create'
                ? 'bg-[#8083ff]/30 border border-[#c0c1ff] shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                : 'bg-[#1e1f26] border border-white/[0.08]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentScreen === 'create' ? 'text-[#ffb2b7]' : 'text-[#bdc2ff]'
              }`}
            >
              auto_videocam
            </span>
          </div>
          <span className="font-mono text-[11px] mt-0.5 font-medium">Create</span>
        </button>

        <button
          onClick={() => onNavigate('projects')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 transition-all active:scale-95 ${
            currentScreen === 'projects' ? 'text-[#c0c1ff]' : 'text-[#c7c4d7] hover:text-[#e2e2eb]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">video_library</span>
          <span className="font-mono text-[11px] mt-0.5 font-medium">Projects</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 transition-all active:scale-95 ${
            currentScreen === 'settings' ? 'text-[#c0c1ff]' : 'text-[#c7c4d7] hover:text-[#e2e2eb]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">tune</span>
          <span className="font-mono text-[11px] mt-0.5 font-medium">Settings</span>
        </button>
      </div>
    </nav>
  );
};
