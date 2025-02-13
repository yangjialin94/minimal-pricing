export interface Material {
  id: number;
  name: string;
  price: number;
}

export interface Labor {
  id: number;
  duration: string;
  cost: number;
}

export interface Task {
  id: number;
  name: string;
  materials: Material[];
  labors: Labor[];
  totalPrice: number;
}

// export interface Project {
//   id: number:
//   tasks: Task[];
//   totalPrice: number;
// }
