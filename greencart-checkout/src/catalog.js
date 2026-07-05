export const GREENKART_PRODUCTS = [
  {
    id: "veg-brocolli-1kg",
    name: "Brocolli",
    size: "1 Kg",
    unitPrice: 120
  },
  {
    id: "veg-cauliflower-1kg",
    name: "Cauliflower",
    size: "1 Kg",
    unitPrice: 60
  },
  {
    id: "veg-cucumber-1kg",
    name: "Cucumber",
    size: "1 Kg",
    unitPrice: 48
  },
  {
    id: "veg-beetroot-1kg",
    name: "Beetroot",
    size: "1 Kg",
    unitPrice: 32
  }
];

export function findProductByName(productName, catalog = GREENKART_PRODUCTS) {
  const normalizedName = productName.trim().toLowerCase();
  const product = catalog.find((item) => item.name.toLowerCase() === normalizedName);

  if (!product) {
    throw new Error(`Product not found in catalog: ${productName}`);
  }

  return product;
}
