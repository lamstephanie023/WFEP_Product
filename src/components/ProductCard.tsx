import Link from "next/link";
import { PRODUCT } from "@/lib/product";

export function ProductCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-teal-100 via-slate-50 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="h-40 w-28 rounded-2xl bg-gradient-to-b from-teal-500 to-teal-700 shadow-lg" />
            <div className="absolute -right-6 top-8 h-32 w-20 rounded-2xl bg-gradient-to-b from-teal-400/80 to-teal-600/80 shadow-md" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wide text-teal-800">
              XR
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Bestseller
        </p>
        <h2 className="font-display mt-2 text-2xl font-semibold text-slate-900">
          {PRODUCT.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{PRODUCT.strength}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">
            ${PRODUCT.price.toFixed(2)}
          </span>
          <span className="text-sm text-slate-500">/ {PRODUCT.currency}</span>
        </div>
        <Link
          href="/product"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          View product
        </Link>
      </div>
    </div>
  );
}
