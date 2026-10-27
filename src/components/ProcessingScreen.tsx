import React, { useState, useEffect } from 'react';
import { Project, PipelineStage, ScreenType } from '../types';
import { PIPELINE_STAGES } from '../data/mockData';

interface ProcessingScreenProps {
  project?: Project;
  onNavigate: (screen: ScreenType) => void;
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  project,
  onNavigate,
  onComplete
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(3); // Stage 4 (0-indexed 3)
  const [stageProgress, setStageProgress] = useState(64);
  const [isNotified, setIsNotified] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayTitle = project?.title || 'Japan Summer Memories';
  const clipsCount = project?.clipsCount || 6;
  const resolution = project?.resolution || '4K';
  const trackName = project?.trackName || 'Lost in Kyoto';
  const bpm = project?.bpm || 128;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setStageProgress((prev) => {
        if (prev >= 100) {
          if (currentStageIndex < 6) {
            setCurrentStageIndex((s) => s + 1);
            return 10;
          } else {
            clearInterval(timer);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [currentStageIndex]);

  const stages: PipelineStage[] = PIPELINE_STAGES.map((st, idx) => {
    if (idx < currentStageIndex) {
      return { ...st, status: 'completed' };
    } else if (idx === currentStageIndex) {
      return { ...st, status: 'active', badge: 'Active' };
    } else {
      return { ...st, status: idx === currentStageIndex + 1 ? 'queued' : 'pending' };
    }
  });

  const handleNotifyToggle = () => {
    setIsNotified(!isNotified);
    showToast(!isNotified ? 'Push alert set for preview readiness' : 'Push notifications muted');
  };

  const handleBackground = () => {
    showToast('Background rendering enabled. Returning to home...');
    setTimeout(() => {
      onNavigate('home');
    }, 1000);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    showToast('Job cancelled. Reverting workspace...');
    setTimeout(() => {
      onNavigate('home');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-20 select-none">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#33343b] border border-white/[0.1] text-[#e2e2eb] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">check_circle</span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#8083ff]/10 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-10 right-4 w-40 h-40 bg-[#ffb2b7]/10 blur-3xl pointer-events-none rounded-full"></div>

        {/* Status Header Banner */}
        <div className="px-4 pt-2 pb-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-[#282a30] px-3 py-1 rounded-full border border-white/[0.06] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb2b7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb2b7]"></span>
              </span>
              <span className="font-mono text-xs text-[#c0c1ff] uppercase tracking-wider font-semibold">
                Editing in Progress
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#c7c4d7] bg-[#191b22] px-2.5 py-1 rounded-full border border-white/[0.05]">
              <span className="material-symbols-outlined text-[15px] text-[#bdc2ff]">cloud_sync</span>
              <span className="font-mono text-[11px] font-medium">Cloud Rack 04</span>
            </div>
          </div>

          <div className="mt-1 flex items-baseline justify-between gap-2">
            <h1 className="text-2xl font-bold text-[#e2e2eb] tracking-tight truncate">
              {displayTitle}
            </h1>
            <span className="font-mono text-xs text-[#c7c4d7] flex-shrink-0">
              {clipsCount} Clips · {resolution}
            </span>
          </div>
        </div>

        {/* Visual Interactive Hero Card (Audio Waveform + Video Preview Frame) */}
        <div className="px-4 pt-1 pb-4">
          <div className="relative w-full rounded-2xl bg-[#191b22] border border-white/[0.08] p-4 overflow-hidden shadow-xl">
            {/* Background Ambient Video Poster */}
            <div className="relative w-full h-44 rounded-xl bg-[#0c0e14] overflow-hidden flex flex-col justify-between p-3 shadow-inner">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105 filter blur-[0.5px]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdBRi_K1d4Ad0x2s4-qYPjlRRVMdsHky_6RGfvPF-k-wCPHBDe1pQMKn85PnRxXCxFnYPKTYX0_UUCUwieXaP7AxJBoqRGFCxMc4n7dnIzvrS6v6H3fauoFK6haeprtGDEWfLqfm7PXe28A7sJM_IyC47OiNn3Jm1qukgBxcNk1ZUfO5dEDN6_z5YxKTtwVOmlTHzfl2utzYeSZwX7Le14bGkKClI4R1PxEGOIV0nTYXNm2zfrXCVI_A"
                alt="Tokyo street video preview"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/60 to-transparent"></div>

              {/* Top Overlay: Live AI Diagnostics Pills */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 bg-[#111319]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08] shadow-md">
                  <span className="material-symbols-outlined text-[14px] text-[#ffb2b7]">graphic_eq</span>
                  <span className="font-mono text-[11px] text-[#e2e2eb] tracking-tight">
                    {bpm} BPM · Detected
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#111319]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[#bdc2ff] border border-white/[0.08] shadow-md">
                  <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                  <span className="font-mono text-[11px] font-medium">Neural Cut v3</span>
                </div>
              </div>

              {/* Center Visual: Glowing Beat Pulse Icon */}
              <div className="relative z-10 self-center my-auto flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#282a30]/90 backdrop-blur-xl border border-white/[0.1] flex items-center justify-center shadow-lg relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#8083ff] to-[#ffb2b7] opacity-40 blur-sm animate-pulse"></div>
                    <svg className="w-10 h-10 relative z-10 text-[#ffb2b7]" fill="none" viewBox="0 0 48 48">
                      <rect height="36" rx="10" stroke="#8083ff" strokeOpacity="0.85" strokeWidth="3" width="36" x="6" y="6"></rect>
                      <path d="M6 24H16L20 15L25 33L30 20L34 24H42" stroke="#ffb2b7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5"></path>
                      <circle className="animate-ping" cx="23" cy="24" fill="#ffffff" r="2.5"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Visual: Real-time Audio Waveform Visualizer */}
              <div className="relative z-10 flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between text-[#c7c4d7] font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#c0c1ff]">audiotrack</span>
                    <span className="text-[#e2e2eb]">{trackName}</span>
                  </span>
                  <span className="text-[#bdc2ff]">00:18.42 / 00:32.00</span>
                </div>

                <div className="h-6 w-full flex items-end justify-between gap-[2px] pt-1">
                  {[2, 3.5, 5, 2.5, 4, 6, 3, 5.5, 2, 4, 6, 3, 2, 4.5, 5, 6.5, 3, 2, 4, 5.5, 2, 3.5, 6, 4, 2, 5, 3, 2].map((height, i) => (
                    <span
                      key={i}
                      className={`w-[3px] rounded-full transition-all duration-300 ${
                        height >= 6
                          ? 'bg-[#ffb2b7] shadow-[0_0_8px_#ffb2b7]'
                          : 'bg-[#c0c1ff]/70'
                      }`}
                      style={{ height: `${height * 3.5}px` }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Human friendly summary banner below visual */}
            <div className="mt-3 flex items-start gap-2.5 bg-[#1e1f26] border border-white/[0.05] p-2.5 rounded-xl">
              <div className="p-1 rounded-md bg-[#8083ff]/20 text-[#c0c1ff] flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">info</span>
              </div>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                AI BeatCut engine is synchronizing your <span className="text-[#e2e2eb] font-semibold">{clipsCount} clips</span> to <span className="text-[#e2e2eb] font-semibold">‘{trackName}’</span>. This usually takes 45–90 seconds on mobile cloud.
              </p>
            </div>
          </div>
        </div>

        {/* Realistic Stage Tracker */}
        <div className="px-4 py-2 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#e2e2eb]">Pipeline Stages</h2>
            <span className="font-mono text-xs text-[#bdc2ff] uppercase">
              Stage {Math.min(7, currentStageIndex + 1)} of 7
            </span>
          </div>

          {/* Stepper Cards */}
          <div className="flex flex-col gap-2">
            {stages.map((st, idx) => {
              if (st.status === 'completed') {
                return (
                  <div key={st.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#191b22] border border-white/[0.04]">
                    <div className="w-7 h-7 rounded-full bg-[#33343b] text-[#bdc2ff] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#e2e2eb] truncate">{st.title}</span>
                        <span className="font-mono text-[11px] text-[#bdc2ff]">{st.time || '1.2s'}</span>
                      </div>
                      <span className="text-[11px] text-[#c7c4d7] truncate">{st.details}</span>
                    </div>
                  </div>
                );
              }

              if (st.status === 'active') {
                return (
                  <div key={st.id} className="relative flex flex-col p-3.5 rounded-xl bg-[#282a30] border border-[#ffb2b7]/30 shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8083ff] via-[#ffb2b7] to-[#8083ff] animate-pulse"></div>
                    <div className="flex items-start gap-3 pl-1">
                      <div className="w-7 h-7 rounded-full bg-[#b50036]/60 text-[#ffb2b7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#e2e2eb] truncate">{st.title}</span>
                          <span className="font-mono text-[11px] text-[#ffb2b7] uppercase font-bold">Active</span>
                        </div>
                        <p className="text-xs text-[#c0c1ff] mt-0.5 leading-snug">
                          {st.details}
                        </p>
                        <div className="mt-2 w-full bg-[#0c0e14] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#8083ff] to-[#ffb2b7] rounded-full transition-all duration-300"
                            style={{ width: `${stageProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Queued / Pending
              return (
                <div key={st.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#191b22]/60 border border-white/[0.03] opacity-60">
                  <div className="w-7 h-7 rounded-full bg-[#1e1f26] text-[#908fa0] flex items-center justify-center flex-shrink-0 font-mono text-xs">
                    {st.id}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#e2e2eb] truncate">{st.title}</span>
                      <span className="font-mono text-[10px] text-[#908fa0]">{st.badge || 'Queued'}</span>
                    </div>
                    <span className="text-[11px] text-[#c7c4d7] truncate">{st.details}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Action Controls */}
        <div className="px-4 py-3 flex flex-col gap-2.5">
          <button
            onClick={handleNotifyToggle}
            className="w-full min-h-[48px] bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#8083ff]/20 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isNotified ? 'notifications_off' : 'notifications_active'}
            </span>
            <span>{isNotified ? 'Notification Enabled' : 'Notify me when ready'}</span>
          </button>

          <button
            onClick={handleBackground}
            className="w-full min-h-[48px] bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] font-semibold text-sm rounded-xl flex items-center justify-center gap-2 border border-white/[0.08] shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#bdc2ff]">open_in_new</span>
            <span>Keep running in background</span>
          </button>

          {/* Quick Sandbox Skip Button to Preview */}
          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-[#8083ff]/15 hover:bg-[#8083ff]/25 text-[#c0c1ff] border border-[#8083ff]/30 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">fast_forward</span>
            <span>Simulate Render Finish (Open Preview)</span>
          </button>

          <button
            onClick={() => setShowCancelModal(true)}
            className="w-full py-2 text-[#ffb4ab] hover:text-[#ffdad6] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            <span>Cancel processing job</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 py-1 text-center text-[#908fa0]">
            <span className="material-symbols-outlined text-[14px]">science</span>
            <span className="font-mono text-[10px]">
              Prototype demonstration state · Simulated cloud pipeline
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Cancel */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1e1f26] border border-white/[0.1] p-5 rounded-2xl shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#93000a]/40 text-[#ffb4ab] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-[#e2e2eb]">Abort Beat Matching?</h3>
                <span className="text-xs text-[#c7c4d7]">Cloud resources will be cleared immediately.</span>
              </div>
            </div>

            <p className="text-xs text-[#c7c4d7] leading-relaxed">
              Cancelling now will discard the current rhythmic synchronization cache for ‘{displayTitle}’.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] rounded-xl text-xs font-semibold"
              >
                Continue Job
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 bg-[#93000a] hover:bg-[#b50036] text-[#ffdad6] rounded-xl text-xs font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
