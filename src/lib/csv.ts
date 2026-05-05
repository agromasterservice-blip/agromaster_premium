export function csvEscape(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);

  return `"${text.replace(/"/g, '""')}"`;
}

export function buildCsv(headers: string[], rows: Array<Array<unknown>>) {
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => row.map(csvEscape).join(","))
  ];

  return `\uFEFF${lines.join("\r\n")}`;
}
