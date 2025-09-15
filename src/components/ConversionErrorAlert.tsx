import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { FileWarning } from "lucide-react";

type Props = {
  message: string;
};

export default function ConversationErrorAlert({ message }: Props) {
  return (
    <Alert variant="default">
      <FileWarning />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>
        <p>
          Try selecting a different bank that the report was generated for.{" "}
          <br />
          If the problem persists, report the issue in the{" "}
          <a target="_blank" href="https://github.com/benNek/ynab/issues">
            Github Issue Tracker page
          </a>
        </p>
      </AlertDescription>
    </Alert>
  );
}
