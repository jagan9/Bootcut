import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  platform?: 'instagram' | 'tiktok' | 'shorts' | 'general';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  platform = 'general'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1e1f26] border border-white/[0.1] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb2b7] text-[22px]">ios_share</span>
            <h3 className="font-bold text-base text-[#e2e2eb]">Share Video Cut</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] text-[#c7c4d7] hover:text-[#e2e2eb] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="bg-[#191b22] p-3 rounded-xl border border-white/[0.05]">
          <p className="text-xs font-semibold text-[#e2e2eb] truncate">{title}</p>
          <p className="text-[11px] text-[#bdc2ff] font-mono mt-0.5">30s • 1080p 60fps • No Watermark</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-[#c7c4d7] uppercase">Export Destination</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                alert(`Exporting directly to Instagram Reels with auto-captioning!`);
                onClose();
              }}
              className="p-3 bg-[#282a30] hover:bg-[#33343b] rounded-xl flex flex-col items-center gap-1.5 transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[#ffb2b7] text-[26px]">photo_camera</span>
              <span className="text-[11px] font-bold text-[#e2e2eb]">Instagram</span>
            </button>

            <button
              onClick={() => {
                alert(`Exporting directly to TikTok with sound synchronization!`);
                onClose();
              }}
              className="p-3 bg-[#282a30] hover:bg-[#33343b] rounded-xl flex flex-col items-center gap-1.5 transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[#c0c1ff] text-[26px]">play_circle</span>
              <span className="text-[11px] font-bold text-[#e2e2eb]">TikTok</span>
            </button>

            <button
              onClick={() => {
                alert(`Exporting to YouTube Shorts in 9:16 vertical HDR!`);
                onClose();
              }}
              className="p-3 bg-[#282a30] hover:bg-[#33343b] rounded-xl flex flex-col items-center gap-1.5 transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[#ffb4ab] text-[26px]">video_library</span>
              <span className="text-[11px] font-bold text-[#e2e2eb]">Shorts</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'link'}
            </span>
            <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
