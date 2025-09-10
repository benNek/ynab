import FileUpload from "./FileUpload.tsx";
import { useState } from "react";
import BankSelection from "@/components/BankSelection.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Bank } from "@/types/bank.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftRight } from "lucide-react";
import { convert } from "@/features/converter/converter-utils.ts";

export default function Converter() {
  const [content, setContent] = useState<string | null>(null);
  // TODO: load from custom preferences
  const [bank, setBank] = useState<Bank>(Bank.SWEDBANK);

  const handleFileUpload = async (file: File) => {
    setContent(await file.text());
  };

  const handleBikeSelectionChange = (bankSelection: Bank) => {
    setBank(bankSelection);
  };

  const handleConversion = () => {
    if (!content) {
      throw new Error("Missing uploaded file");
    }

    const result = convert(bank, content);
    download(result);
  };

  const hasContent = !!content;

  return (
    <section>
      <FileUpload onFileUpload={handleFileUpload} />
      {hasContent && (
        <div>
          <Separator className="my-8" />
          <BankSelection
            activeBank={bank}
            onBankSelectionChange={handleBikeSelectionChange}
          />
          <div className="mt-4">
            <Button onClick={handleConversion}>
              <ArrowLeftRight />
              Convert
            </Button>
          </div>
        </div>
      )}
    </section>
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
