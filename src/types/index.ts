export type Material = {
  id: string;
  name: string;
  // unit: string;
  // quantity: number;
  // unitCost: number;
  cost: number; // quantity * unitCost
};

export type Labor = {
  id: string;
  // role: string;
  duration: string; // => unit
  // quantity: number;
  // unitCost: number;
  cost: number; // quantity * unitCost
};

export type Additional = {
  id: string;
  name: string; // => type
  cost: number;
};

export type Task = {
  id: string;
  name: string;
  materials: Material[];
  labors: Labor[];
  additional: Additional[];
  totalCost: number;
  // profitMargin: numbers; // decimals
  // totalPrice: numbers; // totalCost / (1 - profitMargin)
};

// export type User = {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
// };

// export type Customer = {
//   id: string;
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
// };

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
  // totalCost: numbers;
  marginPercentage: number; // => profitMargin: decimals
  // totalPrice: number; // totalCost / (1 - profitMargin)
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
        materialCost: number;
      };
    }
  | { type: "removed_material"; payload: { taskId: number; materialId: number } }
  | { type: "added_labor"; payload: { taskId: string } }
  | {
      type: "updated_labor";
      payload: {
        taskId: number;
        laborId: number;
        laborDuration: string;
        laborCost: number;
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
        additionalName: string;
        additionalCost: number;
      };
    }
  | { type: "removed_additional"; payload: { taskId: number; additionalId: number } };

export type ProjectAction =
  | { type: "updated_project_name"; payload: { projectName: string } }
  | { type: "updated_profit"; payload: { profitPercentage: number } }
  | { type: "updated_tasks"; payload: { tasks: Task[] } };
