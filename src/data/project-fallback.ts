import { v4 as uuidv4 } from "uuid";

import { Project } from "@/types";

export const PROJECT_FALLBACK: Project = {
  id: uuidv4(),
  tasks: [],
  totalCost: 0,
  profitMargin: 0,
  totalPrice: 0,
  totalProfit: 0,
  user: {
    id: uuidv4(),
    name: "",
    phone: "",
    email: "",
  },
  customer: {
    id: uuidv4(),
    name: "",
    address: "",
    phone: "",
    email: "",
  },
};
