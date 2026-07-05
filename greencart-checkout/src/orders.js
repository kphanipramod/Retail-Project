import { buildCheckoutSummary, validateCheckoutDetails } from "./checkout.js";

function defaultOrderIdFactory() {
  return `GK-${Date.now().toString(36).toUpperCase()}`;
}

export function placeOrder({
  cart,
  country,
  termsAccepted,
  orderIdFactory = defaultOrderIdFactory
}) {
  const checkoutSummary = buildCheckoutSummary(cart);
  validateCheckoutDetails({ country, termsAccepted });

  const orderId = orderIdFactory();

  return {
    orderId,
    status: "CONFIRMED",
    country: country.trim(),
    itemCount: checkoutSummary.itemCount,
    subtotal: checkoutSummary.subtotal,
    lines: checkoutSummary.lines,
    confirmationMessage: `Thank you, your order ${orderId} for ${checkoutSummary.itemCount} items has been placed successfully.`
  };
}
