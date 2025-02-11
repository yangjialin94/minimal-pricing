interface LaborProps {
  taskId: number;
  laborId: number;
  onChange: (taskId: number, laborId: number, field: string, value: string | number) => void;
}

export default function Labor({ taskId, laborId, onChange }: LaborProps) {
  return (
    <div key={labor.id} className="mb-2 border p-2">
      <input
        type="number"
        placeholder="People"
        className="w-1/4 border p-2"
        value={labor.peopleCount}
        onChange={(e) => onChange(taskId, laborId, "peopleCount", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Days"
        className="w-1/4 border p-2"
        value={labor.daysCount}
        onChange={(e) => onChange(taskId, laborId, "daysCount", +e.target.value)}
      />
      <input
        type="number"
        placeholder="Price/Day"
        className="w-1/4 border p-2"
        value={labor.pricePerDay}
        onChange={(e) => onChange(taskId, laborId, "pricePerDay", +e.target.value)}
      />
    </div>
  );
}
