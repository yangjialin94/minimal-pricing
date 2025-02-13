export type Material = {
  id: number;
  name: string;
  cost: number;
};

export type Labor = {
  id: number;
  duration: string;
  cost: number;
};

export type Additional = {
  id: number;
  name: string;
  cost: number;
};

export type Task = {
  id: number;
  name: string;
  materials: Material[];
  labors: Labor[];
  additional: Additional[];
  totalCost: number;
};

export type Project = {
  id: number;
  name: string;
  tasks: Task[];
  marginPercentage: number;
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
