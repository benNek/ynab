import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Info } from "lucide-react";

export default function ImportGuidelines() {
  return (
    <Alert variant="default">
      <Info />
      <AlertTitle>Import Guidelines</AlertTitle>
      <AlertDescription>
        Clicking the "Download" button below sends a YNAB suited csv file to
        your device. <br />
        Follow the instructions in the link to see how the transactions are
        imported.
        <a
          target="_blank"
          href="https://support.ynab.com/en_us/file-based-import-a-guide-Bkj4Sszyo"
        >
          Read more on File-Based Import Guidelines for YNAB
        </a>
      </AlertDescription>
    </Alert>
  );
}
