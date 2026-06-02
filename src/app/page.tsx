import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT } from "@/lib/product";

const features = [
  {
    title: "Clinically studied actives",
    body: "Every batch is formulated with peer-reviewed ingredients at effective doses.",
  },
  {
    title: "Transparent labeling",
    body: "Full ingredient disclosure, allergen callouts, and lot-level COAs on request.",
  },
  {
    title: "Sustainable shipping",
    body: "Recyclable packaging and carbon-neutral delivery on every order.",
  },
];

const steps = [
  { step: "01", title: "Choose your supply", desc: "Single bottle or subscribe and save 15%." },
  { step: "02", title: "Secure checkout", desc: "Encrypted payments and age verification where required." },
  { step: "03", title: "Track & support", desc: "Real-time shipping updates and pharmacist chat access." },
];

export default function HomePage() {
  return (
    <>
      <section className="gradient-mesh border-b border-slate-200/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              New formulation · Extended release
            </p>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Calm focus.
              <br />
              <span className="text-teal-700">Restorative nights.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              {PRODUCT.name} delivers steady, non-habit-forming support for your daily rhythm —
              crafted for people who want clarity without compromise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/product"
                className="inline-flex items-center rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700"
              >
                Shop {PRODUCT.name}
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                How it works
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckIcon /> GMP certified facility
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon /> 30-day satisfaction guarantee
              </span>
            </div>
          </div>
          <ProductCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Why thousands trust WFEP
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            We combine pharmaceutical-grade quality controls with a direct-to-consumer experience
            built for transparency.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <CheckIcon />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-center text-3xl font-semibold text-slate-900">
            Simple ordering, professional care
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <span className="font-display text-4xl font-semibold text-teal-200">{s.step}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-slate-900">
          Ready to feel the difference?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Join our community and receive wellness tips, exclusive offers, and early access to new
          formulations.
        </p>
        <Link
          href="/product"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Get {PRODUCT.name} — ${PRODUCT.price.toFixed(2)}
        </Link>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
