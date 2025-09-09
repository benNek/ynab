import FileUpload from "./FileUpload.tsx";
import { SwedbankConverter } from "../features/converter/swedbank-converter.ts";

export default function Converter() {
  const handleFileUpload = async (file: File) => {
    const content = await file.text();
    const result = new SwedbankConverter().convert(content);
    download(result);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
}

const download = (content: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `ynab-${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
