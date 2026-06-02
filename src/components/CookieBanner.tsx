"use client";

import Link from "next/link";
import { useState } from "react";
import { useCookies } from "@/context/CookieContext";

export function CookieBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, savePreferences } = useCookies();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">Cookie settings</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We use cookies to run our site, understand usage, and personalize offers. You can accept
          all, reject non-essential cookies, or customize your choices. See our{" "}
          <Link href="/cookies" className="font-medium text-teal-700 underline">
            Cookie Policy
          </Link>
          .
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <label className="flex items-start gap-3 opacity-70">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong className="text-slate-800">Strictly necessary</strong>
                <span className="block text-slate-500">Required for checkout, security, and preferences.</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 accent-teal-600"
              />
              <span>
                <strong className="text-slate-800">Analytics</strong>
                <span className="block text-slate-500">Helps us improve pages and measure performance.</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 accent-teal-600"
              />
              <span>
                <strong className="text-slate-800">Marketing</strong>
                <span className="block text-slate-500">Personalized content and promotional emails.</span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reject non-essential
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() => savePreferences({ analytics, marketing })}
              className="rounded-full border border-teal-200 bg-teal-50 px-5 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
