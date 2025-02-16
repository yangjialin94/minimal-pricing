import { Task } from "@/types";

export function calculateTotalCost(tasks: Task[]) {
  return tasks.reduce((total, task) => {
    const materialCost = task.materials.reduce((sum, material) => sum + material.cost, 0);
    const laborCost = task.labors.reduce((sum, labor) => sum + labor.cost, 0);
    const additionalCost = task.additional.reduce((sum, add) => sum + add.cost, 0);

    return total + materialCost + laborCost + additionalCost;
  }, 0);
}
