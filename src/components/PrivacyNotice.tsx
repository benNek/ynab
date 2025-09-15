import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { ShieldAlert } from "lucide-react";

export default function PrivacyNotice() {
  return (
    <Alert variant="default">
      <ShieldAlert />
      <AlertTitle>Data Privacy</AlertTitle>
      <AlertDescription>
        All data processing happens in your browser and no data is collected or
        otherwise manipulated on the server. <br /> The product code is always
        available.
        <a target="_blank" href="https://github.com/benNek/ynab">
          Source Code
        </a>
      </AlertDescription>
    </Alert>
  );
}
