import React, { useState } from 'react';
import { Project, InspirationStyle, ScreenType } from '../types';

interface HomeScreenProps {
  projects: Project[];
  inspirations: InspirationStyle[];
  onSelectProject: (project: Project) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenUpgrade: () => void;
  onOpenVault: () => void;
  onOpenShare: (project: Project) => void;
  onDuplicateProject: (project: Project) => void;
  onApplyStyle: (style: InspirationStyle) => void;
  editsLeft: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  projects,
  inspirations,
  onSelectProject,
  onNavigate,
  onOpenUpgrade,
  onOpenVault,
  onOpenShare,
  onDuplicateProject,
  onApplyStyle,
  editsLeft
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ready' | 'processing' | 'draft'>('all');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const readyCount = projects.filter(p => p.status === 'ready').length;
  const processingCount = projects.filter(p => p.status === 'processing').length;
  const draftCount = projects.filter(p => p.status === 'draft').length;

  const handleStartGenerating = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsWizardOpen(false);
      onNavigate('processing');
    }, 1200);
  };

  const scrollToInspirations = () => {
    const el = document.getElementById('inspirations-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-4 pt-20 pb-24 gap-5 select-none">
      {/* Welcome & Quota Pill Section */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-xs text-[#bdc2ff] uppercase tracking-wider">
              Welcome back
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#e2e2eb] truncate">
              Ready for your next story, Alex?
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="inline-flex items-center gap-2 bg-[#282a30] px-3 py-1 rounded-full border border-white/[0.06] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ffb2b7] animate-ping"></span>
            <span className="font-mono text-xs text-[#e2e2eb]">
              {editsLeft} of 5 AI Edits Left
            </span>
            <span className="text-[10px] text-[#c0c1ff] uppercase font-bold bg-[#8083ff]/20 px-1.5 py-0.5 rounded">
              Free tier
            </span>
          </div>

          <button
            onClick={onOpenUpgrade}
            className="font-mono text-xs text-[#c0c1ff] hover:text-white ml-auto transition-colors flex items-center gap-1 active:scale-95"
            type="button"
          >
            Upgrade
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Hero Creation Catalyst Card */}
      <section className="relative overflow-hidden rounded-2xl bg-[#282a30] border border-white/[0.08] p-5 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#8083ff]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#b50036]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c0c1ff]/15 border border-[#8083ff]/30 flex items-center justify-center text-[#c0c1ff] shadow-sm">
                <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#ffb2b7] uppercase font-bold tracking-widest font-mono">
                  Beat-Sync Engine v2.4
                </span>
                <h2 className="text-lg font-bold text-[#e2e2eb] leading-tight">
                  Start a new beat edit
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#0c0e14]/80 px-2.5 py-1 rounded-full text-[#bdc2ff] border border-white/[0.05]">
              <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
              <span className="font-mono text-[11px]">Auto-Snapping</span>
            </div>
          </div>

          <p className="text-sm text-[#c7c4d7] leading-relaxed">
            Upload your clips. Choose your vibe. Get a video that feels professionally edited in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-1">
            <button
              onClick={() => setIsWizardOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#8083ff]/20 transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span className="text-sm">Create my video</span>
            </button>

            <button
              onClick={scrollToInspirations}
              className="w-full flex items-center justify-center gap-2 bg-[#1e1f26] hover:bg-[#33343b] text-[#e2e2eb] font-semibold py-3 px-4 rounded-xl border border-white/[0.08] transition-colors active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#bdc2ff]">auto_awesome</span>
              <span className="text-sm">Explore styles</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Style Inspirations Carousel */}
      <section id="inspirations-section" className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">music_note</span>
            <h3 className="text-base font-bold text-[#e2e2eb]">Quick Inspirations</h3>
          </div>
          <span className="font-mono text-xs text-[#c7c4d7]">Tap to apply</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          {inspirations.map((style) => (
            <div
              key={style.id}
              onClick={() => onApplyStyle(style)}
              className="flex-shrink-0 w-36 rounded-xl bg-[#1e1f26] border border-white/[0.06] overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform shadow-md hover:border-[#8083ff]/40"
            >
              <div className="h-24 w-full relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={style.image}
                  alt={style.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f26] via-transparent to-transparent"></div>
                <span className="absolute top-2 right-2 bg-[#0c0e14]/80 backdrop-blur-md text-[#e2e2eb] font-mono text-[10px] px-1.5 py-0.5 rounded">
                  {style.duration}
                </span>
              </div>
              <div className="p-2.5 flex flex-col gap-0.5">
                <span className="text-xs font-bold text-[#e2e2eb] truncate">
                  {style.name}
                </span>
                <div className="flex items-center justify-between text-[#c7c4d7] font-mono text-[10px]">
                  <span className="text-[#bdc2ff] font-semibold">{style.bpm} BPM</span>
                  <span>{style.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">video_library</span>
              <h3 className="text-base font-bold text-[#e2e2eb]">Recent Projects</h3>
            </div>
            <span className="font-mono text-xs text-[#c7c4d7]">{projects.length} total</span>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border border-[#8083ff]/40 shadow-sm'
                  : 'bg-[#1e1f26] text-[#c7c4d7] border border-white/[0.05] hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('ready')}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeFilter === 'ready'
                  ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border border-[#8083ff]/40 shadow-sm'
                  : 'bg-[#1e1f26] text-[#c7c4d7] border border-white/[0.05] hover:text-white'
              }`}
            >
              Ready ({readyCount})
            </button>
            <button
              onClick={() => setActiveFilter('processing')}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeFilter === 'processing'
                  ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border border-[#8083ff]/40 shadow-sm'
                  : 'bg-[#1e1f26] text-[#c7c4d7] border border-white/[0.05] hover:text-white'
              }`}
            >
              Processing ({processingCount})
            </button>
            <button
              onClick={() => setActiveFilter('draft')}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeFilter === 'draft'
                  ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border border-[#8083ff]/40 shadow-sm'
                  : 'bg-[#1e1f26] text-[#c7c4d7] border border-white/[0.05] hover:text-white'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-3">
          {filteredProjects.map((project) => {
            // Case 1: Processing Project Card (College Farewell 2026)
            if (project.status === 'processing') {
              return (
                <article
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onNavigate('processing');
                  }}
                  className="flex flex-col rounded-2xl bg-[#1e1f26] border border-white/[0.08] overflow-hidden shadow-lg cursor-pointer group hover:border-[#8083ff]/50 transition-all"
                >
                  <div className="relative w-full h-40 bg-[#0c0e14]">
                    <img
                      className="w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-transform duration-300"
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#111319]/60 backdrop-blur-[2px]"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-[#0c0e14]/80 backdrop-blur-md text-[#e2e2eb] font-mono text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {project.aspectRatio} Landscape
                      </span>
                      <span className="bg-[#0c0e14]/80 backdrop-blur-md text-[#e2e2eb] font-mono text-[10px] px-1.5 py-0.5 rounded">
                        {project.duration}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#b50036]/80 text-[#ffdadb] font-mono text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-[#ffb2b7]/30 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7] animate-pulse"></span>
                        Processing
                      </span>
                    </div>

                    {/* Center render indicator */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-[#8083ff]/20 border border-[#c0c1ff]/30 flex items-center justify-center mb-1 text-[#c0c1ff]">
                        <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
                      </div>
                      <span className="font-mono text-xs text-[#c0c1ff] font-bold">
                        {project.processingStep || 'Step 4 of 6 · Rendering edit 64%'}
                      </span>
                      <div className="w-48 h-1.5 bg-[#33343b] rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#8083ff] to-[#ffb2b7] rounded-full transition-all duration-500"
                          style={{ width: `${project.processingProgress || 64}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#e2e2eb] truncate group-hover:text-[#c0c1ff] transition-colors">
                        {project.title}
                      </h4>
                      <span className="font-mono text-xs text-[#ffb2b7]">~1m remaining</span>
                    </div>
                    <p className="text-xs text-[#c7c4d7]">
                      {project.category} · AI generating audio waveform alignment & dynamic transitions.
                    </p>
                  </div>
                </article>
              );
            }

            // Case 2: Draft Project Card (Mom & Dad Anniversary)
            if (project.status === 'draft') {
              return (
                <article
                  key={project.id}
                  className="flex flex-col rounded-2xl bg-[#1e1f26] border border-white/[0.08] overflow-hidden shadow-lg"
                >
                  <div className="relative w-full h-36 bg-[#0c0e14]">
                    <img
                      className="w-full h-full object-cover"
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f26] via-[#1e1f26]/30 to-transparent"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-[#0c0e14]/80 backdrop-blur-md text-[#e2e2eb] font-mono text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {project.aspectRatio} Square
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#282a30]/90 text-[#c7c4d7] font-mono text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/[0.08]">
                        <span className="material-symbols-outlined text-[12px]">edit_note</span>
                        Draft
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-sm font-bold text-[#e2e2eb] truncate">
                          {project.title}
                        </h4>
                        <span className="text-xs text-[#c7c4d7]">
                          {project.category} · {project.clipsCount} clips queued · Unsaved beat marker
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectProject(project);
                        onNavigate('create');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#282a30] hover:bg-[#33343b] text-[#c0c1ff] py-2 rounded-xl text-xs font-semibold border border-white/[0.06] transition-colors active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                      <span>Continue editing</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Case 3: Ready Project Card (Japan Summer Memories, Weekend with Friends)
            return (
              <article
                key={project.id}
                className="flex flex-col rounded-2xl bg-[#1e1f26] border border-white/[0.08] overflow-hidden shadow-lg transition-transform active:scale-[0.99]"
              >
                <div className="relative w-full h-44 bg-[#0c0e14]">
                  <img
                    className="w-full h-full object-cover"
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f26] via-[#1e1f26]/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#0c0e14]/80 backdrop-blur-md text-[#c0c1ff] font-mono text-[10px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1 border border-[#8083ff]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]"></span>
                      {project.aspectRatio} Reel
                    </span>
                    <span className="bg-[#0c0e14]/80 backdrop-blur-md text-[#e2e2eb] font-mono text-[10px] px-1.5 py-0.5 rounded">
                      {project.duration}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-950/80 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md border border-emerald-500/30">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Ready
                    </span>
                  </div>

                  {/* Audio badge in preview */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[#e2e2eb]">
                    <div className="flex items-center gap-1.5 bg-[#111319]/85 backdrop-blur-md px-2 py-1 rounded-md min-w-0 border border-white/[0.08]">
                      <span className="material-symbols-outlined text-[#ffb2b7] text-[16px]">graphic_eq</span>
                      <span className="font-mono text-[11px] truncate">
                        {project.trackName} · {project.bpm} BPM
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-[#8083ff]/20 text-[#c0c1ff] px-2 py-0.5 rounded border border-[#8083ff]/30">
                      {project.cutsCount} Cuts
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-bold text-[#e2e2eb] truncate">
                        {project.title}
                      </h4>
                      <span className="text-xs text-[#c7c4d7]">
                        Category: {project.category} · {project.editedAgo}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onSelectProject(project);
                        onNavigate('preview');
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] py-2 px-3 rounded-xl font-bold text-xs transition-colors active:scale-95 shadow-md shadow-[#8083ff]/20"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => onDuplicateProject(project)}
                      aria-label="Duplicate project"
                      className="min-w-[40px] h-9 flex items-center justify-center bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] rounded-xl border border-white/[0.08] transition-colors active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>

                    <button
                      onClick={() => onOpenShare(project)}
                      aria-label="Export video"
                      className="min-w-[40px] h-9 flex items-center justify-center bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] rounded-xl border border-white/[0.08] transition-colors active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Storage & Quota Vault Banner */}
      <section className="rounded-2xl bg-[#1e1f26] border border-white/[0.08] p-4 flex flex-col gap-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#bdc2ff] text-[18px]">cloud_sync</span>
            <span className="text-xs font-bold text-[#e2e2eb]">Cloud Media Vault</span>
          </div>
          <span className="font-mono text-xs text-[#c7c4d7]">3.4 GB of 10 GB</span>
        </div>

        <div className="w-full h-1.5 bg-[#33343b] rounded-full overflow-hidden mt-0.5">
          <div className="h-full bg-gradient-to-r from-[#bdc2ff] to-[#8083ff] rounded-full" style={{ width: '34%' }}></div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-[#c7c4d7]">Private encrypted storage</span>
          <button
            onClick={onOpenVault}
            className="font-mono text-[10px] text-[#c0c1ff] uppercase font-bold hover:underline"
          >
            Manage Vault
          </button>
        </div>
      </section>

      {/* Demo Disclaimer Badge */}
      <footer className="flex items-center justify-center gap-1.5 py-1 text-[#908fa0]">
        <span className="material-symbols-outlined text-[14px]">info</span>
        <span className="font-mono text-[11px] tracking-tight text-center">
          BeatCut Studio preview sandbox · All tracks royalty-free
        </span>
      </footer>

      {/* Micro-Wizard Bottom Sheet (Interactive Modal) */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0e14]/80 backdrop-blur-md flex flex-col justify-end transition-opacity">
          <div className="bg-[#282a30] border-t border-white/[0.1] rounded-t-3xl p-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 bg-[#33343b] rounded-full mx-auto"></div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#ffb2b7] uppercase font-bold tracking-wider">
                  New Project
                </span>
                <h3 className="text-lg font-bold text-[#e2e2eb]">Setup Your Beat Edit</h3>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1e1f26] flex items-center justify-center text-[#c7c4d7] hover:text-[#e2e2eb]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#c0c1ff] rounded-full"></div>
              <div className="flex-1 h-1 bg-[#33343b] rounded-full"></div>
              <div className="flex-1 h-1 bg-[#33343b] rounded-full"></div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#e2e2eb]">1. Choose Canvas Format</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('9:16')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    selectedFormat === '9:16'
                      ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] shadow-sm'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">stay_current_portrait</span>
                  <span className="font-mono text-[11px] font-semibold">9:16 Reel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('1:1')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    selectedFormat === '1:1'
                      ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] shadow-sm'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">crop_square</span>
                  <span className="font-mono text-[11px]">1:1 Post</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('16:9')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    selectedFormat === '16:9'
                      ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] shadow-sm'
                      : 'bg-[#1e1f26] border-white/[0.06] text-[#c7c4d7] hover:text-[#e2e2eb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">stay_current_landscape</span>
                  <span className="font-mono text-[11px]">16:9 Cinema</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#e2e2eb]">2. Upload Clips</span>
              <div
                onClick={() => onNavigate('create')}
                className="border-2 border-dashed border-white/[0.15] hover:border-[#8083ff]/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-[#1e1f26]/60 cursor-pointer hover:bg-[#1e1f26] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                </div>
                <span className="text-xs font-semibold text-[#e2e2eb]">Select 3 to 15 video clips</span>
                <span className="text-[11px] text-[#c7c4d7]">MP4, MOV, ProRes up to 4K</span>
              </div>
            </div>

            <button
              onClick={handleStartGenerating}
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#8083ff]/20 active:scale-95 transition-all mt-1"
              type="button"
            >
              {isAnalyzing ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                  <span>Analyzing Transients...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">auto_videocam</span>
                  <span>Auto-Generate Cuts</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
