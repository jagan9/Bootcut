import React from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  editsLeft: number;
  onAddEdits: (count: number) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  editsLeft,
  onAddEdits
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1f26] border border-white/[0.1] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#e2e2eb]">BeatCut Pro Quota</h3>
              <p className="text-xs text-[#c7c4d7]">Rhythmic AI Editing Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] text-[#c7c4d7] hover:text-[#e2e2eb] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="bg-[#191b22] p-4 rounded-xl border border-white/[0.05] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-[#bdc2ff] uppercase">Current Plan</span>
            <span className="text-base font-bold text-[#e2e2eb]">Free Tier</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold font-mono text-[#ffb2b7]">{editsLeft}</span>
            <span className="text-xs text-[#c7c4d7]"> / 5 AI Edits Left</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#282a30] p-4 rounded-xl border border-[#8083ff]/40 flex flex-col justify-between relative overflow-hidden">
            <span className="absolute top-2 right-2 text-[10px] font-bold bg-[#ffb2b7] text-[#67001b] px-1.5 py-0.5 rounded uppercase">
              Popular
            </span>
            <div>
              <h4 className="font-bold text-[#e2e2eb]">Pro Creator</h4>
              <p className="text-2xl font-bold font-mono text-[#c0c1ff] mt-1">$12<span className="text-xs font-normal text-[#c7c4d7]">/mo</span></p>
              <ul className="text-xs text-[#c7c4d7] mt-3 space-y-1.5">
                <li className="flex items-center gap-1.5"><span className="text-[#c0c1ff]">✓</span> 50 AI beat edits/mo</li>
                <li className="flex items-center gap-1.5"><span className="text-[#c0c1ff]">✓</span> 4K 60fps ProRes export</li>
                <li className="flex items-center gap-1.5"><span className="text-[#c0c1ff]">✓</span> Neural Transient v3.2</li>
                <li className="flex items-center gap-1.5"><span className="text-[#c0c1ff]">✓</span> 50 GB Cloud Media Vault</li>
              </ul>
            </div>
            <button
              onClick={() => {
                onAddEdits(50);
                onClose();
              }}
              className="mt-4 w-full py-2.5 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-bold text-xs rounded-lg transition-all active:scale-95 shadow-lg shadow-[#8083ff]/20"
            >
              Activate Pro (Demo)
            </button>
          </div>

          <div className="bg-[#191b22] p-4 rounded-xl border border-white/[0.06] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-[#e2e2eb]">Free Top-Up</h4>
              <p className="text-2xl font-bold font-mono text-[#e2e2eb] mt-1">+3<span className="text-xs font-normal text-[#c7c4d7]"> edits</span></p>
              <p className="text-xs text-[#c7c4d7] mt-3 leading-relaxed">
                Add sandbox credits for demo test cut runs in BeatCut Studio.
              </p>
            </div>
            <button
              onClick={() => {
                onAddEdits(3);
                onClose();
              }}
              className="mt-4 w-full py-2.5 bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] font-semibold text-xs rounded-lg transition-all active:scale-95"
            >
              Refill +3 Credits
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] font-mono text-[#908fa0]">
          Instant activation • No credit card required in sandbox mode
        </p>
      </div>
    </div>
  );
};
