import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SignUpScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@creator.io');
  const [password, setPassword] = useState('CinematicBeat#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Password Strength calculations
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  const score = [hasLength, hasNumber, hasSymbol, hasMixedCase].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: 'Enter password', color: 'text-[#908fa0]' };
    if (score <= 1) return { label: 'Weak', color: 'text-[#ffb4ab]' };
    if (score === 2) return { label: 'Fair', color: 'text-[#ffb2b7]' };
    if (score === 3) return { label: 'Good', color: 'text-[#bdc2ff]' };
    return { label: 'Strong', color: 'text-[#c0c1ff]' };
  };

  const strength = getStrengthLabel();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-20 px-4 gap-4 select-none animate-in fade-in duration-200">
      {/* Kinetic Waveform Visual Header */}
      <div className="relative w-full rounded-2xl bg-[#191b22] border border-white/[0.08] p-5 overflow-hidden shadow-xl">
        <div className="absolute -top-12 -right-10 w-44 h-44 bg-[#8083ff]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-6 w-36 h-36 bg-[#b50036]/25 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#282a30]/80 backdrop-blur-md border border-white/[0.08] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7] shadow-[0_0_8px_#ffb2b7] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#c0c1ff] tracking-wider uppercase font-semibold">
              V3.4 Neural Cut Engine
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#e2e2eb] tracking-tight">
            Create your creator account
          </h1>
          <p className="text-xs text-[#c7c4d7]">
            Turn raw clips into cinematic, beat-synchronized videos in seconds.
          </p>

          {/* Mini dynamic waveform bar decoration */}
          <div aria-hidden="true" className="flex items-center gap-[3px] pt-1 h-6 opacity-80">
            <div className="w-1 h-2 rounded-full bg-[#464554]"></div>
            <div className="w-1 h-3 rounded-full bg-[#c0c1ff]/40"></div>
            <div className="w-1 h-5 rounded-full bg-[#c0c1ff]"></div>
            <div className="w-1 h-4 rounded-full bg-[#c0c1ff]/70"></div>
            <div className="w-1 h-2 rounded-full bg-[#464554]"></div>
            <div className="w-1 h-5 rounded-full bg-[#ffb2b7] shadow-[0_0_6px_#ffb2b7]"></div>
            <div className="w-1 h-6 rounded-full bg-[#ffb2b7]"></div>
            <div className="w-1 h-3 rounded-full bg-[#ffb2b7]/60"></div>
            <div className="w-1 h-2 rounded-full bg-[#464554]"></div>
            <div className="w-1 h-4 rounded-full bg-[#c0c1ff]"></div>
            <div className="w-1 h-5 rounded-full bg-[#8083ff]"></div>
            <div className="w-1 h-3 rounded-full bg-[#464554]"></div>
          </div>
        </div>
      </div>

      {/* Free Tier Perk Callout Banner */}
      <div className="relative w-full rounded-2xl bg-[#1e1f26] border border-white/[0.06] p-4 shadow-sm flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#282a30] border border-white/[0.08] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">auto_awesome</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-[#c0c1ff] font-bold">
              Creator Tier
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffb2b7]/15 text-[#ffb2b7] font-mono text-[9px] uppercase font-bold border border-[#ffb2b7]/30">
              Free Forever
            </span>
          </div>
          <p className="text-xs text-[#e2e2eb] mt-1 leading-relaxed">
            Includes <strong className="text-white font-semibold">5 AI beat-sync edits</strong> every month &{' '}
            <strong className="text-white font-semibold">10 GB Cloud Vault</strong>.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="flex flex-col gap-3.5 w-full">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#e2e2eb] flex items-center justify-between" htmlFor="fullName">
            <span>Creator Name</span>
            <span className="font-mono text-[10px] text-[#908fa0]">Display tag</span>
          </label>
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
              person
            </span>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full bg-[#191b22] border border-white/[0.08] text-[#e2e2eb] placeholder-[#908fa0] text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#8083ff]"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#e2e2eb] flex items-center justify-between" htmlFor="email">
            <span>Work or Creator Email</span>
            <span className="font-mono text-[10px] text-[#ffb2b7] font-bold">Synced with Studio</span>
          </label>
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
              alternate_email
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@creator.io"
              className="w-full bg-[#191b22] border border-white/[0.08] text-[#e2e2eb] placeholder-[#908fa0] text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#8083ff]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#e2e2eb]" htmlFor="password">
              Password
            </label>
            <span className={`font-mono text-[10px] font-bold ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 chars, 1 number & symbol"
              className="w-full bg-[#191b22] border border-white/[0.08] text-[#e2e2eb] placeholder-[#908fa0] text-xs rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-[#8083ff]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[#908fa0] hover:text-[#e2e2eb]"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          {/* Real-time Strength Meter */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
              <div className={`h-full rounded-full transition-all duration-300 ${hasLength ? 'bg-[#c0c1ff]' : 'bg-[#33343b]'}`}></div>
              <div className={`h-full rounded-full transition-all duration-300 ${hasNumber ? 'bg-[#c0c1ff]' : 'bg-[#33343b]'}`}></div>
              <div className={`h-full rounded-full transition-all duration-300 ${hasSymbol ? 'bg-[#c0c1ff]' : 'bg-[#33343b]'}`}></div>
              <div className={`h-full rounded-full transition-all duration-300 ${hasMixedCase ? 'bg-[#c0c1ff] shadow-[0_0_8px_#c0c1ff]' : 'bg-[#33343b]'}`}></div>
            </div>

            <div className="flex items-center justify-between text-[#c7c4d7] font-mono text-[10px]">
              <span className={`flex items-center gap-1 ${hasLength ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                <span className="material-symbols-outlined text-[12px]">
                  {hasLength ? 'check_circle' : 'radio_button_unchecked'}
                </span>{' '}
                8+ chars
              </span>
              <span className={`flex items-center gap-1 ${hasNumber ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                <span className="material-symbols-outlined text-[12px]">
                  {hasNumber ? 'check_circle' : 'radio_button_unchecked'}
                </span>{' '}
                Number
              </span>
              <span className={`flex items-center gap-1 ${hasSymbol ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                <span className="material-symbols-outlined text-[12px]">
                  {hasSymbol ? 'check_circle' : 'radio_button_unchecked'}
                </span>{' '}
                Symbol
              </span>
              <span className={`flex items-center gap-1 ${hasMixedCase ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                <span className="material-symbols-outlined text-[12px]">
                  {hasMixedCase ? 'check_circle' : 'radio_button_unchecked'}
                </span>{' '}
                Mixed case
              </span>
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#191b22] border border-white/[0.06] hover:bg-[#1e1f26] transition-all cursor-pointer select-none mt-1">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-transform active:scale-90 shadow-sm ${
              agreeTerms ? 'bg-[#8083ff] text-[#0d0096]' : 'bg-[#282a30] text-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] font-bold">check</span>
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-xs text-[#e2e2eb] leading-snug">
              I agree to BeatCut's <span className="text-[#c0c1ff] underline underline-offset-2">Terms of Service</span> and{' '}
              <span className="text-[#c0c1ff] underline underline-offset-2">Privacy Policy</span>.
            </p>
            <div className="flex items-center gap-1 mt-0.5 font-mono text-[10px] text-[#908fa0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b7]"></span>
              <span>No credit card required. Cancel anytime.</span>
            </div>
          </div>
        </label>

        {/* Primary CTA Button */}
        <button
          onClick={handleRegister}
          disabled={isSubmitting || !agreeTerms}
          className={`w-full min-h-[50px] rounded-xl font-bold text-xs flex items-center justify-center gap-2 px-4 transition-all shadow-lg shadow-[#8083ff]/20 active:scale-[0.98] ${
            agreeTerms
              ? 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9]'
              : 'bg-[#282a30] text-[#908fa0] cursor-not-allowed opacity-60'
          }`}
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-[#1000a9] border-t-transparent rounded-full animate-spin"></span>
              <span>Syncing BeatVault...</span>
            </>
          ) : submitSuccess ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Welcome, Alex!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              <span>Create Free Account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-1">
        <div className="w-full h-px bg-[#282a30]"></div>
        <span className="absolute px-3 bg-[#111319] font-mono text-[10px] text-[#908fa0] uppercase tracking-wider">
          or sign up with
        </span>
      </div>

      {/* Social Sign-up */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <button
          onClick={() => onNavigate('home')}
          className="min-h-[44px] rounded-xl bg-[#191b22] hover:bg-[#282a30] text-[#e2e2eb] flex items-center justify-center gap-2 p-2 border border-white/[0.04] transition-all active:scale-95 shadow-sm"
          type="button"
        >
          <span className="text-xs font-bold text-[#c0c1ff]">Google</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="min-h-[44px] rounded-xl bg-[#191b22] hover:bg-[#282a30] text-[#e2e2eb] flex items-center justify-center gap-2 p-2 border border-white/[0.04] transition-all active:scale-95 shadow-sm"
          type="button"
        >
          <span className="text-xs font-bold text-white">Apple</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="min-h-[44px] rounded-xl bg-[#191b22] hover:bg-[#282a30] text-[#e2e2eb] flex items-center justify-center gap-2 p-2 border border-white/[0.04] transition-all active:scale-95 shadow-sm"
          type="button"
        >
          <span className="text-xs font-bold text-[#ffb2b7]">TikTok</span>
        </button>
      </div>

      {/* Privacy Assurance */}
      <div className="rounded-xl bg-[#0c0e14] border border-white/[0.05] p-3 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[16px] text-[#c0c1ff] shrink-0">verified_user</span>
        <p className="text-[11px] text-[#c7c4d7]">
          We never sell your media or use your raw footage to train public AI models.
        </p>
      </div>

      {/* Switch to Sign In */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        <span className="text-xs text-[#c7c4d7]">Already have an account?</span>
        <button
          onClick={() => onNavigate('signin')}
          className="text-xs font-bold text-[#c0c1ff] hover:underline"
          type="button"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
