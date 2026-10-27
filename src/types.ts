export type ScreenType = 'home' | 'create' | 'processing' | 'preview' | 'projects' | 'settings' | 'signin' | 'signup' | 'forgot';

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'ready' | 'processing' | 'draft';
  aspectRatio: '9:16' | '16:9' | '1:1';
  duration: string;
  cutsCount: number;
  trackName: string;
  bpm: number;
  genre: string;
  coverImage: string;
  editedAgo: string;
  processingProgress?: number;
  processingStep?: string;
  clipsCount: number;
  resolution: string;
  lut: string;
  version: number;
}

export interface AudioTrack {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  duration: string;
  hotCuts: number;
  waveformUrl?: string;
}

export interface InspirationStyle {
  id: string;
  name: string;
  duration: string;
  bpm: number;
  genre: string;
  image: string;
  tagColor?: string;
}

export interface PipelineStage {
  id: number;
  title: string;
  status: 'completed' | 'active' | 'queued' | 'pending';
  time?: string;
  details: string;
  badge?: string;
}

export interface MediaClip {
  id: string;
  filename: string;
  thumbnail: string;
  duration: string;
  resolution: string;
  fps: number;
  keyframes: string;
}
