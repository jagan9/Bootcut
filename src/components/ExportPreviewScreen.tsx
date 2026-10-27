import React, { useState, useEffect, useRef } from 'react';
import { Project, ScreenType } from '../types';

interface ExportPreviewScreenProps {
  project?: Project;
  onNavigate: (screen: ScreenType) => void;
  onOpenShare: (project: Project) => void;
}

export const ExportPreviewScreen: React.FC<ExportPreviewScreenProps> = ({
  project,
  onNavigate,
  onOpenShare
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(18); // 0:18 default as in mockup
  const totalDuration = 30;
  const [isMuted, setIsMuted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'packaging' | 'saved'>('idle');
  const [format, setFormat] = useState<'MP4' | 'MOV' | 'ProRes' | 'GIF'>('MP4');
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showTweaks, setShowTweaks] = useState(false);
  const [pacingValue, setPacingValue] = useState(2); // 1 = Relaxed, 2 = Balanced, 3 = Rapid Frenzy
  const [activeLUT, setActiveLUT] = useState('Kyoto Teal & Pink');
  const [currentVersion, setCurrentVersion] = useState<2 | 1>(2);
  const [rating, setRating] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayTitle = project?.title || 'Japan Summer Memories';
  const trackName = project?.trackName || 'Lost in Kyoto';
  const bpm = project?.bpm || 128;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Playback timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= totalDuration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDownload = () => {
    setDownloadState('packaging');
    setTimeout(() => {
      setDownloadState('saved');
      showToast('Video downloaded to device successfully!');
      setTimeout(() => {
        setDownloadState('idle');
      }, 3000);
    }, 1800);
  };

  const getPacingLabel = () => {
    if (pacingValue === 1) return 'Relaxed (0.75x)';
    if (pacingValue === 2) return 'Balanced (1.0x)';
    return 'Rapid Frenzy (1.5x)';
  };

  const handleRestoreV1 = () => {
    setCurrentVersion(1);
    setPlaybackTime(8);
    showToast('Restored Version 1 (15s Fast Tempo Cut)');
  };

  const handleRestoreV2 = () => {
    setCurrentVersion(2);
    setPlaybackTime(18);
    showToast('Restored Version 2 (30s Balanced Cut)');
  };

  const progressPercent = (playbackTime / totalDuration) * 100;

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-24 px-4 gap-4 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#33343b] border border-white/[0.1] text-[#e2e2eb] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">check_circle</span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Status & Quick Share Ribbon */}
      <div className="flex items-center justify-between bg-[#1e1f26] border border-white/[0.08] px-4 py-3 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb2b7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb2b7]"></span>
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#e2e2eb] truncate">Render Complete</span>
            <span className="font-mono text-[10px] text-[#bdc2ff] uppercase tracking-wider">
              READY FOR HIGH-RES EXPORT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenShare(project || ({} as any))}
            aria-label="Share options"
            className="h-9 w-9 rounded-full bg-[#282a30] hover:bg-[#33343b] flex items-center justify-center text-[#e2e2eb] hover:text-[#c0c1ff] transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            aria-label="Dismiss view"
            className="h-9 w-9 rounded-full bg-[#282a30] hover:bg-[#33343b] flex items-center justify-center text-[#c7c4d7] hover:text-[#e2e2eb] transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Cinematic 9:16 Video Player Container */}
      <div className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-[#0c0e14] border border-white/[0.1] group flex flex-col justify-between">
        {/* Background Frame Preview */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuChlGZ6cAmZMNaAYM8SE7prFOjgQUoA_qVDj0oqJLIP0lgA27qmllsEfOoU6gHW-FfGiWHKFGiQquPMS87tTWf2PB8txi5dMJ96HlUBYPXLwZoyeUEf7UWxq7BZ_N8j-pTqx7xKwLEBz8waopYXIVOmL_jfLbf78-xXv16Ul7VmSPa3Esset4wnF8YIBZDy-FpCIMijT0rfiRRFWDX20LEt1YAuJ24yivL-MDY_lmQcLV9oz3ps0EgvcA')`,
            filter: activeLUT === 'High Contrast Noir' ? 'grayscale(100%) contrast(140%)' : activeLUT === 'Cinematic Film' ? 'sepia(20%) saturate(120%)' : 'none'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#111319]/80 via-transparent to-[#111319]/95"></div>
        </div>

        {/* Top Overlay Elements */}
        <div className="relative z-10 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#111319]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.08]">
            <span className="material-symbols-outlined text-[#ffb2b7] text-[16px]">graphic_eq</span>
            <span className="font-mono text-[10px] text-[#ffb2b7] tracking-wider uppercase font-bold">
              Beat Synced ({bpm} BPM)
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#8083ff] px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(128,131,255,0.4)]">
            <span className="material-symbols-outlined text-[#0d0096] text-[14px]">auto_awesome</span>
            <span className="font-mono text-[9px] text-[#0d0096] font-extrabold uppercase tracking-widest">
              PRO AI CUT
            </span>
          </div>
        </div>

        {/* Central Interactive Playhead Trigger */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Toggle playback"
          className="relative z-10 self-center h-16 w-16 rounded-full bg-[#111319]/70 backdrop-blur-md border border-white/[0.15] flex items-center justify-center text-white transition-all active:scale-90 hover:scale-105 shadow-2xl"
          type="button"
        >
          <span className="material-symbols-outlined text-[36px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Bottom Player Control Deck */}
        <div className="relative z-10 p-3.5 flex flex-col gap-2 bg-gradient-to-t from-[#111319] via-[#111319]/85 to-transparent">
          {/* Audio Waveform Segment Strip */}
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-1 text-[#bdc2ff]">
                <span className="material-symbols-outlined text-[13px]">music_note</span>
                <span className="truncate">{trackName} • Beat Transients</span>
              </div>
              <span className="text-[#c7c4d7]">18 Sync Cuts</span>
            </div>

            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setPlaybackTime(Math.round(pos * totalDuration));
              }}
              className="relative h-6 w-full bg-[#282a30] rounded-lg overflow-hidden flex items-center px-1 cursor-pointer border border-white/[0.05]"
            >
              {/* Waveform bars */}
              <div className="absolute inset-0 flex items-center justify-between px-1.5 opacity-40">
                {[2, 3, 4, 2, 5, 3, 1, 4, 5, 2, 3, 5, 4, 2, 5, 3, 4, 2].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-[#c0c1ff] rounded-full"
                    style={{ height: `${h * 3.5}px` }}
                  ></span>
                ))}
              </div>

              {/* Beat Transients Markers (Kinetic Rose) */}
              {[12, 24, 41, 58, 72, 89].map((pos, idx) => (
                <span
                  key={idx}
                  className="absolute h-full w-[2px] bg-[#ffb2b7] shadow-[0_0_6px_#ffb2b7] z-10"
                  style={{ left: `${pos}%` }}
                ></span>
              ))}

              {/* Active Scrubber Fill */}
              <div
                className="h-1 bg-[#8083ff] rounded-full relative z-20 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              </div>
            </div>
          </div>

          {/* Playback Controls Row */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-[#e2e2eb] hover:text-[#c0c1ff] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isPlaying ? 'pause_circle' : 'play_circle'}
                </span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#c7c4d7] hover:text-[#e2e2eb] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>

              <span className="font-mono text-xs text-[#e2e2eb] tracking-wider">
                0:{playbackTime.toString().padStart(2, '0')}{' '}
                <span className="text-[#908fa0]">/ 0:{totalDuration}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-[#c0c1ff] bg-[#282a30] px-2 py-0.5 rounded border border-white/[0.08]">
                60 FPS
              </span>
              <button
                onClick={() => showToast('Fullscreen video canvas enabled')}
                className="text-[#c7c4d7] hover:text-[#e2e2eb] transition-colors p-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Overview Card */}
      <div className="flex flex-col bg-[#1e1f26] border border-white/[0.08] p-4 rounded-2xl shadow-lg gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#e2e2eb] truncate">{displayTitle}</h2>
              <span className="font-mono text-[10px] bg-[#373940] px-2 py-0.5 rounded text-[#bdc2ff] font-bold">
                v{currentVersion}
              </span>
            </div>
            <p className="text-xs text-[#c7c4d7] mt-0.5">
              Rendered via BeatCut Multi-Layer Transients Engine
            </p>
          </div>

          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Removed from favorites' : 'Saved to favorites');
            }}
            aria-label="Star Project"
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-[#ffb2b7]/20 border-[#ffb2b7] text-[#ffb2b7]'
                : 'border-white/[0.06] text-[#908fa0] hover:text-[#ffb2b7]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isBookmarked ? 'bookmark_added' : 'bookmark'}
            </span>
          </button>
        </div>

        {/* Parameter Tag Mosaic */}
        <div className="flex flex-wrap gap-1.5">
          <div className="flex items-center gap-1 bg-[#191b22] px-2.5 py-1 rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[14px] text-[#bdc2ff]">flight_takeoff</span>
            <span className="text-xs text-[#e2e2eb]">Travel</span>
          </div>
          <div className="flex items-center gap-1 bg-[#191b22] px-2.5 py-1 rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[14px] text-[#ffb2b7]">bolt</span>
            <span className="text-xs text-[#e2e2eb]">Energetic</span>
          </div>
          <div className="flex items-center gap-1 bg-[#191b22] px-2.5 py-1 rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[14px] text-[#c0c1ff]">stay_current_portrait</span>
            <span className="text-xs text-[#e2e2eb]">9:16 Reels</span>
          </div>
          <div className="flex items-center gap-1 bg-[#191b22] px-2.5 py-1 rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[14px] text-[#bdc2ff]">high_quality</span>
            <span className="text-xs text-[#e2e2eb]">1080p · 60fps</span>
          </div>
          <div className="flex items-center gap-1 bg-[#191b22] px-2.5 py-1 rounded-lg border border-white/[0.04]">
            <span className="material-symbols-outlined text-[14px] text-[#c0c1ff]">timer</span>
            <span className="text-xs text-[#e2e2eb]">{totalDuration}s Duration</span>
          </div>
        </div>

        {/* Audio Track & Sync Metadata */}
        <div className="flex items-center justify-between bg-[#191b22] p-2.5 rounded-xl border border-white/[0.05]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-[#373940] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">music_note</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#e2e2eb] truncate">{trackName}</span>
              <span className="text-[10px] font-mono text-[#bdc2ff] truncate">
                Licensed Creator Asset • {bpm} BPM
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#282a30] px-2 py-1 rounded border border-white/[0.06]">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[14px]">verified</span>
            <span className="font-mono text-[9px] text-[#e2e2eb] uppercase tracking-wider font-bold">
              No Watermark
            </span>
          </div>
        </div>
      </div>

      {/* Primary Export Action Zone */}
      <div className="flex flex-col gap-2.5 bg-[#191b22] border border-white/[0.08] p-4 rounded-2xl shadow-xl">
        <div className="flex items-stretch gap-2 relative">
          <button
            onClick={handleDownload}
            disabled={downloadState === 'packaging'}
            className="flex-1 bg-[#8083ff] hover:bg-[#c0c1ff] active:scale-[0.99] transition-all py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[#0d0096] font-bold shadow-lg shadow-[#8083ff]/30 text-sm"
            type="button"
          >
            {downloadState === 'packaging' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Packaging {format}...</span>
              </>
            ) : downloadState === 'saved' ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Saved to Camera Roll!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download Video</span>
              </>
            )}
          </button>

          {/* Format Picker Dropdown Trigger */}
          <button
            onClick={() => setShowFormatDropdown(!showFormatDropdown)}
            aria-label="Format Settings"
            className="bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] px-3.5 rounded-xl flex items-center justify-center transition-colors border border-white/[0.08]"
            type="button"
          >
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-[#bdc2ff]">{format}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showFormatDropdown && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#282a30] border border-white/[0.1] rounded-xl shadow-2xl p-1 z-30 divide-y divide-white/[0.05]">
              {(['MP4', 'MOV', 'ProRes', 'GIF'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setFormat(fmt);
                    setShowFormatDropdown(false);
                    showToast(`Export format changed to ${fmt}`);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono font-semibold rounded-lg flex items-center justify-between ${
                    format === fmt ? 'bg-[#8083ff]/20 text-[#c0c1ff]' : 'text-[#e2e2eb] hover:bg-[#33343b]'
                  }`}
                >
                  <span>{fmt}</span>
                  {format === fmt && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick secondary workflow switches */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setShowTweaks(!showTweaks)}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 border transition-all active:scale-95 ${
              showTweaks
                ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#e2e2eb]'
                : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#bdc2ff]">tune</span>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Quick Tweaks</span>
          </button>

          <button
            onClick={() => {
              showToast('Generating new dynamic variation with shifted transients...');
              setTimeout(() => showToast('Variation ready! Check preview above.'), 1200);
            }}
            className="bg-[#1e1f26] hover:bg-[#282a30] border border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb] active:scale-95 transition-all py-2.5 px-2 rounded-xl flex flex-col items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffb2b7]">casino</span>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">New Variation</span>
          </button>

          <button
            onClick={() => {
              showToast(`Cloned "${displayTitle}" to new project draft!`);
            }}
            className="bg-[#1e1f26] hover:bg-[#282a30] border border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb] active:scale-95 transition-all py-2.5 px-2 rounded-xl flex flex-col items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">content_copy</span>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Duplicate</span>
          </button>
        </div>
      </div>

      {/* Interactive Quick Tweaks Drawer / Accordion */}
      {showTweaks && (
        <div className="flex flex-col bg-[#1e1f26] border border-white/[0.08] p-4 rounded-2xl gap-3 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">sliders</span>
              <span className="text-xs font-bold text-[#e2e2eb]">Fine Pacing & Filter Adjust</span>
            </div>
            <button
              onClick={() => setShowTweaks(false)}
              className="text-[#c7c4d7] hover:text-[#e2e2eb]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Pacing Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-[#c7c4d7]">Cut Pacing (Transients Sensitivity)</span>
              <span className="text-[#bdc2ff] font-bold">{getPacingLabel()}</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              value={pacingValue}
              onChange={(e) => setPacingValue(parseInt(e.target.value, 10))}
              className="w-full accent-[#8083ff] bg-[#282a30] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* LUT Preset Chips */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#c7c4d7] font-mono">Color Grading LUT</span>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['Kyoto Teal & Pink', 'Cinematic Film', 'High Contrast Noir'].map((lut) => (
                <button
                  key={lut}
                  onClick={() => {
                    setActiveLUT(lut);
                    showToast(`Applied ${lut}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all ${
                    activeLUT === lut
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold'
                      : 'bg-[#282a30] text-[#e2e2eb] hover:bg-[#33343b]'
                  }`}
                >
                  {lut}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Version History Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-bold text-[#e2e2eb]">Render History</span>
          <span className="font-mono text-xs text-[#bdc2ff]">2 SAVED CUTS</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Version 2 Card */}
          <div
            onClick={handleRestoreV2}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              currentVersion === 2
                ? 'bg-[#1e1f26] border-[#8083ff]/40 shadow-sm'
                : 'bg-[#191b22] border-white/[0.04] opacity-80'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-12 w-9 rounded-lg overflow-hidden flex-shrink-0 relative bg-[#0c0e14]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMoTArjqifImkZJ37tOFq6u2IVvzFsetoIWjuC7Mbs6kmk3RRTpl0jFv1egCVA3ED6CfN_TXg-NvtEkCaNaMfkNaMDz_9-k0WLzsdvkYbrbk88wgzSnmn8uN4YQE9fT2J-7_ySXoLC2Vtay7tuIstknt-m7ETFXSk6oLIOgxNSu68-bvutrX2SOE8ZjaxRIarocfOPVFggR-pVbdzWFIPYjLmNAY2EgyAADJzCNh-JJRVNX0vgCPb78Q"
                  alt="Version 2 thumbnail"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#e2e2eb]">Version 2</span>
                  <span className="font-mono text-[9px] bg-[#8083ff]/20 text-[#c0c1ff] border border-[#8083ff]/30 px-1.5 py-0.5 rounded uppercase font-bold">
                    Current
                  </span>
                </div>
                <span className="text-[11px] text-[#c7c4d7] truncate">
                  30s • 18 Balanced beat cuts • Teal/Pink LUT
                </span>
              </div>
            </div>
            {currentVersion === 2 ? (
              <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">check_circle</span>
            ) : (
              <button
                type="button"
                className="text-xs font-mono text-[#c0c1ff] px-2 py-1 rounded bg-[#282a30]"
              >
                RESTORE
              </button>
            )}
          </div>

          {/* Version 1 Card */}
          <div
            onClick={handleRestoreV1}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              currentVersion === 1
                ? 'bg-[#1e1f26] border-[#8083ff]/40 shadow-sm'
                : 'bg-[#191b22] border-white/[0.04] opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-12 w-9 rounded-lg overflow-hidden flex-shrink-0 relative bg-[#0c0e14]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbV11CLfR1pdGjqp-QlOAk6Q2N8kD2fG-_2r5XrTzf5_YE_UX1WetEtFrkQEm2g1IFdnDk_LzMZS53eTPYA5oNUfOA5RDU4UjxCzembUGrFZyyBSz7LfoqF27tqhTy2xjhVhaeCTt5iPi2inoCgbOzxy0ikbpmNyvkL2HATTMPOy6XQA83I3gMfyNWPpaBQsokx0dkIkLg3_ubur7Sc1DGGjm_s8xEVQLhJ-PTi9XE12TGtILZAQN_4Q"
                  alt="Version 1 thumbnail"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#c7c4d7]">Version 1</span>
                  <span className="font-mono text-[9px] text-[#908fa0]">Archived</span>
                </div>
                <span className="text-[11px] text-[#908fa0] truncate">
                  15s • 24 Fast tempo cuts • Standard LUT
                </span>
              </div>
            </div>
            {currentVersion === 1 ? (
              <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">check_circle</span>
            ) : (
              <button
                type="button"
                className="text-xs font-mono text-[#bdc2ff] hover:text-[#c0c1ff] px-2 py-1 bg-[#282a30] rounded transition-colors"
              >
                RESTORE
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Direct Social Share Quick Actions */}
      <div className="flex flex-col gap-2 bg-[#1e1f26] border border-white/[0.08] p-4 rounded-2xl shadow-md">
        <span className="font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
          Direct Post to Social
        </span>
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <button
            onClick={() => onOpenShare({ ...project, title: displayTitle } as any)}
            className="bg-[#282a30] hover:bg-[#33343b] active:scale-95 transition-all p-3 rounded-xl flex flex-col items-center gap-1.5 text-[#e2e2eb] border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] text-[#ffb2b7]">photo_camera</span>
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold">Instagram</span>
          </button>

          <button
            onClick={() => onOpenShare({ ...project, title: displayTitle } as any)}
            className="bg-[#282a30] hover:bg-[#33343b] active:scale-95 transition-all p-3 rounded-xl flex flex-col items-center gap-1.5 text-[#e2e2eb] border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] text-[#c0c1ff]">play_circle</span>
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold">TikTok</span>
          </button>

          <button
            onClick={() => onOpenShare({ ...project, title: displayTitle } as any)}
            className="bg-[#282a30] hover:bg-[#33343b] active:scale-95 transition-all p-3 rounded-xl flex flex-col items-center gap-1.5 text-[#e2e2eb] border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] text-[#ffb4ab]">video_library</span>
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold">Shorts</span>
          </button>
        </div>
      </div>

      {/* Rate This Edit Delight Micro-Card */}
      <div className="flex items-center justify-between bg-[#0c0e14] border border-white/[0.08] p-4 rounded-2xl">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#e2e2eb]">How is this cut?</span>
          <span className="text-xs text-[#c7c4d7]">Helps train BeatCut sync AI</span>
        </div>

        <div className="flex items-center gap-1 text-[#908fa0]">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                showToast(`Thanks for rating ${star} stars!`);
              }}
              className={`transition-colors p-0.5 ${
                rating >= star ? 'text-[#ffb2b7]' : 'text-[#908fa0] hover:text-[#ffb2b7]'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
