import { HousePlus, Package, Pickaxe, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTasksDispatch } from "@/hooks/useTasksDispatch";

export default function AddItemButton({ taskId }: { taskId: string }) {
  const dispatch = useTasksDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle closing popover
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
      <div className="flex w-full justify-end">
        <button className="btn-primary px-3 py-2 text-sm" onClick={() => setIsOpen(!isOpen)}>
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Popover Menu */}
      {isOpen && (
        <div
          className="absolute bottom-14 flex w-48 flex-col gap-1 rounded-xl border border-neutral-400 bg-neutral-200 p-2 text-neutral-800 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
          ref={popoverRef}
        >
          <button
            className="flex items-center gap-2 rounded-xl bg-neutral-200 px-4 py-2 text-neutral-700 transition-all duration-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            onClick={() => handleAddItem("material")}
          >
            <Package className="h-5 w-5 text-blue-500" />
            <span>Add Material</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl bg-neutral-200 px-4 py-2 text-neutral-700 transition-all duration-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            onClick={() => handleAddItem("labor")}
          >
            <Pickaxe className="h-5 w-5 text-green-500" />
            <span>Add Labor</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl bg-neutral-200 px-4 py-2 text-neutral-700 transition-all duration-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
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
