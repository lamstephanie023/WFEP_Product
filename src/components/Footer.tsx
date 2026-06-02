"use client";

import Link from "next/link";
import { useCookies } from "@/context/CookieContext";
import { COMPANY } from "@/lib/product";

const legal = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  const { openSettings } = useCookies();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-white">WFEP Wellness</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Science-backed formulations for modern wellbeing. Always consult a healthcare
              professional before starting any supplement regimen.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Legal
            </p>
            <ul className="mt-4 space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openSettings}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  Cookie preferences
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{COMPANY.name}</li>
              <li>{COMPANY.address}</li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.phone}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>
            These statements have not been evaluated by the FDA. This product is not intended
            to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
