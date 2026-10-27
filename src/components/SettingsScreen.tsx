import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenUpgrade: () => void;
  onOpenVault: () => void;
  editsLeft: number;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
  onOpenUpgrade,
  onOpenVault,
  editsLeft
}) => {
  const [sensitivity, setSensitivity] = useState<'subtle' | 'balanced' | 'aggressive'>('balanced');
  const [autoDelete, setAutoDelete] = useState(true);
  const [cloudNotifications, setCloudNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [selectedAspect, setSelectedAspect] = useState('9:16 Vertical Reel');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteAcknowledged, setDeleteAcknowledged] = useState(false);
  const [deleteButtonLabel, setDeleteButtonLabel] = useState('Schedule Deletion (14-Day Hold)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const isDeleteValid = deleteConfirmText.trim().toUpperCase() === 'DELETE' && deleteAcknowledged;

  const handleExecuteDelete = () => {
    if (!isDeleteValid) return;
    setDeleteButtonLabel('Erasing Data...');
    setTimeout(() => {
      setDeleteButtonLabel('Account Erased');
      setTimeout(() => {
        setIsDeletingAccount(false);
        setDeleteButtonLabel('Schedule Deletion (14-Day Hold)');
        showToast('Account erasure request submitted. Scheduled for 14-day hold.');
      }, 800);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-28 px-4 gap-4 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#33343b] border border-white/[0.1] text-[#e2e2eb] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">check_circle</span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Profile & Plan Card */}
      <section className="flex flex-col gap-4 bg-[#1e1f26] border border-white/[0.08] rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="relative flex-shrink-0">
            <img
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#8083ff]/40"
              alt="Alex Rivera"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbehvmZnDHWVKqYxpFMKFhExuBb8ckP1ypX922AEZPGsCmmUdEKIjZheuWqAYqZK3ZzIsy4DK5V_C9TGX8YElxsR8dgw5RkwV5k3-2cL2RXe8ER8B5-FIKAHnJEOIX_NtTRJFpb36RRL6kgxh8acrlsrtnqZ0V2bGYxRg7EM0ir2n2SRGNB2Mr3V5CyHW9nUYKUs8ErgF-6X12IcT83Zzt-35QuG9CuR7tCjqCkmbWtr7yY6KFQRe7lg"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#1e1f26] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b50036]"></span>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-[#e2e2eb] truncate">Alex Rivera</h2>
              <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">verified</span>
            </div>
            <p className="font-mono text-xs text-[#c7c4d7] truncate">alex.rivera@creativepulse.io</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#282a30] text-[#c0c1ff] font-bold border border-white/[0.05]">
                Free Tier
              </span>
              <span className="font-mono text-[11px] text-[#c7c4d7]">
                {5 - editsLeft}/5 edits used
              </span>
            </div>
          </div>

          <button
            onClick={() => showToast('Profile editor opened')}
            aria-label="Edit Profile Details"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#c7c4d7] hover:text-[#e2e2eb] rounded-full bg-[#282a30] hover:bg-[#33343b] transition-transform active:scale-95 border border-white/[0.06]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>

        {/* Upgrade Banner */}
        <div className="relative overflow-hidden rounded-xl bg-[#282a30] border border-white/[0.08] p-4 shadow-md">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#e2e2eb]">BeatCut Creator Pro</h3>
                <span className="font-mono text-[9px] text-[#ffb2b7] uppercase tracking-wider font-bold">
                  Unrestricted Studio Access
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-[#c0c1ff] font-bold">
              $12.99<span className="text-[10px] font-normal text-[#c7c4d7]">/mo</span>
            </span>
          </div>

          <ul className="flex flex-col gap-1.5 my-2.5 text-xs text-[#c7c4d7]">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[16px]">check_circle</span>
              <span>Ultra HD 4K 60fps cinematic renders</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[16px]">check_circle</span>
              <span>Unlimited neural beat-sync cuts & zero watermarks</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[16px]">check_circle</span>
              <span>50 GB Cloud Media Vault & offline cache</span>
            </li>
          </ul>

          <button
            onClick={onOpenUpgrade}
            className="w-full min-h-[44px] mt-1 rounded-xl bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
            type="button"
          >
            <span>Upgrade to Creator Pro</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Cloud Media Vault & Storage Quota */}
      <section className="flex flex-col gap-2.5 bg-[#1e1f26] border border-white/[0.08] rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">cloud_sync</span>
            <h3 className="text-sm font-bold text-[#e2e2eb]">Cloud Media Vault</h3>
          </div>
          <span className="font-mono text-xs text-[#c7c4d7]">3.4 GB / 10 GB (34%)</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-[#0c0e14] overflow-hidden flex border border-white/[0.05]">
          <div className="bg-[#c0c1ff] h-full" style={{ width: '28%' }}></div>
          <div className="bg-[#ffb2b7] h-full" style={{ width: '6%' }}></div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#191b22] border border-white/[0.04]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c0c1ff] flex-shrink-0"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#e2e2eb] truncate font-medium">18 Source Clips</span>
              <span className="font-mono text-[10px] text-[#c7c4d7]">2.8 GB</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#191b22] border border-white/[0.04]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb2b7] flex-shrink-0"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#e2e2eb] truncate font-medium">4 Exported Cuts</span>
              <span className="font-mono text-[10px] text-[#c7c4d7]">600 MB</span>
            </div>
          </div>
        </div>

        {/* Vault Options */}
        <div className="flex flex-col gap-1 mt-1 divide-y divide-white/[0.05]">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#e2e2eb]">Auto-delete source clips</span>
              <span className="text-[11px] text-[#c7c4d7]">Removes raw footage after 30 days</span>
            </div>
            <button
              onClick={() => setAutoDelete(!autoDelete)}
              className={`w-11 h-6 rounded-full relative flex items-center px-1 transition-colors ${
                autoDelete ? 'bg-[#8083ff]' : 'bg-[#33343b]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  autoDelete ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#e2e2eb]">Clear Cached Renders</span>
              <span className="text-[11px] text-[#c7c4d7]">Free up 420 MB local temporary preview cache</span>
            </div>
            <button
              onClick={() => showToast('Freed 420 MB temporary cache!')}
              className="px-3 py-1.5 rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] font-mono text-xs flex items-center gap-1 active:scale-95 transition-transform border border-white/[0.08]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">cleaning_services</span>
              <span>Clear</span>
            </button>
          </div>
        </div>
      </section>

      {/* AI Beat-Sync & Processing Preferences */}
      <section className="flex flex-col gap-3 bg-[#1e1f26] border border-white/[0.08] rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">tune</span>
          <h3 className="text-sm font-bold text-[#e2e2eb]">AI Beat-Sync & Processing</h3>
        </div>

        {/* Sync Sensitivity Segmented Control */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c7c4d7] font-mono">Default Beat Transient Sensitivity</label>
          <div className="grid grid-cols-3 gap-1 bg-[#0c0e14] p-1 rounded-xl border border-white/[0.05]">
            {(['subtle', 'balanced', 'aggressive'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSensitivity(mode)}
                className={`min-h-[36px] rounded-lg font-mono text-xs capitalize flex items-center justify-center transition-all ${
                  sensitivity === mode
                    ? 'bg-[#282a30] text-[#c0c1ff] font-bold border border-white/[0.08] shadow-sm'
                    : 'text-[#c7c4d7] hover:text-white'
                }`}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Export Format */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c7c4d7] font-mono">Preferred Master Canvas Aspect</label>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#191b22] border border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">crop_portrait</span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#e2e2eb]">{selectedAspect}</span>
                <span className="font-mono text-[10px] text-[#c7c4d7]">Optimized for TikTok & Shorts</span>
              </div>
            </div>
            <select
              value={selectedAspect}
              onChange={(e) => setSelectedAspect(e.target.value)}
              className="bg-[#282a30] text-xs font-mono text-[#c0c1ff] px-2 py-1 rounded-lg border border-white/[0.08] outline-none"
            >
              <option value="9:16 Vertical Reel">9:16 Vertical</option>
              <option value="16:9 Landscape">16:9 Landscape</option>
              <option value="1:1 Square">1:1 Square</option>
            </select>
          </div>
        </div>

        {/* Processing Toggles */}
        <div className="flex flex-col divide-y divide-white/[0.05]">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#e2e2eb]">Cloud Processing Notifications</span>
              <span className="text-[11px] text-[#c7c4d7]">Push alerts upon 4K render completion</span>
            </div>
            <button
              onClick={() => setCloudNotifications(!cloudNotifications)}
              className={`w-11 h-6 rounded-full relative flex items-center px-1 transition-colors ${
                cloudNotifications ? 'bg-[#8083ff]' : 'bg-[#33343b]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  cloudNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#e2e2eb]">Haptic Beat Preview</span>
              <span className="text-[11px] text-[#c7c4d7]">Vibrate device on cut point transients</span>
            </div>
            <button
              onClick={() => setHapticFeedback(!hapticFeedback)}
              className={`w-11 h-6 rounded-full relative flex items-center px-1 transition-colors ${
                hapticFeedback ? 'bg-[#8083ff]' : 'bg-[#33343b]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  hapticFeedback ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </section>

      {/* Privacy & Data Ownership */}
      <section className="flex flex-col gap-3 bg-[#1e1f26] border border-white/[0.08] rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">shield</span>
          <h3 className="text-sm font-bold text-[#e2e2eb]">Privacy & Data Ownership</h3>
        </div>

        <div className="p-3 rounded-xl bg-[#191b22] border border-white/[0.04] flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[18px] flex-shrink-0 mt-0.5">lock</span>
          <p className="text-xs text-[#c7c4d7] leading-relaxed">
            Your raw footage and audio are processed inside encrypted, volatile memory buffers.{' '}
            <span className="text-[#e2e2eb] font-medium">We never train public AI models on your personal media.</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => showToast('Compiling 3.4 GB ZIP archive...')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] text-xs flex items-center justify-between active:scale-[0.99] transition-transform border border-white/[0.06]"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">download_for_offline</span>
              <span>Download All Render Archives (ZIP)</span>
            </div>
            <span className="font-mono text-[10px] text-[#c7c4d7]">3.4 GB</span>
          </button>

          <button
            onClick={() => showToast('Media buffer purged. 0.4 GB cleared!')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] text-xs flex items-center justify-between active:scale-[0.99] transition-transform border border-white/[0.06]"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c7c4d7] text-[18px]">restart_alt</span>
              <span>Purge Temporary Media Buffer</span>
            </div>
            <span className="material-symbols-outlined text-[#c7c4d7] text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => showToast('Source media wiped!')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#b50036]/20 border border-[#b50036]/40 text-[#ffb2b7] text-xs flex items-center justify-between active:scale-[0.99] transition-transform"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              <span>Delete All Cloud Source Media</span>
            </div>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#b50036]/40 text-[#ffc2c4] font-bold">
              Permanent
            </span>
          </button>
        </div>

        {/* Danger Zone / Account Deletion */}
        <div className="p-3.5 rounded-xl bg-[#0c0e14] border border-[#93000a]/40 flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">warning</span>
            <span className="text-xs font-bold text-[#ffb4ab]">Account Termination</span>
          </div>
          <p className="text-[11px] text-[#c7c4d7] leading-relaxed">
            Requesting account erasure permanently removes your profile, cloud renders, cut logs, and unlinks all synchronized royalty-free licenses immediately.
          </p>

          <div className="p-2.5 rounded-lg bg-[#8083ff]/15 border border-[#8083ff]/30 flex flex-col gap-1 my-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[16px]">history_toggle_off</span>
                <span className="text-xs text-[#e2e2eb] font-semibold">14-Day Recovery Grace Period</span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#c0c1ff]/20 text-[#c0c1ff] font-bold uppercase">
                Active
              </span>
            </div>
            <p className="text-[10px] text-[#c7c4d7] leading-relaxed">
              When you schedule deletion, your cloud renders enter a 14-day retention lock. You can cancel anytime by logging back in.
            </p>
          </div>

          <button
            onClick={() => setIsDeletingAccount(true)}
            className="w-full py-2.5 rounded-xl bg-[#93000a] hover:bg-[#b50036] text-[#ffdad6] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform shadow-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">person_remove</span>
            <span>Request Account & Data Deletion</span>
          </button>
        </div>
      </section>

      {/* Connected Platforms & Sync Licensing */}
      <section className="flex flex-col gap-3 bg-[#1e1f26] border border-white/[0.08] rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">hub</span>
            <h3 className="text-sm font-bold text-[#e2e2eb]">Connected Publishing Accounts</h3>
          </div>
          <span className="font-mono text-[10px] text-[#ffb2b7] bg-[#b50036]/30 px-2 py-0.5 rounded-full border border-[#ffb2b7]/30 font-bold">
            3 Linked
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { platform: 'TikTok', handle: '@alex_rivera_cuts', icon: 'music_video' },
            { platform: 'Instagram Reels', handle: '@rivera.creates', icon: 'photo_camera' },
            { platform: 'YouTube Shorts', handle: 'Alex Rivera Post', icon: 'smart_display' }
          ].map((item) => (
            <div
              key={item.platform}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#191b22] border border-white/[0.04]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#282a30] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#e2e2eb] text-[18px]">{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#e2e2eb]">{item.platform}</span>
                  <span className="font-mono text-[10px] text-[#c7c4d7]">{item.handle}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#c0c1ff] bg-[#8083ff]/20 px-2 py-0.5 rounded-full border border-[#8083ff]/30 font-bold">
                Linked
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#282a30] border border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">library_music</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#e2e2eb]">Sync Music Licensing</span>
              <span className="font-mono text-[10px] text-[#c7c4d7]">Royalty-Free Standard Sync Active</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">check_circle</span>
        </div>
      </section>

      {/* App Info & Sign Out */}
      <section className="flex flex-col items-center gap-3 py-1">
        <button
          onClick={() => onNavigate('signin')}
          className="w-full min-h-[44px] rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#ffb4ab] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform border border-white/[0.06]"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <span className="font-mono text-[11px] text-[#908fa0]">
            BeatCut Mobile Studio Engine v2.4.0 (Build 884)
          </span>
          <div className="flex items-center gap-2 text-[#c7c4d7] font-mono text-[10px]">
            <a className="hover:text-[#c0c1ff] transition-colors" href="#">Terms of Service</a>
            <span>•</span>
            <a className="hover:text-[#c0c1ff] transition-colors" href="#">Security Audit</a>
            <span>•</span>
            <a className="hover:text-[#c0c1ff] transition-colors" href="#">Support Vault</a>
          </div>
        </div>
      </section>

      {/* Delete Account Confirmation Modal */}
      {isDeletingAccount && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div
            onClick={() => setIsDeletingAccount(false)}
            className="absolute inset-0 bg-[#0c0e14]/80 backdrop-blur-md"
          ></div>

          <div className="relative w-full max-w-lg bg-[#1e1f26] rounded-2xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh] animate-in fade-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#191b22] border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#b50036]/30 text-[#ffb2b7] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">warning</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#e2e2eb]">Delete BeatCut Account?</h3>
                  <span className="font-mono text-[10px] text-[#ffb2b7]">Permanent & Irreversible Action</span>
                </div>
              </div>
              <button
                onClick={() => setIsDeletingAccount(false)}
                className="w-8 h-8 flex items-center justify-center text-[#c7c4d7] hover:text-[#e2e2eb] rounded-full"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 flex flex-col gap-3.5 overflow-y-auto">
              <div className="p-3 rounded-xl bg-[#b50036]/15 border border-[#b50036]/30 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-[#e2e2eb] font-semibold truncate">
                    Termination for <span className="text-[#ffb2b7] font-bold">alex.rivera@creativepulse.io</span>
                  </p>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#8083ff]/30 text-[#c0c1ff] font-bold flex items-center gap-1 flex-shrink-0">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    14-Day Recovery
                  </span>
                </div>
                <p className="text-[11px] text-[#c7c4d7] leading-relaxed">
                  Your account will be deactivated immediately, but your cloud assets will be held in encrypted cold storage for 14 days. If you log in before 14 days have passed, all data can be fully restored.
                </p>
              </div>

              <ul className="flex flex-col gap-2 text-xs text-[#c7c4d7] bg-[#0c0e14] p-3 rounded-xl border border-white/[0.04]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ffb2b7] text-[16px] mt-0.5 flex-shrink-0">delete_forever</span>
                  <span>Erasure of all <strong>18 source clips (2.8 GB)</strong> and <strong>4 rendered cuts (600 MB)</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ffb2b7] text-[16px] mt-0.5 flex-shrink-0">music_off</span>
                  <span>Revocation of royalty-free sync licenses and custom beat maps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ffb2b7] text-[16px] mt-0.5 flex-shrink-0">account_box</span>
                  <span>Irreversible deletion of Alex Rivera's editor profile and cut timeline histories.</span>
                </li>
              </ul>

              {/* Confirmation Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-[#e2e2eb]">
                  Type <span className="text-[#ffb2b7] font-bold">DELETE</span> to confirm:
                </label>
                <input
                  type="text"
                  placeholder="DELETE"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#282a30] border border-white/[0.1] text-[#e2e2eb] font-mono text-sm placeholder:text-[#908fa0] focus:outline-none focus:border-[#ffb2b7]"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={deleteAcknowledged}
                  onChange={(e) => setDeleteAcknowledged(e.target.checked)}
                  className="mt-0.5 rounded border-white/[0.2] bg-[#282a30] text-[#ffb2b7] w-4 h-4 accent-[#ffb2b7]"
                />
                <span className="text-[11px] text-[#c7c4d7] leading-snug">
                  I understand that my account will enter a 14-day recovery hold before permanent purge, and can only be restored by logging back in during this window.
                </span>
              </label>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#191b22] border-t border-white/[0.06] flex flex-col-reverse sm:flex-row gap-2 items-center justify-end">
              <button
                onClick={() => setIsDeletingAccount(false)}
                type="button"
                className="w-full sm:w-auto h-11 px-4 rounded-xl bg-[#282a30] hover:bg-[#33343b] text-[#e2e2eb] text-xs font-semibold"
              >
                Keep Account
              </button>
              <button
                onClick={handleExecuteDelete}
                disabled={!isDeleteValid}
                type="button"
                className={`w-full sm:w-auto h-11 px-4 rounded-xl bg-[#93000a] text-[#ffdad6] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isDeleteValid ? 'opacity-100 hover:bg-[#b50036] cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                <span>{deleteButtonLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
