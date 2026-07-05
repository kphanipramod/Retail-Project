import { GREENKART_PRODUCTS, findProductByName } from "./catalog.js";

function assertPositiveQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive whole number");
  }
}

export class Cart {
  #catalog;
  #items = new Map();

  constructor(catalog = GREENKART_PRODUCTS) {
    this.#catalog = catalog;
  }

  addProduct(productName, quantity = 1) {
    assertPositiveQuantity(quantity);

    const product = findProductByName(productName, this.#catalog);
    const existing = this.#items.get(product.id);

    this.#items.set(product.id, {
      product,
      quantity: (existing?.quantity ?? 0) + quantity
    });

    return this.getSummary();
  }

  setQuantity(productName, quantity) {
    assertPositiveQuantity(quantity);

    const product = findProductByName(productName, this.#catalog);
    this.#items.set(product.id, { product, quantity });

    return this.getSummary();
  }

  removeProduct(productName) {
    const product = findProductByName(productName, this.#catalog);
    this.#items.delete(product.id);

    return this.getSummary();
  }

  isEmpty() {
    return this.#items.size === 0;
  }

  getLines() {
    return Array.from(this.#items.values()).map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      size: product.size,
      quantity,
      unitPrice: product.unitPrice,
      lineTotal: quantity * product.unitPrice
    }));
  }

  getSummary() {
    const lines = this.getLines();
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => total + line.lineTotal, 0);

    return {
      itemCount,
      subtotal,
      lines
    };
  }
}
