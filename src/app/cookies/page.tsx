import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/product";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="May 25, 2026">
      <p>
        This Cookie Policy explains how {COMPANY.name} uses cookies and similar technologies on our
        website. It should be read together with our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms & Conditions</Link>.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the
        site remember your preferences, keep you signed in, and understand how pages are used.
        Similar technologies include local storage, session storage, and pixel tags.
      </p>

      <h2>2. How we use cookies</h2>
      <p>We group cookies into the following categories:</p>

      <h3>Strictly necessary</h3>
      <p>
        Required for core functionality such as shopping cart persistence, secure checkout, load
        balancing, and remembering your cookie consent choices. These cannot be disabled through our
        banner without affecting site operation.
      </p>

      <h3>Analytics</h3>
      <p>
        Help us understand traffic patterns, popular pages, and errors so we can improve performance.
        Data is typically aggregated. We only enable these cookies if you consent.
      </p>

      <h3>Marketing</h3>
      <p>
        Used to measure ad effectiveness, deliver personalized offers, and support email campaign
        attribution. We only enable these cookies if you consent.
      </p>

      <h2>3. Cookies we may use</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Purpose</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="px-4 py-3 font-mono text-xs">wfep-cookie-preferences</td>
              <td className="px-4 py-3">Stores your cookie consent choices</td>
              <td className="px-4 py-3">1 year</td>
              <td className="px-4 py-3">Necessary</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">session_id</td>
              <td className="px-4 py-3">Maintains cart and checkout session</td>
              <td className="px-4 py-3">Session</td>
              <td className="px-4 py-3">Necessary</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">_wfep_analytics</td>
              <td className="px-4 py-3">Anonymous usage statistics</td>
              <td className="px-4 py-3">13 months</td>
              <td className="px-4 py-3">Analytics</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">_wfep_marketing</td>
              <td className="px-4 py-3">Campaign and referral tracking</td>
              <td className="px-4 py-3">90 days</td>
              <td className="px-4 py-3">Marketing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Managing your preferences</h2>
      <p>
        When you first visit our site, a cookie banner allows you to accept all cookies, reject
        non-essential cookies, or customize your choices. You can change your preferences at any time
        via the &quot;Cookie preferences&quot; link in the footer.
      </p>
      <p>
        You can also control cookies through your browser settings. Blocking all cookies may prevent
        certain features (such as checkout) from working correctly.
      </p>

      <h2>5. Third-party cookies</h2>
      <p>
        If we integrate third-party services (e.g., payment providers or embedded videos), those
        providers may set their own cookies. We encourage you to review their policies. We do not
        control third-party cookies.
      </p>

      <h2>6. Do Not Track</h2>
      <p>
        Some browsers send &quot;Do Not Track&quot; signals. There is no uniform industry standard
        for responding to these signals; we currently honor the choices you make in our cookie
        banner.
      </p>

      <h2>7. Updates</h2>
      <p>
        We may update this Cookie Policy to reflect changes in technology or regulation. Check the
        &quot;Last updated&quot; date at the top of this page.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about cookies: {COMPANY.email}, {COMPANY.phone}.
      </p>
    </LegalLayout>
  );
}
