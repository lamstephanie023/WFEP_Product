import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="May 25, 2026">
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of the website operated by{" "}
        {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and the purchase of
        products offered through it. By accessing our site or placing an order, you agree to be
        bound by these Terms.
      </p>

      <h2>1. Eligibility and age requirements</h2>
      <p>
        You must be at least 18 years of age (or the age of majority in your jurisdiction) to
        purchase products from us. By placing an order, you represent that you meet this requirement
        and that any health-related products will be used only as directed and in compliance with
        applicable law.
      </p>

      <h2>2. Products and health disclaimers</h2>
      <p>
        Information on this website is provided for general educational purposes only and does not
        constitute medical advice. Our products, including dietary supplements, are not intended to
        diagnose, treat, cure, or prevent any disease unless expressly stated and approved by the
        relevant regulatory authority.
      </p>
      <ul>
        <li>Always read the label and follow directions for use.</li>
        <li>Consult a qualified healthcare professional before use if you are pregnant, nursing, have a medical condition, or take prescription medication.</li>
        <li>Discontinue use and seek medical attention if you experience an adverse reaction.</li>
        <li>Individual results may vary.</li>
      </ul>

      <h2>3. Orders, pricing, and payment</h2>
      <p>
        All prices are displayed in U.S. dollars unless otherwise stated. We reserve the right to
        correct pricing errors, limit quantities, refuse or cancel orders, and discontinue products
        at any time. Payment must be received in full before dispatch. You are responsible for any
        applicable taxes, duties, or import fees.
      </p>

      <h2>4. Shipping and delivery</h2>
      <p>
        Estimated delivery times are provided in good faith and are not guaranteed. Risk of loss
        passes to you upon delivery to the carrier. You must provide accurate shipping information;
        we are not liable for delays or failed delivery due to incorrect addresses.
      </p>

      <h2>5. Returns and refunds</h2>
      <p>
        Unopened products in resaleable condition may be returned within 30 days of delivery for a
        full refund of the purchase price (excluding shipping), subject to our Returns Policy. Opened
        or used products cannot be returned for safety and regulatory reasons unless defective or
        recalled. To initiate a return, contact {COMPANY.email}.
      </p>

      <h2>6. Subscriptions</h2>
      <p>
        If you enroll in a subscription program, you authorize recurring charges at the frequency
        disclosed at checkout. You may cancel before the next billing cycle through your account or
        by contacting support. Cancellation does not affect orders already processed.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on this site—including text, graphics, logos, and product names—is owned by or
        licensed to us and protected by copyright and trademark laws. You may not reproduce,
        distribute, or create derivative works without our prior written consent.
      </p>

      <h2>8. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose or in violation of export control regulations;</li>
        <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts;</li>
        <li>Submit false, misleading, or fraudulent order information;</li>
        <li>Resell products in breach of applicable pharmacy or supplement regulations.</li>
      </ul>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages arising from your use of the site or products.
        Our total liability for any claim relating to a specific order shall not exceed the amount
        you paid for that order.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {COMPANY.name}, its officers, directors, and
        employees from claims arising out of your misuse of the site, violation of these Terms, or
        infringement of third-party rights.
      </p>

      <h2>11. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to conflict
        of law principles. Any dispute shall be resolved in the state or federal courts located in
        San Francisco County, California, and you consent to personal jurisdiction therein.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be posted on this page
        with an updated &quot;Last updated&quot; date. Continued use of the site after changes
        constitutes acceptance.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms may be directed to {COMPANY.name}, {COMPANY.address}, or{" "}
        {COMPANY.email}.
      </p>
    </LegalLayout>
  );
}
