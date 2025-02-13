import { Additional } from "./index";
export interface Material {
  id: number;
  name: string;
  price: number;
}

export interface Labor {
  id: number;
  duration: string;
  price: number;
}

export interface Additional {
  id: number;
  name: string;
  price: number;
}

export interface Task {
  id: number;
  name: string;
  materials: Material[];
  labors: Labor[];
  additional: Additional[];
  totalPrice: number;
}

// export interface Project {
//   id: number:
//   tasks: Task[];
//   totalPrice: number;
// }
