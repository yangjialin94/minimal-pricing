export type Material = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitCost: number;
  cost: number; // quantity * unitCost
};

export type Labor = {
  id: string;
  role: string;
  unit: string;
  quantity: number;
  unitCost: number;
  cost: number; // quantity * unitCost
};

export type Additional = {
  id: string;
  type: string;
  cost: number;
};

export type Task = {
  id: string;
  name: string;
  materials: Material[];
  labors: Labor[];
  additional: Additional[];
  totalCost: number;
  profitMargin: numbers;
  totalPrice: numbers; // totalCost / (1 - profitMargin / 100)
};

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export type Customer = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
  totalCost: number; // Base cost of materials, labor, etc.
  profitMargin: number; // Stored as a whole number (10% -> 0.1)
  totalPrice: number; // Final selling price (totalCost / (1 - profitMargin / 100))
  totalProfit: number; // Absolute profit earned (totalPrice - totalCost)
  user: User;
  customer: Customer;
};

export type TaskAction =
  | { type: "added_task"; payload: { taskName: string } }
  | { type: "updated_task"; payload: { taskId: number; taskName: string } }
  | { type: "removed_task"; payload: { taskId: number } }
  | {
      type: "added_material";
      payload: {
        taskId: number;
      };
    }
  | {
      type: "updated_material";
      payload: {
        taskId: number;
        materialId: number;
        materialName: string;
        materialUnit: string;
        materialQuantity: number;
        materialUnitCost: number;
      };
    }
  | { type: "removed_material"; payload: { taskId: number; materialId: number } }
  | { type: "added_labor"; payload: { taskId: string } }
  | {
      type: "updated_labor";
      payload: {
        taskId: number;
        laborId: number;
        laborType: string;
        laborUnit: string;
        laborQuantity: number;
        laborUnitCost: number;
      };
    }
  | { type: "removed_labor"; payload: { taskId: number; laborId: number } }
  | {
      type: "added_additional";
      payload: {
        taskId: number;
      };
    }
  | {
      type: "updated_additional";
      payload: {
        taskId: number;
        additionalId: number;
        additionalType: string;
        additionalCost: number;
      };
    }
  | { type: "removed_additional"; payload: { taskId: number; additionalId: number } };

export type ProjectAction =
  | { type: "updated_project_name"; payload: { projectName: string } }
  | { type: "updated_total_profit"; payload: { totalProfit: number } }
  | { type: "updated_tasks"; payload: { tasks: Task[] } };
