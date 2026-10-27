---
name: BeatCut Studio
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#373940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#191b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a30'
  surface-container-highest: '#33343b'
  on-surface: '#e2e2eb'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e2e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ffb2b7'
  on-secondary: '#67001b'
  secondary-container: '#b50036'
  on-secondary-container: '#ffc2c4'
  tertiary: '#bdc2ff'
  on-tertiary: '#131e8c'
  tertiary-container: '#7c87f3'
  on-tertiary-container: '#081486'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#e0e0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000767'
  on-tertiary-fixed-variant: '#2f3aa3'
  background: '#111319'
  on-background: '#e2e2eb'
  surface-variant: '#33343b'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  badge-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system defines a high-precision, creative powerhouse environment tailored for video editors, social creators, and AI-augmented post-production artists. The emotional response is one of surgical control, kinetic energy, and cinematic depth—translating the tactility of professional desktop NLE (Non-Linear Editing) software into a rapid, touch-first modern web and mobile interface.

The visual direction merges **Cinematic Dark Minimalism** with **Hyper-Refined Glassmorphism**:
- Obsidian, deep-ink foundation surfaces prevent optical fatigue during intense editing sessions.
- Laser-focused luminous accents (electric violet and kinetic rose) demarcate beats, transients, playheads, and AI automation states.
- High structural precision: crisp sub-pixel translucent borders, razor-sharp audio waveform visualizers, and tactile touch targets engineered for precise timeline scrubbing.

## Colors

The palette leverages a calculated high-contrast hierarchy built for media-heavy workflows:

- **Surface Tiers**:
  - `Canvas Base` (`#0B0D13`): Deep ink; anchors the viewport and timeline backing.
  - `Surface Low` (`#131722`): Panel backgrounds, side rails, inspector containers.
  - `Surface High` (`#1C2234`): Floating cards, active tools, inspector modules, modal dialogue frames.
  - `Surface Crisp / Contrast Overlay` (`#F9FAFC`): Inverted bright surfaces used sparingly for high-attention content cards, preview tooltips, and primary text foreground.
- **Accents & Telemetry**:
  - `Electric Violet Primary` (`#6366F1` / `#4F46E5`): Engine status, primary CTA, active clip selection, timeline playhead.
  - `Kinetic Rose Highlight` (`#F43F5E` / `#FB7185`): Audio transient beat drops, AI cut markers, recording indicators, destructive actions.
  - `Indigo Glow Tertiary` (`#818CF8`): Hover halos, timeline waveform peaks, subtle inner borders.
- **Functional Grayscale**:
  - Text Primary: `#F9FAFC` (100% opacity)
  - Text Secondary: `#94A3B8` (70% opacity)
  - Ghost Borders: `rgba(255, 255, 255, 0.08)` to `rgba(99, 102, 241, 0.24)`

## Typography

The type system is split into two specialized roles:
1. **Geometric Humanist Sans (`Plus Jakarta Sans`)**: Powers all marketing displays, UI navigation, and user-facing controls. The rounded geometric terminals introduce welcoming clarity and contemporary polish without losing structural discipline.
2. **Technical Monospace (`JetBrains Mono`)**: Powers SMPTE timecodes (`00:01:24:12`), BPM indicators, audio decibel readouts, AI inference latency, and keyframe coordinate labels. It guarantees zero horizontal jitter during continuous real-time scrubbing and playback.

## Layout & Spacing

The layout philosophy uses a **docked studio grid** adapted for dense tooling and responsive touch gestures:

- **Desktop (1024px+)**: 
  - Standard 12-column layout for dashboard views, transitioning to a three-pane studio workstation: persistent source/asset library (left, 280px–360px), multi-aspect preview viewport (center-top), inspector/AI orchestrator (right, 320px), and horizontal non-linear timeline (full bottom span, fixed height 240px–340px).
- **Tablet (768px - 1023px)**:
  - Collapsible panels with floating drawer inspectors. Timeline is pinned bottom with scrollable tracks.
- **Mobile (< 768px)**:
  - Single-column canvas with a 48px fixed safe-area bottom navigation bar.
  - Video preview occupies the top half (`50vh`); the lower half switches contextually between a micro-scrubber timeline, quick-action chips, and step-by-step wizard bottom sheets.
