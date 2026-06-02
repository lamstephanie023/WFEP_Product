"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type CartStep = "cart" | "checkout" | "done";

type CartContextValue = {
  isOpen: boolean;
  hasItems: boolean;
  qty: number;
  subscribe: boolean;
  step: CartStep;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (qty: number, subscribe: boolean) => void;
  setQty: (qty: number) => void;
  setSubscribe: (subscribe: boolean) => void;
  setStep: (step: CartStep) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasItems, setHasItems] = useState(false);
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [step, setStep] = useState<CartStep>("cart");

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => {
    setIsOpen(false);
    if (step === "done") {
      setStep("cart");
      setQty(1);
      setSubscribe(false);
    }
  }, [step]);

  const addToCart = useCallback((newQty: number, newSubscribe: boolean) => {
    setQty(Math.max(1, newQty));
    setSubscribe(newSubscribe);
    setHasItems(true);
    setStep("cart");
    setIsOpen(true);
  }, []);

  const resetCart = useCallback(() => {
    setStep("cart");
    setQty(1);
    setSubscribe(false);
    setHasItems(false);
    setIsOpen(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        hasItems,
        qty,
        subscribe,
        step,
        openCart,
        closeCart,
        addToCart,
        setQty,
        setSubscribe,
        setStep,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
