export const PRODUCT = {
  name: "Calmexa XR",
  tagline: "Extended-release wellness support",
  description:
    "Calmexa XR is a once-daily extended-release formulation designed to support calm focus and restorative sleep as part of a balanced wellness routine. Each capsule contains a clinically studied blend of magnesium glycinate, L-theanine, and standardized passionflower extract.",
  price: 49.99,
  currency: "USD",
  sku: "CMX-XR-60",
  strength: "60 capsules · 30-day supply",
  highlights: [
    "Extended-release for steady support over 12 hours",
    "Non-habit forming when used as directed",
    "Third-party tested for purity and potency",
    "Vegan capsules, gluten-free",
  ],
  ingredients: [
    "Magnesium Glycinate 200mg",
    "L-Theanine 150mg",
    "Passionflower Extract (4% flavonoids) 100mg",
  ],
  warnings: [
    "Consult your physician before use if pregnant, nursing, or taking medication.",
    "Do not exceed the recommended dose.",
    "Keep out of reach of children.",
    "This product is not intended to diagnose, treat, cure, or prevent any disease.",
  ],
} as const;

export const COMPANY = {
  name: "WFEP Wellness Ltd.",
  email: "support@wfep-wellness.com",
  address: "120 Harbor Lane, Suite 400, San Francisco, CA 94111, USA",
  phone: "+1 (800) 555-0192",
} as const;
