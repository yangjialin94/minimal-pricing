interface MaterialProps {
  taskId: number;
  materialId: number;
  onChange: (taskId: number, materialId: number, field: string, value: string | number) => void;
}

export default function Material({ taskId, materialId, onChange }: MaterialProps) {
  return (
    <div key={material.id} className="border p-2 mb-2">
      <input
        type="text"
        placeholder="Material Name"
        className="border p-2 w-1/3"
        value={material.name}
        onChange={(e) => onChange(taskId, materialId, "name", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Units"
        className="border p-2 w-1/4"
        value={material.unitCount}
        onChange={(e) => onChange(taskId, materialId, "unitCount", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Price/Unit"
        className="border p-2 w-1/4"
        value={material.pricePerUnit}
        onChange={(e) => onChange(taskId, materialId, "pricePerUnit", +e.target.value)}
      />
    </div>
  );
}
