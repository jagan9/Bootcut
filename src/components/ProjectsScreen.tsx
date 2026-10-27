import React, { useState } from 'react';
import { Project, ScreenType } from '../types';

interface ProjectsScreenProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenShare: (project: Project) => void;
  onDuplicateProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onOpenVault: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects,
  onSelectProject,
  onNavigate,
  onOpenShare,
  onDuplicateProject,
  onDeleteProject,
  onOpenVault
}) => {
  const [filter, setFilter] = useState<'all' | 'ready' | 'processing' | 'draft' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortIndex, setSortIndex] = useState(0);
  const [activeMenuProjectId, setActiveMenuProjectId] = useState<string | null>(null);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sortOptions = ['Recently Edited', 'Created Date', 'Duration', 'Title A-Z'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSortRotate = () => {
    setSortIndex((prev) => (prev + 1) % sortOptions.length);
  };

  const readyCount = projects.filter((p) => p.status === 'ready').length;
  const processingCount = projects.filter((p) => p.status === 'processing').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;

  const filtered = projects.filter((p) => {
    if (filter === 'archived') return false;
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.trackName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleSelectProject = (id: string) => {
    if (selectedProjectIds.includes(id)) {
      setSelectedProjectIds(selectedProjectIds.filter((pId) => pId !== id));
    } else {
      setSelectedProjectIds([...selectedProjectIds, id]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-28 px-4 space-y-4 select-none animate-in fade-in duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#33343b] border border-white/[0.1] text-[#e2e2eb] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">check_circle</span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Screen Context & Multi-Select Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-[#e2e2eb]">Studio Projects</h1>
          <span className="bg-[#282a30] px-2 py-0.5 rounded-full font-mono text-xs text-[#bdc2ff] border border-white/[0.06]">
            {projects.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsBatchMode(!isBatchMode);
              if (isBatchMode) setSelectedProjectIds([]);
            }}
            aria-label="Select multiple projects"
            className={`h-9 px-3 rounded-xl border flex items-center gap-1 text-xs font-mono transition-all active:scale-95 ${
              isBatchMode
                ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] font-bold'
                : 'bg-[#282a30] border-white/[0.08] text-[#c7c4d7] hover:text-[#e2e2eb]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            <span>{isBatchMode ? `Done (${selectedProjectIds.length})` : 'Select'}</span>
          </button>

          <button
            onClick={() => showToast('All cloud timelines synced')}
            aria-label="Cloud sync status"
            className="h-9 w-9 rounded-xl bg-[#282a30] border border-white/[0.08] text-[#c7c4d7] hover:text-[#e2e2eb] flex items-center justify-center active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#bdc2ff]">cloud_done</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#908fa0]">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search project, track, or mood..."
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#1e1f26] border border-white/[0.08] text-[#e2e2eb] placeholder-[#908fa0] text-xs focus:outline-none focus:border-[#8083ff] shadow-sm"
          type="text"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#908fa0] hover:text-[#e2e2eb]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`filter-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs flex-shrink-0 transition-all ${
            filter === 'all'
              ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
              : 'bg-[#282a30] text-[#c7c4d7] border border-white/[0.06] hover:text-white'
          }`}
        >
          <span>All</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#0c0e14]/40 font-bold">{projects.length}</span>
        </button>

        <button
          onClick={() => setFilter('ready')}
          className={`filter-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs flex-shrink-0 transition-all ${
            filter === 'ready'
              ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
              : 'bg-[#282a30] text-[#c7c4d7] border border-white/[0.06] hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]"></span>
          <span>Ready</span>
          <span className="opacity-70">{readyCount}</span>
        </button>

        <button
          onClick={() => setFilter('processing')}
          className={`filter-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs flex-shrink-0 transition-all ${
            filter === 'processing'
              ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
              : 'bg-[#282a30] text-[#c7c4d7] border border-white/[0.06] hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7] animate-pulse"></span>
          <span>Rendering</span>
          <span className="opacity-70">{processingCount}</span>
        </button>

        <button
          onClick={() => setFilter('draft')}
          className={`filter-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs flex-shrink-0 transition-all ${
            filter === 'draft'
              ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
              : 'bg-[#282a30] text-[#c7c4d7] border border-white/[0.06] hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#908fa0]"></span>
          <span>Drafts</span>
          <span className="opacity-70">{draftCount}</span>
        </button>

        <button
          onClick={() => setFilter('archived')}
          className={`filter-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs flex-shrink-0 transition-all ${
            filter === 'archived'
              ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
              : 'bg-[#282a30] text-[#c7c4d7] border border-white/[0.06] hover:text-white'
          }`}
        >
          <span>Archived</span>
          <span className="opacity-70">0</span>
        </button>
      </div>

      {/* Sorting & View Mode Strip */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-1.5 text-[#c7c4d7] font-mono text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#bdc2ff]">sort</span>
          <button
            onClick={handleSortRotate}
            className="flex items-center gap-1 hover:text-[#e2e2eb] transition-colors"
            type="button"
          >
            <span>{sortOptions[sortIndex]}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>

        <div className="flex items-center bg-[#282a30] p-0.5 rounded-xl border border-white/[0.06] shadow-inner">
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid visual view"
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-[#111319] text-[#c0c1ff]' : 'text-[#908fa0] hover:text-[#e2e2eb]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">view_stream</span>
          </button>
          <button
            onClick={() => setViewMode('compact')}
            aria-label="Compact list view"
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              viewMode === 'compact' ? 'bg-[#111319] text-[#c0c1ff]' : 'text-[#908fa0] hover:text-[#e2e2eb]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">menu</span>
          </button>
        </div>
      </div>

      {/* Projects Stream */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-[#1e1f26] border border-white/[0.06] rounded-2xl flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[32px] text-[#908fa0]">video_library</span>
            <p className="text-xs font-bold text-[#e2e2eb]">No projects found</p>
            <p className="text-[11px] text-[#c7c4d7]">Try resetting filters or start a new cut.</p>
          </div>
        ) : (
          filtered.map((proj) => {
            const isSelected = selectedProjectIds.includes(proj.id);

            return (
              <article
                key={proj.id}
                className="group relative rounded-2xl bg-[#1e1f26] border border-white/[0.08] p-3.5 shadow-md flex flex-col space-y-3 transition-all hover:border-[#8083ff]/40"
              >
                {/* Media Aspect Card Preview */}
                <div
                  className={`relative w-full ${
                    viewMode === 'compact' ? 'h-28' : 'h-44'
                  } rounded-xl overflow-hidden bg-[#0c0e14] flex items-center justify-center transition-all duration-300`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={proj.coverImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14]/90 via-[#0c0e14]/20 to-transparent"></div>

                  {/* Batch Selection checkbox */}
                  {isBatchMode && (
                    <button
                      onClick={() => toggleSelectProject(proj.id)}
                      className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-lg bg-[#0c0e14]/80 backdrop-blur-md flex items-center justify-center border border-white/[0.2]"
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                          check_box
                        </span>
                      )}
                    </button>
                  )}

                  {/* Badges on Preview */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span
                      className={`inline-flex items-center gap-1 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-[10px] shadow-sm ${
                        proj.status === 'ready'
                          ? 'bg-[#0c0e14]/80 text-[#c0c1ff] border border-[#8083ff]/30'
                          : proj.status === 'processing'
                          ? 'bg-[#b50036]/80 text-[#ffdadb] border border-[#ffb2b7]/30'
                          : 'bg-[#373940]/80 text-[#e2e2eb]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          proj.status === 'ready'
                            ? 'bg-[#c0c1ff]'
                            : proj.status === 'processing'
                            ? 'bg-[#ffb2b7] animate-pulse'
                            : 'bg-[#908fa0]'
                        }`}
                      ></span>
                      {proj.status === 'processing' ? 'Rendering 64%' : proj.status === 'ready' ? 'Ready' : 'Draft'}
                    </span>
                    <span className="bg-[#0c0e14]/80 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-[10px] text-[#c7c4d7]">
                      {proj.aspectRatio}
                    </span>
                  </div>

                  {!isBatchMode && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="bg-[#0c0e14]/80 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[10px] text-[#e2e2eb]">
                        {proj.duration}
                      </span>
                    </div>
                  )}

                  {/* Center Visualizer for Processing */}
                  {proj.status === 'processing' && viewMode !== 'compact' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
                      <div className="w-10 h-10 rounded-full bg-[#8083ff]/30 flex items-center justify-center mb-1 text-[#c0c1ff]">
                        <span className="material-symbols-outlined text-[22px] animate-spin">sync</span>
                      </div>
                      <span className="text-xs font-bold text-[#e2e2eb]">
                        Stage 4 of 6: Beat Transitions
                      </span>
                      <span className="font-mono text-[10px] text-[#bdc2ff] mt-0.5">
                        ~54s remaining · Audio locking
                      </span>
                    </div>
                  )}

                  {/* Audio Sync Overlay Indicator */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[#e2e2eb] z-10">
                    <div className="flex items-center gap-1.5 bg-[#191b22]/90 backdrop-blur-md px-2 py-1 rounded-lg border border-white/[0.08]">
                      <span className="material-symbols-outlined text-[13px] text-[#bdc2ff]">music_note</span>
                      <span className="font-mono text-[10px] truncate max-w-[140px]">{proj.trackName}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] bg-[#191b22]/90 backdrop-blur-md px-2 py-1 rounded-lg text-[#ffb2b7] border border-white/[0.08]">
                      <span className="material-symbols-outlined text-[13px]">bolt</span>
                      <span>{proj.cutsCount} cuts · {proj.bpm} BPM</span>
                    </div>
                  </div>
                </div>

                {/* Card Metadata & Title */}
                <div className="flex items-start justify-between gap-2 pt-0.5 relative">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-[#e2e2eb] truncate group-hover:text-[#c0c1ff] transition-colors">
                      {proj.title}
                    </h2>
                    <p className="text-xs text-[#c7c4d7] truncate mt-0.5">
                      {proj.category} · {proj.resolution} · {proj.editedAgo}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setActiveMenuProjectId(activeMenuProjectId === proj.id ? null : proj.id)
                    }
                    aria-label="Project actions"
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-[#282a30] hover:bg-[#33343b] text-[#c7c4d7] hover:text-[#e2e2eb] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>

                  {/* Context Menu Dropdown */}
                  {activeMenuProjectId === proj.id && (
                    <div className="absolute right-0 top-10 w-36 bg-[#282a30] border border-white/[0.1] rounded-xl shadow-2xl p-1 z-30 divide-y divide-white/[0.05]">
                      <button
                        onClick={() => {
                          onDuplicateProject(proj);
                          setActiveMenuProjectId(null);
                          showToast('Project duplicated');
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#e2e2eb] hover:bg-[#33343b] rounded-lg flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Duplicate</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenShare(proj);
                          setActiveMenuProjectId(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#e2e2eb] hover:bg-[#33343b] rounded-lg flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">ios_share</span>
                        <span>Export</span>
                      </button>
                      <button
                        onClick={() => {
                          onDeleteProject(proj.id);
                          setActiveMenuProjectId(null);
                          showToast('Project removed');
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#ffb4ab] hover:bg-[#33343b] rounded-lg flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 pt-0.5">
                  {proj.status === 'ready' && (
                    <>
                      <button
                        onClick={() => {
                          onSelectProject(proj);
                          onNavigate('preview');
                        }}
                        className="flex-1 min-h-[40px] rounded-xl bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        <span>Preview Cut</span>
                      </button>

                      <button
                        onClick={() => onOpenShare(proj)}
                        aria-label="Export video"
                        className="w-10 min-h-[40px] rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] flex items-center justify-center active:scale-95 transition-transform border border-white/[0.06]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#bdc2ff]">ios_share</span>
                      </button>
                    </>
                  )}

                  {proj.status === 'processing' && (
                    <>
                      <button
                        onClick={() => {
                          onSelectProject(proj);
                          onNavigate('processing');
                        }}
                        className="flex-1 min-h-[40px] rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform border border-white/[0.08]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">visibility</span>
                        <span>View Render Stage</span>
                      </button>

                      <button
                        onClick={() => {
                          onDeleteProject(proj.id);
                          showToast('Cancelled rendering job');
                        }}
                        className="px-3 min-h-[40px] rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#ffb4ab] font-mono text-xs flex items-center justify-center active:scale-95 transition-transform border border-white/[0.06]"
                        type="button"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {proj.status === 'draft' && (
                    <button
                      onClick={() => {
                        onSelectProject(proj);
                        onNavigate('create');
                      }}
                      className="flex-1 min-h-[40px] rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#c0c1ff] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform border border-white/[0.08]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                      <span>Resume Studio Edit</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Vault Storage Indicator Mini Card */}
      <div className="rounded-2xl bg-[#191b22] border border-white/[0.06] p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#282a30] flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[18px]">cloud</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#e2e2eb]">BeatVault Storage</span>
              <p className="text-[11px] text-[#c7c4d7]">3.4 GB of 10.0 GB utilized (34%)</p>
            </div>
          </div>
          <button
            onClick={onOpenVault}
            className="font-mono text-xs text-[#c0c1ff] hover:underline px-2 py-1"
            type="button"
          >
            Manage
          </button>
        </div>

        <div className="w-full bg-[#282a30] h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-[#c0c1ff] to-[#8083ff] h-full rounded-full" style={{ width: '34%' }}></div>
        </div>
      </div>

      {/* Floating "+ New BeatCut" Action Bar */}
      <div className="sticky bottom-20 z-40 w-full pt-1">
        <button
          onClick={() => onNavigate('create')}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#8083ff] via-[#494bd6] to-[#8083ff] hover:opacity-95 text-white shadow-[0_12px_28px_rgba(128,131,255,0.35)] flex items-center justify-center gap-2 font-bold text-sm tracking-tight active:scale-[0.98] transition-transform"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          <span>Create New BeatCut</span>
        </button>
      </div>
    </div>
  );
};