- **Rhythm**:
  - Tight `0.5rem` (`space-sm`) and `0.75rem` (`space-md`) spacing internal to controls keeps tools dense and reachable, while generous `1.5rem` (`space-xl`) margins separate core functional panes.

## Elevation & Depth

Visual hierarchy uses **tonal layer stacking** combined with **subtle glassmorphism** and razor-thin luminous borders:

- **Tier 0 (Base Canvas)**: Background `#0B0D13`. Flat, non-reflective.
- **Tier 1 (Panels & Toolbars)**: `#131722` with a 1px solid border (`rgba(255, 255, 255, 0.05)`).
- **Tier 2 (Interactive Cards & Timeline Tracks)**: Background `#1C2234` with `backdrop-filter: blur(16px)` and top-edge specular highlight (`1px solid rgba(255, 255, 255, 0.12)`).
- **Tier 3 (Floating Controls, Modals & Scrubber Playheads)**: `#1C2234` elevated by ambient, indigo-tinted drop shadows:
  - Ambient Shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 16px 0 rgba(99, 102, 241, 0.15)`.
- **Beat & Automation Pulses**: Keyframe points and beat markers emit an instantaneous radial glow: `box-shadow: 0 0 12px #F43F5E`.

## Shapes

The roundedness token level is set to `2` (16px / `1rem` on container cards and modals), bringing modern softness to high-tech video software:

- **Container Cards & Wizard Sheets**: Built with `rounded-lg` (16px / `1rem`) to keep large UI surfaces soft and approachable.
- **Control Items (Buttons, Inputs, Selectors)**: Built with standard radius (8px / `0.5rem`) for compact efficiency and ergonomic finger targeting.
- **Timeline Clips & Beat Markers**: Built with 4px (`0.25rem`) inner radiuses to preserve horizontal density and precision when cutting micro-segments.
- **Badges & Playhead Pins**: Fully pill-shaped (`9999px`) to emphasize distinct status and tactile draggable handles.

## Components

### Buttons
- **Primary Action (Render, Export, Generate)**: Background `#6366F1` transitioning to `#4F46E5` on hover. High-contrast white typography. Minimum touch target of 44px on mobile.
- **Secondary Action (Split, Duplicate, Tools)**: Background `rgba(255, 255, 255, 0.06)`, border `1px solid rgba(255, 255, 255, 0.1)`, hover background `rgba(255, 255, 255, 0.1)`.
- **Destructive / Hot Cut**: Background `rgba(244, 63, 94, 0.12)`, text `#FB7185`, border `1px solid rgba(244, 63, 94, 0.3)`.

### Chips & Filters
- Compact height (28px mobile, 32px desktop), pill-shaped.
- Inactive: Background `#131722`, border `rgba(255, 255, 255, 0.08)`, text `#94A3B8`.
- Active: Background `rgba(99, 102, 241, 0.2)`, border `1px solid #6366F1`, text `#F9FAFC`, with a subtle neon glow.

### Cards (Rich Media & Preset Cards)
- Outer container: 16px radius, background `#1C2234`, 1px border `rgba(255, 255, 255, 0.08)`.
- Aspect ratio preview window (16:9 or 9:16) at top with embedded duration badge (`JetBrains Mono`, pill shape, dark semi-transparent fill).
- Card footer displays metadata title, resolution tags, and an instant action trigger.

### Beat Waveform & Cut Markers
- **Audio Waveform**: Rendered in SVG/Canvas with base track `#272F45`. Peaks illuminated by `#818CF8`.
- **Beat Points**: Vertical tick markers colored `#F43F5E` placed at transient peaks. Draggable beat snappers expand to 6px pill handles on touch press.

### Wizard Steppers & Bottom Sheets (Mobile Studio)
- Sticky bottom sheet anchored with a 4px wide drag handle.
- Stepper pills: Sequential horizontal segments with progressive filling (`#6366F1`) and animated completion ticks.

### Input Fields & Scrubbable Sliders
- Inputs: `#131722` interior, border `rgba(255, 255, 255, 0.1)`, active focus ring `2px solid #6366F1`.
- Timeline Sliders: Track height 4px, filled with electric violet; scrubber thumb is an elevated 16px circle with a `#F9FAFC` core and drop shadow.