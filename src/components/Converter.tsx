import FileUpload from "./FileUpload.tsx";
import { useState } from "react";
import BankSelection from "@/components/BankSelection.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Bank } from "@/types/bank.ts";
import { Button } from "@/components/ui/button.tsx";
import { FileDown } from "lucide-react";
import { convert } from "@/features/converter/converter-utils.ts";
import PrivacyNotice from "@/components/PrivacyNotice.tsx";
import ConvertedTransactions from "@/components/ConvertedTransactions.tsx";
import ImportGuidelines from "@/components/ImportGuidelines.tsx";
import ConversationErrorAlert from "@/components/ConversionErrorAlert.tsx";

export default function Converter() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  // TODO: load from custom preferences
  const [bank, setBank] = useState<Bank>(Bank.SWEDBANK);
  const [converted, setConverted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    const fileContent = await file.text();
    setFileName(file.name);
    setContent(fileContent);
    handleConversion(fileContent, bank);
  };

  const handleBankSelectionChange = (bankSelection: Bank) => {
    setBank(bankSelection);
    handleConversion(content, bankSelection);
  };

  const handleConversion = (fileContent: string | null, bank: Bank) => {
    if (!fileContent) {
      throw new Error("Missing uploaded file");
    }

    // TODO: store transactions in here
    try {
      const result = convert(bank, fileContent);
      setConverted(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setConverted(null);
    }
  };

  const handleDownload = () => {
    download(converted);
  };

  const hasContent = !!content;

  return (
    <section>
      <div className="my-4">
        <PrivacyNotice />
      </div>
      <FileUpload uploadedFile={fileName} onFileUpload={handleFileUpload} />
      {hasContent && (
        <div>
          <Separator className="my-8" />
          {!!error && <ConversationErrorAlert message={error} />}
          {!error && <ImportGuidelines />}
          <div className="mt-4 flex items-center justify-between">
            {!error && (
              <Button onClick={handleDownload}>
                <FileDown />
                Download
              </Button>
            )}
            <BankSelection
              activeBank={bank}
              onBankSelectionChange={handleBankSelectionChange}
            />
          </div>
          {!error && (
            <div className="mt-4">
              <ConvertedTransactions data={converted} />
            </div>
          )}
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
