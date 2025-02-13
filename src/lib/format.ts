export function formatToDecimal(num: number | string, decimal: number = 2): number {
  const parsedNum = typeof num === "number" ? num : parseFloat(num);

  if (isNaN(parsedNum)) {
    throw new Error(`Invalid number input: ${num}`);
  }

  return Number(parsedNum.toFixed(decimal));
}

export function formatToDecimalCost(num: number | string, decimal: number = 2): string {
  return formatToDecimal(num, decimal).toLocaleString(undefined, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
}
