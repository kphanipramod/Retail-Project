import assert from "node:assert/strict";
import test from "node:test";

import { Cart } from "../src/cart.js";
import { buildCheckoutSummary } from "../src/checkout.js";
import { placeOrder } from "../src/orders.js";

test("places a GreenKart order after reviewing three checkout products", () => {
  const cart = new Cart();

  cart.addProduct("Brocolli");
  cart.addProduct("Cauliflower");
  cart.addProduct("Cucumber");

  const summary = buildCheckoutSummary(cart);

  assert.deepEqual(
    summary.lines.map((line) => line.name),
    ["Brocolli", "Cauliflower", "Cucumber"]
  );
  assert.equal(summary.itemCount, 3);
  assert.equal(summary.subtotal, 228);

  const order = placeOrder({
    cart,
    country: "India",
    termsAccepted: true,
    orderIdFactory: () => "GK-KAN-1"
  });

  assert.equal(order.status, "CONFIRMED");
  assert.equal(order.orderId, "GK-KAN-1");
  assert.equal(order.country, "India");
  assert.equal(order.itemCount, 3);
  assert.equal(order.subtotal, 228);
  assert.match(order.confirmationMessage, /GK-KAN-1/);
  assert.match(order.confirmationMessage, /3 items/);
});

test("updates checkout totals when a product quantity changes", () => {
  const cart = new Cart();

  cart.addProduct("Brocolli");
  cart.addProduct("Cucumber", 2);

  const summary = buildCheckoutSummary(cart);
  const cucumberLine = summary.lines.find((line) => line.name === "Cucumber");

  assert.equal(summary.itemCount, 3);
  assert.equal(summary.subtotal, 216);
  assert.equal(cucumberLine.quantity, 2);
  assert.equal(cucumberLine.lineTotal, 96);
});

test("blocks order placement when country is missing", () => {
  const cart = new Cart();
  cart.addProduct("Brocolli");

  assert.throws(
    () => placeOrder({ cart, country: "", termsAccepted: true }),
    /Select a delivery country/
  );
});

test("blocks order placement when terms are not accepted", () => {
  const cart = new Cart();
  cart.addProduct("Brocolli");

  assert.throws(
    () => placeOrder({ cart, country: "India", termsAccepted: false }),
    /Accept terms and conditions/
  );
});
