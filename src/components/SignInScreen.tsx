import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SignInScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('alex@creator.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isEmailValid = email.includes('@') && email.includes('.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-20 px-4 gap-4 select-none animate-in fade-in duration-200">
      {/* Dynamic Ambient Glow Header */}
      <div className="relative w-full pt-2 pb-4 flex flex-col items-center text-center">
        <div className="absolute -top-6 w-56 h-36 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute -top-2 -right-8 w-36 h-28 bg-[#ffb2b7]/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#282a30] border border-white/[0.08] shadow-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7] shadow-[0_0_8px_#ffb2b7] animate-pulse"></span>
          <span className="font-mono text-xs text-[#c0c1ff] uppercase tracking-wider font-semibold">
            Cloud Engine v2.4 Active
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#e2e2eb] tracking-tight mb-1">
          Sign in to your creative studio
        </h1>
        <p className="text-xs text-[#c7c4d7] max-w-xs leading-relaxed">
          Access your AI-synced timelines, acoustic cut points, and secure render vault.
        </p>
      </div>

      {/* Studio Snapshot Micro-Hero */}
      <div className="w-full p-3.5 rounded-2xl bg-[#191b22] border border-white/[0.06] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl bg-[#1e1f26] overflow-hidden shrink-0">
            <img
              className="w-full h-full object-cover"
              alt="Tokyo Neon Cut preview"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR8Ej-i4yAsVrjBL2tjtfRGmumY-sJFvd3Lu81L7iJ0zup_4iVghcMkvRAIUSW93jdV0Tko6AX0A6Pl6Fe7stji0HX1B0csCPuIq-2b6SvJfcD4-KyKnbJekCBaUACZgbS7e4bjvw5MEotzirzEjSx_XSQCKX9SzJr0d34Ld_Wgfd8ElUmvJuYq8S_f6FFwIqadPKeSo5itNwMDmVLxaseb6tvetnm_lOaGSyC6cV7sk2GJXrHzyYmeA"
            />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#ffb2b7] shadow-[0_0_6px_#ffb2b7]"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#e2e2eb] truncate">Tokyo_Neon_Cut_4K</span>
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#8083ff] text-[#0d0096] uppercase font-bold">
                Auto-Saved
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#908fa0] truncate">
              Render pending: 12 beat markers ready
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#c0c1ff] text-[20px] shrink-0 ml-2">
          cloud_done
        </span>
      </div>

      {/* Main Authentication Form Card */}
      <div className="w-full bg-[#1e1f26] border border-white/[0.08] p-5 rounded-2xl shadow-xl flex flex-col gap-4">
        {/* Email Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#e2e2eb] flex items-center justify-between" htmlFor="signin-email">
            <span>Creator Email</span>
            {email.length > 0 && (
              <span className={`font-mono text-[10px] ${isEmailValid ? 'text-[#ffb2b7] font-semibold' : 'text-[#908fa0]'}`}>
                {isEmailValid ? 'Account found' : 'Validating...'}
              </span>
            )}
          </label>
          <div className="relative flex items-center rounded-xl bg-[#0c0e14] border border-white/[0.08] focus-within:border-[#8083ff] transition-colors">
            <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
              mail
            </span>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@creator.io"
              className="w-full bg-transparent pl-10 pr-9 py-3 text-xs text-[#e2e2eb] placeholder-[#908fa0] focus:outline-none"
            />
            {email.length > 0 && (
              <button
                type="button"
                onClick={() => setEmail('')}
                className="absolute right-2.5 p-1 text-[#908fa0] hover:text-[#e2e2eb]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Password Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#e2e2eb]" htmlFor="signin-password">
            Master Password
          </label>
          <div className="relative flex items-center rounded-xl bg-[#0c0e14] border border-white/[0.08] focus-within:border-[#8083ff] transition-colors">
            <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent pl-10 pr-10 py-3 text-xs text-[#e2e2eb] placeholder-[#908fa0] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1 text-[#908fa0] hover:text-[#e2e2eb]"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                rememberMe ? 'bg-[#8083ff]' : 'bg-[#282a30]'
              }`}
            >
              {rememberMe && (
                <span className="material-symbols-outlined text-[14px] text-[#0d0096] font-bold">
                  check
                </span>
              )}
            </div>
            <span className="text-xs text-[#e2e2eb]">Remember this device</span>
          </label>

          <button
            type="button"
            onClick={() => onNavigate('forgot')}
            className="text-xs text-[#c0c1ff] hover:underline transition-all"
          >
            Forgot password?
          </button>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-1 w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#e1e0ff] active:scale-[0.99] text-[#1000a9] font-bold text-xs flex items-center justify-center gap-2 transition-transform shadow-lg shadow-[#8083ff]/20"
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Syncing Session...</span>
            </>
          ) : submitSuccess ? (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Studio Ready!</span>
            </>
          ) : (
            <>
              <span>Sign In to BeatCut</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full h-px bg-[#282a30]"></div>
          <span className="absolute px-2 bg-[#1e1f26] font-mono text-[10px] text-[#908fa0] uppercase tracking-wider">
            or continue with
          </span>
        </div>

        {/* Social Authentication */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <button
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => onNavigate('home'), 800);
            }}
            className="min-h-[42px] py-2 px-2 rounded-xl bg-[#0c0e14] hover:bg-[#282a30] text-[#e2e2eb] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#e2e2eb]">phone_iphone</span>
            <span className="font-mono text-[10px] text-[#c7c4d7]">Apple</span>
          </button>

          <button
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => onNavigate('home'), 800);
            }}
            className="min-h-[42px] py-2 px-2 rounded-xl bg-[#0c0e14] hover:bg-[#282a30] text-[#e2e2eb] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">g_mobiledata</span>
            <span className="font-mono text-[10px] text-[#c7c4d7]">Google</span>
          </button>

          <button
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => onNavigate('home'), 800);
            }}
            className="min-h-[42px] py-2 px-2 rounded-xl bg-[#0c0e14] hover:bg-[#282a30] text-[#e2e2eb] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffb2b7]">smart_display</span>
            <span className="font-mono text-[10px] text-[#c7c4d7]">Creator ID</span>
          </button>
        </div>
      </div>

      {/* Trust & Encryption Seal */}
      <div className="mt-2 p-3 rounded-xl bg-[#191b22] border border-white/[0.05] flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#282a30] flex items-center justify-center shrink-0 text-[#ffb2b7]">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#e2e2eb] mb-0.5">Zero-Knowledge Transient Vault</span>
          <p className="text-[11px] text-[#c7c4d7] leading-relaxed">
            Your uncompressed raw clips and synced tracks are end-to-end encrypted during timeline processing.
          </p>
        </div>
      </div>

      {/* Sign Up Prompt Footer */}
      <div className="w-full mt-2 flex flex-col items-center text-center gap-1">
        <p className="text-xs text-[#c7c4d7]">Don't have an account yet?</p>
        <button
          onClick={() => onNavigate('signup')}
          className="inline-flex items-center gap-1 font-bold text-xs text-[#c0c1ff] hover:text-white transition-colors"
          type="button"
        >
          <span>Sign up free for 500 AI credits</span>
          <span className="material-symbols-outlined text-[16px] text-[#ffb2b7]">bolt</span>
        </button>
      </div>

      {/* Active Session Indicator */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-ping"></span>
        <span className="font-mono text-[10px] text-[#908fa0]">
          BeatSync Node US-WEST-01 Connected
        </span>
      </div>
    </div>
  );
};
