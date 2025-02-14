# TODO List

- [x] Find a package to create pdf.
- [ ] Move the pricing calculation to the data updating layer.
- [ ] Add input validations for all numbers ($, %, etc.).
- [ ] Figure out a good UI for all screen sizes.
- [ ] Create a home/intro screen for the product.

## Updated data structure for the future

```ts
export type Material = {
  id: number;
  name: string;
  unit: string; // e.g., "per sq ft", "per kg"
  quantity: number; // how many units needed
  price: number; // cost per unit
};

export type Labor = {
  id: number;
  role: string; // e.g., "Electrician", "Painter"
  duration: number; // in hours or minutes
  hourlyRate: number; // cost per hour
};

export type Additional = {
  id: number;
  name: string;
  type: string; // e.g., "Permit Fee", "Delivery Fee"
  price: number;
};

export type Task = {
  id: number;
  name: string;
  materials: Material[];
  labors: Labor[];
  additional: Additional[];
  totalCost: number; // total cost before profit margin
  profitMargin?: number; // optional override
  totalPrice: number; // final price after profit margin
};

export type Project = {
  id: number;
  name: string;
  tasks: Task[];
  marginPercentage: number; // global project profit margin
  internalCost: number; // total cost before profit
  customerPrice: number; // total price after margin
};
```
