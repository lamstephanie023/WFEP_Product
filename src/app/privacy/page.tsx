import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/product";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="May 25, 2026">
      <p>
        {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
        This Privacy Policy explains how we collect, use, disclose, and protect personal
        information when you visit our website or purchase our products.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Data controller: {COMPANY.name}, {COMPANY.address}. Contact: {COMPANY.email}, {COMPANY.phone}.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>Identity and contact data (name, email, phone, shipping and billing address);</li>
        <li>Order and payment details (processed by our payment partners—we do not store full card numbers);</li>
        <li>Account credentials if you create an account;</li>
        <li>Communications with customer support;</li>
        <li>Health-related preferences you voluntarily share (e.g., wellness goals in surveys).</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Device and browser type, IP address, and general location;</li>
        <li>Pages viewed, referring URLs, and interaction data;</li>
        <li>Cookies and similar technologies (see our <Link href="/cookies">Cookie Policy</Link>).</li>
      </ul>

      <h2>3. How we use your information</h2>
      <p>We process personal data to:</p>
      <ul>
        <li>Fulfill orders, process payments, and provide customer service;</li>
        <li>Send transactional emails (order confirmations, shipping updates);</li>
        <li>Operate, secure, and improve our website and services;</li>
        <li>Send marketing communications where you have opted in (you may unsubscribe at any time);</li>
        <li>Comply with legal obligations, including age verification and fraud prevention;</li>
        <li>Conduct analytics and product research in aggregated or de-identified form where possible.</li>
      </ul>

      <h2>4. Legal bases for processing (EEA/UK visitors)</h2>
      <p>Where applicable, we rely on:</p>
      <ul>
        <li><strong>Contract</strong> — to perform our agreement with you;</li>
        <li><strong>Legitimate interests</strong> — site security, analytics, and direct marketing to existing customers;</li>
        <li><strong>Consent</strong> — non-essential cookies and promotional emails;</li>
        <li><strong>Legal obligation</strong> — tax, regulatory, and law enforcement requests.</li>
      </ul>

      <h2>5. Sharing your information</h2>
      <p>We may share data with:</p>
      <ul>
        <li>Service providers (hosting, payment processing, shipping, email, analytics) under contractual confidentiality obligations;</li>
        <li>Professional advisers (lawyers, accountants) when necessary;</li>
        <li>Authorities when required by law or to protect rights and safety;</li>
        <li>Successors in the event of a merger, acquisition, or asset sale.</li>
      </ul>
      <p>We do not sell your personal information for monetary consideration.</p>

      <h2>6. International transfers</h2>
      <p>
        If you access our site from outside the United States, your data may be transferred to and
        processed in the U.S. We implement appropriate safeguards (such as Standard Contractual
        Clauses) where required by applicable law.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We retain order and account records for as long as needed to provide services, meet legal
        obligations (typically 7 years for tax records), and resolve disputes. Marketing data is
        retained until you withdraw consent or object, plus a reasonable suppression period.
      </p>

      <h2>8. Security</h2>
      <p>
        We use encryption in transit (TLS), access controls, and regular security reviews. No method
        of transmission over the Internet is 100% secure; we cannot guarantee absolute security.
      </p>

      <h2>9. Your rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal data;</li>
        <li>Restrict or object to certain processing;</li>
        <li>Data portability;</li>
        <li>Withdraw consent where processing is consent-based;</li>
        <li>Lodge a complaint with a supervisory authority.</li>
      </ul>
      <p>
        California residents may have additional rights under the CCPA/CPRA, including knowing what
        personal information is collected and requesting deletion. To exercise rights, email{" "}
        {COMPANY.email} with &quot;Privacy Request&quot; in the subject line.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are not directed to individuals under 18. We do not knowingly collect personal
        information from children. Contact us if you believe we have collected such data.
      </p>

      <h2>11. Third-party links</h2>
      <p>
        Our site may link to external websites. We are not responsible for their privacy practices.
        Review their policies before providing personal information.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We will post updates on this page and, where required, notify you by email or prominent
        notice. The &quot;Last updated&quot; date reflects the current version.
      </p>

      <h2>13. Contact</h2>
      <p>
        For privacy inquiries: {COMPANY.email}. Postal: {COMPANY.name}, {COMPANY.address}.
      </p>
    </LegalLayout>
  );
}
