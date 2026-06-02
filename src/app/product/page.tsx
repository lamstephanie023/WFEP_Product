"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";

export default function ProductPage() {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const unitPrice = subscribe ? PRODUCT.price * 0.85 : PRODUCT.price;
  const total = unitPrice * qty;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-teal-100 via-white to-indigo-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-36 rounded-3xl bg-gradient-to-b from-teal-500 to-teal-800 shadow-2xl" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
            {PRODUCT.highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-teal-700">SKU: {PRODUCT.sku}</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-slate-900">{PRODUCT.name}</h1>
          <p className="mt-2 text-slate-600">{PRODUCT.tagline}</p>
          <p className="mt-6 leading-relaxed text-slate-600">{PRODUCT.description}</p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-slate-900">${unitPrice.toFixed(2)}</span>
            {subscribe && (
              <span className="text-sm text-slate-500 line-through">${PRODUCT.price.toFixed(2)}</span>
            )}
          </div>

          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="accent-teal-600"
            />
            <span className="text-sm">
              <strong className="text-slate-900">Subscribe & save 15%</strong>
              <span className="block text-slate-500">Delivered every 30 days. Cancel anytime.</span>
            </span>
          </label>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-slate-200">
              <button
                type="button"
                className="px-4 py-2 text-lg text-slate-600 hover:text-slate-900"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
              <button
                type="button"
                className="px-4 py-2 text-lg text-slate-600 hover:text-slate-900"
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(qty, subscribe)}
              className="flex-1 rounded-full bg-teal-600 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Add to cart — ${total.toFixed(2)}
            </button>
          </div>

          <ul className="mt-10 space-y-2">
            {PRODUCT.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-slate-600">
                <span className="text-teal-600">✓</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">Ingredients</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {PRODUCT.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
          <h2 className="font-display text-lg font-semibold text-amber-900">Important information</h2>
          <ul className="mt-4 space-y-2 text-sm text-amber-900/80">
            {PRODUCT.warnings.map((w) => (
              <li key={w}>• {w}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
