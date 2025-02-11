interface MaterialProps {
  taskId: number;
  materialId: number;
  onChange: (taskId: number, materialId: number, field: string, value: string | number) => void;
}

export default function Material({ taskId, materialId, onChange }: MaterialProps) {
  return (
    <div key={material.id} className="mb-2 border p-2">
      <input
        type="text"
        placeholder="Material Name"
        className="w-1/3 border p-2"
        value={material.name}
        onChange={(e) => onChange(taskId, materialId, "name", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Units"
        className="w-1/4 border p-2"
        value={material.unitCount}
        onChange={(e) => onChange(taskId, materialId, "unitCount", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Price/Unit"
        className="w-1/4 border p-2"
        value={material.pricePerUnit}
        onChange={(e) => onChange(taskId, materialId, "pricePerUnit", +e.target.value)}
      />
    </div>
  );
}
