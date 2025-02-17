import { HousePlus, Package, Pickaxe, Plus } from "lucide-react";
import { useState } from "react";

import { useTasksDispatch } from "@/hooks/useTasksDispatch";

export default function AddItemButton({ taskId }: { taskId: string }) {
  const dispatch = useTasksDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Handle adding items
  const handleAddItem = (type: "material" | "labor" | "additional") => {
    dispatch({
      type: `added_${type}`,
      payload: { taskId },
    });
    setIsOpen(false); // Close menu after selection
  };

  return (
    <div className="relative flex justify-center">
      {/* Add Item Dropdown Button */}
      <button
        className="flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className="h-5 w-5" />
        <span className="whitespace-nowrap">Add Item</span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-12 flex flex-col gap-1 rounded-md border bg-white p-2 shadow-md">
          <button
            className="flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => handleAddItem("material")}
          >
            <Package className="h-5 w-5 text-blue-500" />
            <span>Add Material</span>
          </button>
          <button
            className="flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => handleAddItem("labor")}
          >
            <Pickaxe className="h-5 w-5 text-green-500" />
            <span>Add Labor</span>
          </button>
          <button
            className="flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => handleAddItem("additional")}
          >
            <HousePlus className="h-5 w-5 text-slate-500" />
            <span>Add Additional</span>
          </button>
        </div>
      )}
    </div>
  );
}
