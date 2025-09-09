import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  onFileUpload: (file: File) => void;
};

export default function FileUpload({ onFileUpload }: Props) {
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
      className="border-dashed shadow-none mx-auto lg:w-1/2 xl::w-1/3"
    >
      <CardHeader>
        <CardTitle>Select file to convert to YNAB supported format</CardTitle>
        <CardDescription>Only .csv file are supported.</CardDescription>
      </CardHeader>
      <input {...getInputProps()} />
      <CardFooter>
        <Button>Select files</Button>
      </CardFooter>
    </Card>
  );
}
