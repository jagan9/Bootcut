import React from 'react';

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  usedGB: number;
  totalGB: number;
}

export const VaultModal: React.FC<VaultModalProps> = ({
  isOpen,
  onClose,
  usedGB,
  totalGB
}) => {
  if (!isOpen) return null;

  const percent = Math.min(100, Math.round((usedGB / totalGB) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1f26] border border-white/[0.1] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#7c87f3]/20 text-[#bdc2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#e2e2eb]">Cloud Media Vault</h3>
              <p className="text-xs text-[#c7c4d7]">Zero-Knowledge Encrypted Storage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] text-[#c7c4d7] hover:text-[#e2e2eb] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Storage Bar */}
        <div className="bg-[#191b22] p-4 rounded-xl border border-white/[0.05] flex flex-col gap-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#c7c4d7]">Storage Utilization</span>
            <span className="text-[#e2e2eb] font-bold">{usedGB} GB of {totalGB} GB ({percent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-[#33343b] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#bdc2ff] via-[#8083ff] to-[#ffb2b7] rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-[#c7c4d7] uppercase tracking-wider">Cached Video Streams</span>
          <div className="bg-[#191b22] rounded-xl border border-white/[0.05] divide-y divide-white/[0.04]">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">movie</span>
                <div>
                  <p className="text-xs font-semibold text-[#e2e2eb]">Japan 4K H.265 Source Clips</p>
                  <p className="text-[10px] text-[#908fa0]">6 streams · Tokyo & Kyoto</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#bdc2ff]">2.1 GB</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[18px]">graphic_eq</span>
                <div>
                  <p className="text-xs font-semibold text-[#e2e2eb]">Audio Beat Transients Waveforms</p>
                  <p className="text-[10px] text-[#908fa0]">Pre-calculated FFT spectrograms</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#bdc2ff]">0.4 GB</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c87f3] text-[18px]">history</span>
                <div>
                  <p className="text-xs font-semibold text-[#e2e2eb]">Archived Render Versions</p>
                  <p className="text-[10px] text-[#908fa0]">v1 and v2 previews</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#bdc2ff]">0.9 GB</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] rounded-xl font-medium text-xs transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert('Transient cache purged. 0.4 GB reclaimed!');
              onClose();
            }}
            className="flex-1 py-2.5 bg-[#8083ff]/20 hover:bg-[#8083ff]/30 text-[#c0c1ff] border border-[#8083ff]/40 rounded-xl font-medium text-xs transition-colors"
          >
            Purge Temp Cache
          </button>
        </div>
      </div>
    </div>
  );
};
