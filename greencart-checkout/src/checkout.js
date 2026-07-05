export function buildCheckoutSummary(cart) {
  if (cart.isEmpty()) {
    throw new Error("Cannot build checkout summary for an empty cart");
  }

  return cart.getSummary();
}

export function validateCheckoutDetails({ country, termsAccepted }) {
  if (!country || !country.trim()) {
    throw new Error("Select a delivery country before placing the order");
  }

  if (termsAccepted !== true) {
    throw new Error("Accept terms and conditions before placing the order");
  }
}
