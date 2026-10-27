import React, { useState } from 'react';
import { ScreenType, Project, InspirationStyle } from './types';
import { INITIAL_PROJECTS, INSPIRATION_STYLES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { CreateWizardScreen } from './components/CreateWizardScreen';
import { ExportPreviewScreen } from './components/ExportPreviewScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { UpgradeModal } from './components/UpgradeModal';
import { VaultModal } from './components/VaultModal';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [editsLeft, setEditsLeft] = useState<number>(3);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState<boolean>(false);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [shareProject, setShareProject] = useState<Project | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      status: 'draft',
      editedAgo: 'Just now'
    };
    setProjects([duplicated, ...projects]);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleApplyStyle = (style: InspirationStyle) => {
    const customProject: Project = {
      id: `proj-${Date.now()}`,
      title: `${style.name} Cut`,
      category: style.genre,
      status: 'draft',
      aspectRatio: '9:16',
      duration: style.duration,
      cutsCount: 22,
      trackName: style.name,
      bpm: style.bpm,
      genre: style.genre,
      coverImage: style.image,
      editedAgo: 'Just now',
      clipsCount: 6,
      resolution: '1080p · 60fps',
      lut: 'Teal & Pink LUT',
      version: 1
    };
    setActiveProject(customProject);
    setCurrentScreen('create');
  };

  const handleStartRender = (newConfig: Partial<Project>) => {
    if (editsLeft > 0) {
      setEditsLeft(editsLeft - 1);
    }
    const targetProject: Project = {
      ...activeProject,
      ...newConfig,
      id: activeProject.id || `proj-${Date.now()}`,
      status: 'processing',
      processingProgress: 64,
      processingStep: 'Step 4 of 6 · Rendering edit 64%'
    };

    setProjects((prev) => {
      const exists = prev.some((p) => p.id === targetProject.id);
      if (exists) {
        return prev.map((p) => (p.id === targetProject.id ? targetProject : p));
      }
      return [targetProject, ...prev];
    });

    setActiveProject(targetProject);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    const completedProject: Project = {
      ...activeProject,
      status: 'ready',
      processingProgress: 100
    };

    setProjects((prev) =>
      prev.map((p) => (p.id === completedProject.id ? completedProject : p))
    );
    setActiveProject(completedProject);
    setCurrentScreen('preview');
  };

  const isAuthScreen = ['signin', 'signup', 'forgot'].includes(currentScreen);

  return (
    <div className="bg-[#111319] text-[#e2e2eb] min-h-screen flex flex-col font-sans selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Dynamic Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        editsLeft={editsLeft}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'home' && (
          <HomeScreen
            projects={projects}
            inspirations={INSPIRATION_STYLES}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onOpenVault={() => setIsVaultOpen(true)}
            onOpenShare={(p) => setShareProject(p)}
            onDuplicateProject={handleDuplicateProject}
            onApplyStyle={handleApplyStyle}
            editsLeft={editsLeft}
          />
        )}

        {currentScreen === 'processing' && (
          <ProcessingScreen
            project={activeProject}
            onNavigate={handleNavigate}
            onComplete={handleProcessingComplete}
          />
        )}

        {currentScreen === 'create' && (
          <CreateWizardScreen
            onNavigate={handleNavigate}
            onStartRender={handleStartRender}
          />
        )}

        {currentScreen === 'preview' && (
          <ExportPreviewScreen
            project={activeProject}
            onNavigate={handleNavigate}
            onOpenShare={(p) => setShareProject(p)}
          />
        )}

        {currentScreen === 'projects' && (
          <ProjectsScreen
            projects={projects}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
            onOpenShare={(p) => setShareProject(p)}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onOpenVault={() => setIsVaultOpen(true)}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            onNavigate={handleNavigate}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onOpenVault={() => setIsVaultOpen(true)}
            editsLeft={editsLeft}
          />
        )}

        {currentScreen === 'signin' && (
          <SignInScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'signup' && (
          <SignUpScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'forgot' && (
          <ForgotPasswordScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Bottom Navigation on main tabs */}
      {!isAuthScreen && (
        <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Modals */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        editsLeft={editsLeft}
        onAddEdits={(count) => setEditsLeft((prev) => prev + count)}
      />

      <VaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        usedGB={3.4}
        totalGB={10}
      />

      <ShareModal
        isOpen={shareProject !== null}
        onClose={() => setShareProject(null)}
        title={shareProject?.title || 'Japan Summer Memories'}
      />
    </div>
  );
}
