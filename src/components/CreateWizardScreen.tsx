import React, { useState } from 'react';
import { Project, AudioTrack, MediaClip, ScreenType } from '../types';
import { AUDIO_TRACKS, INITIAL_CLIPS } from '../data/mockData';

interface CreateWizardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onStartRender: (newProject: Partial<Project>) => void;
}

export const CreateWizardScreen: React.FC<CreateWizardScreenProps> = ({
  onNavigate,
  onStartRender
}) => {
  const [currentStep, setCurrentStep] = useState(3); // Start on Step 3 as in mockup
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]); // Lost in Kyoto
  const [isChangingTrack, setIsChangingTrack] = useState(false);
  const [archetype, setArchetype] = useState('Travel');
  const [emotionalArc, setEmotionalArc] = useState('Energetic (Hyper-Beat)');
  const [colorGrade, setColorGrade] = useState('Warm Cinematic');
  const [pacing, setPacing] = useState<'subtle' | 'balanced' | 'aggressive'>('balanced');
  const [commercialLicense, setCommercialLicense] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [soundMixRatio, setSoundMixRatio] = useState(85); // 85% Music, 15% Ambience
  const [resolution, setResolution] = useState('1080p FHD (2160x1080)');
  const [smartFraming, setSmartFraming] = useState(true);
  const [clips, setClips] = useState<MediaClip[]>(INITIAL_CLIPS);
  const [trimWindow, setTrimWindow] = useState({ start: 15, end: 45 }); // 30s window

  const stepNames = [
    'Upload Raw Footage',
    'Style & Mood',
    'Music & Beat Sync',
    'Output Architecture',
    'Review & Synthesize'
  ];

  const buttonLabels = [
    'Continue to Style',
    'Continue to Music Sync',
    'Continue to Output',
    'Review Synthesize',
    'Render Master Cut'
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 5 Submit: Start Render
      onStartRender({
        title: 'Japan Summer Memories',
        aspectRatio,
        duration: '0:30s',
        trackName: selectedTrack.name,
        bpm: selectedTrack.bpm,
        genre: selectedTrack.genre,
        category: archetype,
        lut: colorGrade,
        resolution
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('home');
    }
  };

  const addSimulatedClip = () => {
    const newId = `clip-${clips.length + 1}`;
    const newClip: MediaClip = {
      id: newId,
      filename: `Tokyo_Night_Street_${clips.length + 1}.mp4`,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMoTArjqifImkZJ37tOFq6u2IVvzFsetoIWjuC7Mbs6kmk3RRTpl0jFv1egCVA3ED6CfN_TXg-NvtEkCaNaMfkNaMDz_9-k0WLzsdvkYbrbk88wgzSnmn8uN4YQE9fT2J-7_ySXoLC2Vtay7tuIstknt-m7ETFXSk6oLIOgxNSu68-bvutrX2SOE8ZjaxRIarocfOPVFggR-pVbdzWFIPYjLmNAY2EgyAADJzCNh-JJRVNX0vgCPb78Q',
      duration: '0:14',
      resolution: '4K',
      fps: 60,
      keyframes: '8 Keyframes'
    };
    setClips([...clips, newClip]);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-16 pb-28 select-none">
      {/* Stepper Track & Status Header */}
      <section className="sticky top-16 z-40 bg-[#0c0e14]/95 backdrop-blur-md px-4 py-3 border-b border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#c0c1ff] uppercase font-bold tracking-wider">
              STEP {currentStep} OF 5
            </span>
            <span className="text-[#464554] text-[10px]">•</span>
            <span className="text-xs text-[#c7c4d7] font-semibold">
              {stepNames[currentStep - 1]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#1e1f26] border border-white/[0.06] px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7] animate-ping"></span>
            <span className="font-mono text-[10px] text-[#ffb2b7] font-bold tracking-tight">
              AI Ready
            </span>
          </div>
        </div>

        {/* 5-Step Progress Tabs */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {[
            { id: 1, label: 'Media' },
            { id: 2, label: 'Style' },
            { id: 3, label: 'Audio' },
            { id: 4, label: 'Output' },
            { id: 5, label: 'Review' }
          ].map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className="group flex flex-col items-center gap-1 focus:outline-none"
                type="button"
              >
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-[#c0c1ff]'
                      : isActive
                      ? 'bg-[#ffb2b7] shadow-[0_0_8px_rgba(255,178,183,0.7)]'
                      : 'bg-[#33343b]'
                  }`}
                ></div>
                <div className="flex items-center justify-center gap-1">
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[13px] text-[#c0c1ff]">
                      check_circle
                    </span>
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7]"></span>
                  ) : null}
                  <span
                    className={`font-mono text-[10px] ${
                      isActive
                        ? 'text-[#ffb2b7] font-bold'
                        : isCompleted
                        ? 'text-[#c0c1ff]'
                        : 'text-[#908fa0]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step Content Containers */}
      <div className="px-4 py-4 space-y-5">
        {/* ================= STEP 1: Upload Raw Media Assets ================= */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#e2e2eb]">Raw Media Assets</h2>
                <p className="text-xs text-[#c7c4d7] mt-0.5">
                  High-res clips queued for neural transient cutting
                </p>
              </div>
              <div className="bg-[#1e1f26] border border-white/[0.08] px-2.5 py-1 rounded-full flex items-center gap-1 text-[#c0c1ff]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="font-mono text-[11px] font-bold">100% Ready</span>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onClick={addSimulatedClip}
              className="bg-[#191b22] border-2 border-dashed border-white/[0.15] hover:border-[#8083ff]/50 rounded-2xl p-6 text-center relative overflow-hidden shadow-inner flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
              </div>
              <p className="text-sm font-semibold text-[#e2e2eb]">Drop videos & photos here</p>
              <p className="text-xs text-[#c7c4d7] max-w-xs">
                Supports MP4, MOV, HEIC, JPG up to 500MB per file with automatic 4K downsampling
              </p>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-[#282a30] rounded-full font-mono text-xs text-[#c0c1ff] font-bold hover:bg-[#33343b] active:scale-95 transition-transform flex items-center gap-1.5 shadow-sm border border-white/[0.08]"
              >
                <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                <span>Browse Device Files</span>
              </button>
            </div>

            {/* Total Tally Meta */}
            <div className="flex items-center justify-between bg-[#282a30]/80 px-4 py-2.5 rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">movie_filter</span>
                <span className="font-mono text-xs text-[#e2e2eb] font-semibold">
                  {clips.length} clips selected
                </span>
              </div>
              <span className="font-mono text-xs text-[#908fa0]">Total 1m 24s raw footage</span>
            </div>

            {/* Queue List */}
            <div className="space-y-2">
              {clips.map((clip) => (
                <div
                  key={clip.id}
                  className="flex items-center gap-3 bg-[#1e1f26] border border-white/[0.06] p-2.5 rounded-xl shadow-sm"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#0c0e14]">
                    <img
                      className="w-full h-full object-cover"
                      src={clip.thumbnail}
                      alt={clip.filename}
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 bg-[#111319]/80 font-mono text-[9px] px-1 rounded text-[#e2e2eb]">
                      {clip.duration}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#e2e2eb] truncate">{clip.filename}</p>
                    <p className="font-mono text-[10px] text-[#c7c4d7] flex items-center gap-1.5 mt-0.5">
                      <span>{clip.resolution} {clip.fps > 0 ? `${clip.fps}fps` : ''}</span>
                      <span className="text-[#908fa0]">•</span>
                      <span className="text-[#c0c1ff] font-bold">{clip.keyframes}</span>
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[20px] pr-1">
                    check_circle
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 2: Style & Mood ================= */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#e2e2eb]">Style & Rhythm</h2>
              <p className="text-xs text-[#c7c4d7] mt-0.5">
                Direct the visual pacing, mood, and color palette
              </p>
            </div>

            {/* Video Archetype Grid */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#e2e2eb] uppercase tracking-wider font-bold">
                Video Archetype
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Travel', icon: 'flight_takeoff', desc: 'Fast dynamic' },
                  { name: 'Cinematic', icon: 'movie', desc: 'Wide anamorphic' },
                  { name: 'Friends', icon: 'group', desc: 'Candid fast-cuts' },
                  { name: 'Love/Duo', icon: 'favorite', desc: 'Romantic slow' },
                  { name: 'Vlog', icon: 'videocam', desc: 'Speech sync' },
                  { name: 'Ceremony', icon: 'church', desc: 'Elegant glow' }
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setArchetype(item.name)}
                    className={`rounded-xl p-3 flex flex-col items-center text-center relative shadow-sm cursor-pointer border transition-all ${
                      archetype === item.name
                        ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#e2e2eb]'
                        : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:bg-[#282a30]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        archetype === item.name ? 'text-[#c0c1ff]' : 'text-[#908fa0]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-xs font-bold mt-1 text-[#e2e2eb]">{item.name}</span>
                    <span className="font-mono text-[9px] mt-0.5 text-[#908fa0]">
                      {archetype === item.name ? 'Selected' : item.desc}
                    </span>
                    {archetype === item.name && (
                      <span className="material-symbols-outlined text-[14px] text-[#c0c1ff] absolute top-1.5 right-1.5">
                        check_circle
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Arc Chips */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#e2e2eb] uppercase tracking-wider font-bold">
                Emotional Arc
              </label>
              <div className="flex flex-wrap gap-2">
                {['Emotional', 'Energetic (Hyper-Beat)', 'Nostalgic Lofi', 'Dark Synth'].map((arc) => (
                  <button
                    key={arc}
                    type="button"
                    onClick={() => setEmotionalArc(arc)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      emotionalArc === arc
                        ? 'bg-[#c0c1ff] text-[#1000a9] font-bold shadow-md shadow-[#8083ff]/20'
                        : 'bg-[#1e1f26] text-[#c7c4d7] border border-white/[0.06] hover:text-[#e2e2eb]'
                    }`}
                  >
                    {arc}
                  </button>
                ))}
              </div>
            </div>

            {/* Pacing & Color Grade */}
            <div className="bg-[#1e1f26] border border-white/[0.08] p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#e2e2eb]">Pacing Dynamics</p>
                  <p className="text-[11px] text-[#c7c4d7]">Sync cut-points to rhythm density</p>
                </div>
                <span className="font-mono text-xs bg-[#8083ff]/20 text-[#c0c1ff] px-2.5 py-0.5 rounded-full font-bold border border-[#8083ff]/30">
                  Balanced (1.0x)
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                <div>
                  <p className="text-xs font-bold text-[#e2e2eb]">Color Grade Preset</p>
                  <p className="text-[11px] text-[#c7c4d7]">LUT injection during final render</p>
                </div>
                <select
                  value={colorGrade}
                  onChange={(e) => setColorGrade(e.target.value)}
                  className="font-mono text-xs bg-[#282a30] text-[#ffb2b7] px-2.5 py-1 rounded-lg border border-white/[0.08] outline-none"
                >
                  <option value="Warm Cinematic">Warm Cinematic</option>
                  <option value="Teal & Pink LUT">Teal & Pink LUT</option>
                  <option value="Noir High Contrast">Noir High Contrast</option>
                  <option value="Vintage 90s Grain">Vintage 90s Grain</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: Music & Beat Sync (Active View from Image 5) ================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#e2e2eb]">Beat Matrix & Waveform</h2>
              <p className="text-xs text-[#c7c4d7] mt-0.5">
                Automated transient mapping with millisecond snap
              </p>
            </div>

            {/* Current Track Card */}
            <div className="bg-[#1e1f26] border border-white/[0.08] p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#0c0e14] border border-[#ffb2b7]/30 flex items-center justify-center text-[#ffb2b7] relative overflow-hidden flex-shrink-0 shadow-[0_0_12px_rgba(255,178,183,0.2)]">
                  <span className="material-symbols-outlined text-[28px] animate-pulse">music_note</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-[#e2e2eb] truncate">{selectedTrack.name}</p>
                    <span className="font-mono text-[9px] bg-[#b50036]/40 text-[#ffb2b7] border border-[#ffb2b7]/30 px-1.5 py-0.5 rounded uppercase font-bold">
                      {selectedTrack.genre}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs text-[#c0c1ff] font-bold">
                      {selectedTrack.bpm} BPM
                    </span>
                    <span className="text-[#908fa0] text-[10px]">•</span>
                    <span className="font-mono text-xs text-[#c7c4d7]">
                      {selectedTrack.duration} Track Length
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChangingTrack(true)}
                aria-label="Change Music Track"
                className="p-2.5 rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#c7c4d7] hover:text-[#e2e2eb] active:scale-95 transition-all border border-white/[0.08] flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </button>
            </div>

            {/* Waveform Visualizer Module */}
            <div className="bg-[#191b22] border border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffb2b7]"></span>
                  <span className="font-mono text-xs font-bold text-[#e2e2eb] uppercase tracking-wide">
                    Dynamic Transient Map
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#ffb2b7] bg-[#b50036]/30 border border-[#ffb2b7]/30 px-2 py-0.5 rounded">
                  {selectedTrack.hotCuts} Hot-Cuts Detected
                </span>
              </div>

              {/* Waveform Display Frame */}
              <div className="relative w-full h-28 bg-[#0c0e14] rounded-xl p-2 flex items-center justify-center overflow-hidden border border-white/[0.05]">
                {/* Section Tags Top Bar */}
                <div className="absolute top-1.5 inset-x-3 flex justify-between z-10 font-mono text-[9px]">
                  <span className="text-[#c7c4d7]/70 bg-[#1e1f26]/80 px-1.5 py-0.5 rounded">INTRO</span>
                  <span className="text-[#c0c1ff] bg-[#8083ff]/30 px-1.5 py-0.5 rounded font-bold">BUILD-UP</span>
                  <span className="text-[#ffb2b7] bg-[#b50036]/60 px-1.5 py-0.5 rounded font-bold">CHORUS PEAK</span>
                </div>

                {/* SVG Audio Waveform */}
                <svg className="w-full h-20 pt-4" fill="none" preserveAspectRatio="none" viewBox="0 0 400 60">
                  <path
                    d="M0 30 Q 15 22, 30 30 T 60 30 T 90 20 T 120 38 T 150 15 T 180 45 T 210 10 T 240 50 T 270 5 T 300 55 T 330 20 T 360 40 T 400 30"
                    stroke="#464554"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                  <g fill="#c0c1ff" opacity="0.85">
                    <rect height="12" rx="1.25" width="2.5" x="5" y="24" />
                    <rect height="20" rx="1.25" width="2.5" x="15" y="20" />
                    <rect height="8" rx="1.25" width="2.5" x="25" y="26" />
                    <rect height="28" rx="1.25" width="2.5" x="35" y="16" />
                    <rect height="16" rx="1.25" width="2.5" x="45" y="22" />
                    <rect height="24" rx="1.25" width="2.5" x="55" y="18" />
                    <rect height="10" rx="1.25" width="2.5" x="65" y="25" />
                    <rect height="40" rx="1.25" width="2.5" x="75" y="10" />
                    <rect height="30" rx="1.25" width="2.5" x="85" y="15" />
                    <rect height="14" rx="1.25" width="2.5" x="95" y="23" />
                    <rect height="44" rx="1.25" width="2.5" x="105" y="8" />
                    <rect height="36" rx="1.25" width="2.5" x="115" y="12" />
                    <rect height="24" rx="1.25" width="2.5" x="125" y="18" />
                    <rect fill="#ffb2b7" height="50" rx="1.25" width="2.5" x="135" y="5" />
                    <rect height="32" rx="1.25" width="2.5" x="145" y="14" />
                    <rect fill="#ffb2b7" height="52" rx="1.25" width="2.5" x="155" y="4" />
                    <rect height="28" rx="1.25" width="2.5" x="165" y="16" />
                    <rect fill="#ffb2b7" height="56" rx="1.25" width="2.5" x="175" y="2" />
                    <rect height="40" rx="1.25" width="2.5" x="185" y="10" />
                    <rect fill="#ffb2b7" height="48" rx="1.25" width="2.5" x="195" y="6" />
                    <rect height="30" rx="1.25" width="2.5" x="205" y="15" />
                    <rect fill="#ffb2b7" height="58" rx="1.25" width="2.5" x="215" y="1" />
                    <rect height="36" rx="1.25" width="2.5" x="225" y="12" />
                    <rect fill="#ffb2b7" height="44" rx="1.25" width="2.5" x="235" y="8" />
                    <rect height="22" rx="1.25" width="2.5" x="245" y="19" />
                    <rect fill="#ffb2b7" height="54" rx="1.25" width="2.5" x="255" y="3" />
                    <rect height="38" rx="1.25" width="2.5" x="265" y="11" />
                    <rect height="16" rx="1.25" width="2.5" x="275" y="22" />
                    <rect fill="#ffb2b7" height="46" rx="1.25" width="2.5" x="285" y="7" />
                    <rect height="32" rx="1.25" width="2.5" x="295" y="14" />
                    <rect height="20" rx="1.25" width="2.5" x="305" y="20" />
                    <rect fill="#ffb2b7" height="50" rx="1.25" width="2.5" x="315" y="5" />
                    <rect height="24" rx="1.25" width="2.5" x="325" y="18" />
                    <rect height="10" rx="1.25" width="2.5" x="335" y="25" />
                    <rect height="36" rx="1.25" width="2.5" x="345" y="12" />
                    <rect height="16" rx="1.25" width="2.5" x="355" y="22" />
                    <rect height="30" rx="1.25" width="2.5" x="365" y="15" />
                    <rect height="8" rx="1.25" width="2.5" x="375" y="26" />
                    <rect height="18" rx="1.25" width="2.5" x="385" y="21" />
                    <rect height="4" rx="1.25" width="2.5" x="395" y="28" />
                  </g>
                  {/* Transient Beat Lines */}
                  <line stroke="#ffb2b7" strokeDasharray="2 2" strokeWidth="1.5" x1="75" x2="75" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeDasharray="2 2" strokeWidth="1.5" x1="105" x2="105" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="135" x2="135" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="155" x2="155" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="175" x2="175" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="195" x2="195" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2.5" x1="215" x2="215" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="255" x2="255" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="285" x2="285" y1="0" y2="60" />
                  <line stroke="#ffb2b7" strokeWidth="2" x1="315" x2="315" y1="0" y2="60" />
                </svg>

                {/* Range Trim Highlight Overlay [0:15 - 0:45 (30s)] */}
                <div className="absolute inset-y-0 left-[22%] right-[25%] bg-[#8083ff]/20 rounded border-y border-[#c0c1ff]/40 pointer-events-none">
                  <div className="absolute left-0 inset-y-0 w-2.5 bg-[#c0c1ff] rounded-l flex items-center justify-center">
                    <span className="w-0.5 h-3 bg-[#111319] rounded"></span>
                  </div>
                  <div className="absolute right-0 inset-y-0 w-2.5 bg-[#c0c1ff] rounded-r flex items-center justify-center">
                    <span className="w-0.5 h-3 bg-[#111319] rounded"></span>
                  </div>
                </div>
              </div>

              {/* Scrubber Timestamps */}
              <div className="flex items-center justify-between font-mono text-xs text-[#908fa0] pt-1">
                <span>0:00</span>
                <span className="text-[#c0c1ff] font-bold bg-[#8083ff]/20 border border-[#8083ff]/30 px-2 py-0.5 rounded">
                  Window: 0:15 - 0:45 (30s)
                </span>
                <span>{selectedTrack.duration}</span>
              </div>
            </div>

            {/* Beat Sync Strength Selector */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#e2e2eb] uppercase tracking-wider font-bold">
                Cut Frequency & Snapping
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPacing('subtle')}
                  className={`py-3 px-2 rounded-xl text-center border transition-all ${
                    pacing === 'subtle'
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold shadow-md'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:bg-[#282a30]'
                  }`}
                >
                  <p className="text-xs font-semibold">Subtle</p>
                  <p className="font-mono text-[10px] mt-0.5 opacity-80">Downbeats only</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPacing('balanced')}
                  className={`py-3 px-2 rounded-xl text-center border transition-all ${
                    pacing === 'balanced'
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold shadow-lg shadow-[#8083ff]/30 border-[#c0c1ff]'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:bg-[#282a30]'
                  }`}
                >
                  <p className="text-xs font-bold">Balanced</p>
                  <p className="font-mono text-[10px] mt-0.5 opacity-90 font-medium">8th-note groove</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPacing('aggressive')}
                  className={`py-3 px-2 rounded-xl text-center border transition-all ${
                    pacing === 'aggressive'
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold shadow-md'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:bg-[#282a30]'
                  }`}
                >
                  <p className="text-xs font-semibold">Aggressive</p>
                  <p className="font-mono text-[10px] mt-0.5 opacity-80">Kick + snare snap</p>
                </button>
              </div>
            </div>

            {/* Royalty & Audio Permissions Toggle */}
            <div className="flex items-center justify-between bg-[#1e1f26] border border-white/[0.08] px-4 py-3.5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[22px]">policy</span>
                <div>
                  <p className="text-xs font-bold text-[#e2e2eb]">Commercial License Active</p>
                  <p className="text-[11px] text-[#c7c4d7]">Cleared for TikTok, IG Reels, and YouTube Shorts</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCommercialLicense(!commercialLicense)}
                className={`w-11 h-6 rounded-full relative flex items-center px-1 shadow-inner transition-colors ${
                  commercialLicense ? 'bg-[#8083ff]' : 'bg-[#33343b]'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    commercialLicense ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: Output Architecture ================= */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#e2e2eb]">Export Architecture</h2>
              <p className="text-xs text-[#c7c4d7] mt-0.5">
                Optimize container dimensions, bitrate, and sound balance
              </p>
            </div>

            {/* Aspect Ratio Cards */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#e2e2eb] uppercase tracking-wider font-bold">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { ratio: '9:16', title: 'Reels / Shorts', w: 'w-5', h: 'h-8' },
                  { ratio: '16:9', title: 'Landscape', w: 'w-8', h: 'h-5' },
                  { ratio: '1:1', title: 'Square', w: 'w-6', h: 'h-6' }
                ].map((item) => (
                  <div
                    key={item.ratio}
                    onClick={() => setAspectRatio(item.ratio as any)}
                    className={`rounded-xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer border transition-all ${
                      aspectRatio === item.ratio
                        ? 'bg-[#8083ff]/20 border-[#c0c1ff] shadow-sm'
                        : 'bg-[#1e1f26] border-white/[0.06] hover:bg-[#282a30]'
                    }`}
                  >
                    <div
                      className={`${item.w} ${item.h} ${
                        aspectRatio === item.ratio ? 'bg-[#c0c1ff]' : 'bg-[#33343b]'
                      } rounded-sm mb-2 flex items-center justify-center`}
                    >
                      <span
                        className={`text-[8px] font-bold ${
                          aspectRatio === item.ratio ? 'text-[#1000a9]' : 'text-[#908fa0]'
                        }`}
                      >
                        {item.ratio}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#e2e2eb]">{item.title}</p>
                    <span
                      className={`font-mono text-[9px] mt-0.5 ${
                        aspectRatio === item.ratio ? 'text-[#c0c1ff] font-bold' : 'text-[#908fa0]'
                      }`}
                    >
                      {aspectRatio === item.ratio ? 'Active' : 'Select'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Balancing Slider */}
            <div className="bg-[#1e1f26] border border-white/[0.08] p-4 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#e2e2eb]">Sound Mix Ratio</span>
                <span className="font-mono text-xs text-[#c0c1ff] font-bold">
                  Music {soundMixRatio}% · Ambience {100 - soundMixRatio}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundMixRatio}
                onChange={(e) => setSoundMixRatio(parseInt(e.target.value, 10))}
                className="w-full accent-[#8083ff] bg-[#33343b] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#908fa0]">
                <span>Soundtrack (Primary)</span>
                <span>Original Clip Audio</span>
              </div>
            </div>

            {/* Quick Specs List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#1e1f26] border border-white/[0.05] px-4 py-3 rounded-xl">
                <span className="text-xs text-[#c7c4d7]">Resolution</span>
                <span className="font-mono text-xs text-[#e2e2eb] font-bold bg-[#282a30] px-2.5 py-1 rounded-lg">
                  {resolution}
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#1e1f26] border border-white/[0.05] px-4 py-3 rounded-xl">
                <span className="text-xs text-[#c7c4d7]">Target Duration</span>
                <span className="font-mono text-xs text-[#e2e2eb] font-bold bg-[#282a30] px-2.5 py-1 rounded-lg">
                  30 Seconds Locked
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#1e1f26] border border-white/[0.05] px-4 py-3 rounded-xl">
                <span className="text-xs text-[#c7c4d7]">Smart AI Framing</span>
                <button
                  type="button"
                  onClick={() => setSmartFraming(!smartFraming)}
                  className="font-mono text-xs text-[#ffb2b7] font-bold bg-[#b50036]/20 border border-[#ffb2b7]/30 px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
                  <span>{smartFraming ? 'Subject Centered' : 'Original Scale'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: Review & Render ================= */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-[#e2e2eb]">Ready to Synthesize</h2>
              <p className="text-xs text-[#c7c4d7] mt-0.5">
                Summary of neural edit parameters before compiling
              </p>
            </div>

            {/* Preview Mockup Card */}
            <div className="bg-[#1e1f26] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full h-48 bg-[#0c0e14]">
                <img
                  className="w-full h-full object-cover opacity-85"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzIXhi_UPkhWBO38m65XVpO1WO0ahCGPRX5b--_ohAYNS17DO1QBRezUuN06dEhKj9-sWgyKs9mIT5W7KMOGrpRumc27qLwMcq0WhYBk6wbKHQW4JDaJKR1Ogu8f5mru6qrbgV6JToIrLGIGOGrNTcroi_FONUUgZkGp4jgo0yuyGxyKAowxI4R8VTDR87HKC69S6dYXHeopCC-A3Tqo4xc3cGhKYmbnxTvybfRENzz1bAG-yEY29mUg"
                  alt="Review montage preview"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f26] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#e2e2eb] drop-shadow">
                      {selectedTrack.name} • {archetype} Edit
                    </p>
                    <p className="font-mono text-[11px] text-[#c0c1ff]">
                      30s · {selectedTrack.bpm} BPM · {selectedTrack.hotCuts} Hot Cuts
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#c0c1ff] flex items-center justify-center text-[#1000a9] shadow-lg">
                    <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 bg-[#1e1f26]">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-[#282a30] p-2.5 rounded-xl border border-white/[0.04]">
                    <p className="font-mono text-[10px] text-[#908fa0] uppercase">Clips Included</p>
                    <p className="text-lg font-bold text-[#e2e2eb]">{clips.length} Sources</p>
                  </div>
                  <div className="bg-[#282a30] p-2.5 rounded-xl border border-white/[0.04]">
                    <p className="font-mono text-[10px] text-[#908fa0] uppercase">Est. Render Time</p>
                    <p className="text-lg font-bold text-[#ffb2b7] font-mono">~ 8.4s</p>
                  </div>
                </div>

                <div className="bg-[#0c0e14] p-3 rounded-xl flex items-center gap-2 text-[#c0c1ff] text-xs border border-white/[0.05]">
                  <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                  <span>Beat markers synchronized with zero phase distortion.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Wizard Controls Bar */}
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-[#0c0e14]/95 backdrop-blur-xl px-4 py-3 border-t border-white/[0.08] shadow-[0_-6px_20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            onClick={handleBack}
            className={`min-h-[44px] px-4 bg-[#1e1f26] hover:bg-[#282a30] text-[#e2e2eb] rounded-xl font-mono text-xs font-bold flex items-center gap-1 active:scale-95 transition-all border border-white/[0.06] ${
              currentStep === 1 ? 'opacity-40 pointer-events-none' : ''
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="min-h-[44px] flex-1 bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-[0_0_20px_rgba(192,193,255,0.35)]"
            type="button"
          >
            <span>{buttonLabels[currentStep - 1]}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </aside>

      {/* Audio Track Selector Modal */}
      {isChangingTrack && (
        <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1e1f26] border border-white/[0.1] rounded-2xl p-5 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[22px]">library_music</span>
                <h3 className="text-base font-bold text-[#e2e2eb]">Select Royalty-Free Track</h3>
              </div>
              <button
                onClick={() => setIsChangingTrack(false)}
                className="w-8 h-8 rounded-full bg-[#282a30] text-[#c7c4d7] hover:text-[#e2e2eb] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="divide-y divide-white/[0.05] max-h-72 overflow-y-auto">
              {AUDIO_TRACKS.map((trk) => (
                <div
                  key={trk.id}
                  onClick={() => {
                    setSelectedTrack(trk);
                    setIsChangingTrack(false);
                  }}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    selectedTrack.id === trk.id
                      ? 'bg-[#8083ff]/20 text-[#c0c1ff]'
                      : 'hover:bg-[#282a30] text-[#e2e2eb]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{trk.name}</span>
                    <span className="font-mono text-[10px] text-[#c7c4d7]">
                      {trk.genre} • {trk.bpm} BPM • {trk.duration}
                    </span>
                  </div>
                  {selectedTrack.id === trk.id && (
                    <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
