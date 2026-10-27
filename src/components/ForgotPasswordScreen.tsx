import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('alex.rivera@creativepulse.io');
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(14 * 60 + 59); // 14:59
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSent, countdown]);

  const formatCountdown = () => {
    const min = Math.floor(countdown / 60);
    const sec = countdown % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSent(true);
    setCountdown(14 * 60 + 59);
  };

  const handleResend = () => {
    setIsResending(true);
    setCountdown(14 * 60 + 59);
    setTimeout(() => {
      setIsResending(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pt-20 pb-20 px-4 gap-4 select-none animate-in fade-in duration-200">
      {/* Header Glow & Visual Shield Badge */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        <div className="absolute -top-12 w-64 h-64 bg-[#8083ff]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-2 w-36 h-36 bg-[#ffb2b7]/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Visual Shield Badge with Halo */}
        <div className="relative mt-2 mb-4 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#8083ff]/20 blur-xl animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-[#282a30] border border-white/[0.08] flex items-center justify-center shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-[#1e1f26] border border-white/[0.05] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[36px]">lock_reset</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#b50036] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[14px]">bolt</span>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center w-full max-w-sm px-2">
          <h1 className="text-2xl font-bold text-[#e2e2eb] tracking-tight">Reset your password</h1>
          <p className="mt-1 text-xs text-[#c7c4d7] leading-relaxed">
            Enter your registered email address and we'll send you a secure 6-digit verification code to recover your account.
          </p>
        </div>
      </div>

      {/* Form / State Container */}
      <div className="w-full">
        {!isSent ? (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#e2e2eb] flex items-center justify-between" htmlFor="recovery-email">
                <span>Studio Account Email</span>
                <span className="font-mono text-[10px] text-[#bdc2ff] font-bold">NLE PROFILE</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  id="recovery-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@studio.com"
                  required
                  className="w-full h-12 pl-10 pr-4 bg-[#282a30] border border-white/[0.08] text-[#e2e2eb] placeholder-[#908fa0] text-xs rounded-xl focus:outline-none focus:border-[#8083ff]"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[14px]">verified_user</span>
                <span className="text-[11px] text-[#c7c4d7]">
                  Must match the email associated with your BeatCut studio profile.
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-[#8083ff]/20"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send Reset Code</span>
            </button>
          </form>
        ) : (
          /* Success Confirmation State */
          <div className="flex flex-col gap-3 bg-[#282a30] border border-white/[0.08] p-5 rounded-2xl shadow-xl animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b50036]/60 text-[#ffb2b7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#e2e2eb]">Code Dispatched!</span>
                <p className="text-xs text-[#c7c4d7] mt-0.5">
                  Verification email sent to <span className="font-mono text-[#c0c1ff] font-bold">{email}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#1e1f26] p-3.5 rounded-xl border border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#c7c4d7]">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">timer</span>
                <span className="font-mono text-[10px] uppercase font-bold">Code expires in</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#ffb2b7]">{formatCountdown()}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setIsSent(false)}
                className="flex-1 h-10 rounded-xl bg-[#1e1f26] hover:bg-[#33343b] text-[#e2e2eb] text-xs font-semibold flex items-center justify-center gap-1 border border-white/[0.06]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Email</span>
              </button>

              <button
                onClick={handleResend}
                className="flex-1 h-10 rounded-xl bg-[#1e1f26] hover:bg-[#33343b] text-[#c0c1ff] text-xs font-semibold flex items-center justify-center gap-1 border border-white/[0.06]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">sync</span>
                <span>{isResending ? 'Sent!' : 'Resend'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recovery Roadmap */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider font-bold">
            Recovery Process
          </span>
          <span className="font-mono text-[9px] text-[#c0c1ff] uppercase bg-[#8083ff]/20 px-2 py-0.5 rounded-full font-bold">
            3-STEP SAFETY CHECK
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            {
              num: '01',
              title: 'Check your inbox for security code',
              desc: '6-digit alphanumeric token generated via hardware encryption.'
            },
            {
              num: '02',
              title: 'Enter code & choose new strong password',
              desc: 'Minimum 8 characters with multi-factor passkey option.'
            },
            {
              num: '03',
              title: 'Regain access to your cuts & cloud vault',
              desc: 'Timeline autosaves, AI render caches, and stems stay pristine.'
            }
          ].map((step) => (
            <div
              key={step.num}
              className="flex items-center gap-3 p-3 bg-[#191b22] border border-white/[0.04] rounded-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-[#282a30] text-[#c0c1ff] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {step.num}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#e2e2eb]">{step.title}</span>
                <span className="text-[11px] text-[#c7c4d7]">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Callout */}
      <div className="p-3 bg-[#191b22] border border-white/[0.04] rounded-xl flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[#bdc2ff] text-[18px] shrink-0 mt-0.5">shield</span>
        <p className="text-[11px] text-[#c7c4d7]">
          For your security, reset links expire after 15 minutes. Source clips and stored cuts remain safely locked.
        </p>
      </div>

      {/* Alternative Support Option */}
      <div className="p-3.5 bg-[#1e1f26] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#282a30] flex items-center justify-center shrink-0 text-[#ffb2b7]">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#e2e2eb] truncate">Need help recovering an account?</span>
            <span className="text-[10px] text-[#c7c4d7] truncate">In 14-day deletion hold or 2FA locked</span>
          </div>
        </div>
        <button
          onClick={() => alert('Routing to BeatCut 24/7 Creator Priority Desk')}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-[#282a30] hover:bg-[#33343b] text-[#c0c1ff] text-xs font-semibold flex items-center gap-1 border border-white/[0.06]"
          type="button"
        >
          <span>Support</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* Back to Sign In */}
      <div className="mt-2 flex items-center justify-center">
        <button
          onClick={() => onNavigate('signin')}
          className="font-bold text-xs text-[#c0c1ff] hover:underline flex items-center gap-1.5 py-2 px-4 rounded-full"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Remembered your password? Back to Sign In</span>
        </button>
      </div>
    </div>
  );
};
