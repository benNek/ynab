import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FileUp } from "lucide-react";

type Props = {
  uploadedFile: string | null;
  onFileUpload: (file: File) => void;
};

export default function FileUpload({ uploadedFile, onFileUpload }: Props) {
  const onDrop = useCallback(async (files: File[]) => {
    if (files.length !== 1) {
      return;
    }

    onFileUpload(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    multiple: false,
    onDrop,
  });

  return (
    <Card
      {...getRootProps({ className: "dropzone" })}
      className="border-dashed shadow-none mx-auto"
    >
      <CardHeader>
        <CardTitle>Select file to convert to YNAB supported format</CardTitle>
        <CardDescription>Only .csv file are supported.</CardDescription>
      </CardHeader>
      <input {...getInputProps()} />
      <CardContent>
        <Button>
          <FileUp />
          Select files
        </Button>
      </CardContent>
      {!!uploadedFile && (
        <CardFooter>
          Selected file:
          <b>{uploadedFile}</b>
        </CardFooter>
      )}
    </Card>
  );
}
