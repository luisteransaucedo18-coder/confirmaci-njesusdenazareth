import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportToExcel(filename: string, rows: Record<string, unknown>[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToPdf(filename: string, title: string, rows: Record<string, unknown>[]) {
  const doc = new jsPDF();
  const columns = Object.keys(rows[0] ?? {});
  doc.text(title, 14, 15);
  autoTable(doc, {
    head: [columns],
    body: rows.map((row) => columns.map((column) => String(row[column] ?? ""))),
    startY: 22,
  });
  doc.save(`${filename}.pdf`);
}
