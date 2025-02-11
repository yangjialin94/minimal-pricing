export interface Material {
  id: number;
  name: string;
  unitCount: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface Labor {
  id: number;
  peopleCount: number;
  daysCount: number;
  pricePerPersonPerDay: number;
  totalPrice: number;
}

export interface Task {
  id: number;
  name: string;
  materials: Material[];
  labors: Labor[];
  totalPrice: number;
}

export interface Project {
  id: number:
  tasks: Task[];
  totalPrice: number;
}
