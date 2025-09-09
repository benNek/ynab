import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

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
    <section className="container">
      <Card {...getRootProps({ className: "dropzone" })}>
        <CardHeader>
          <CardTitle>Select file to upload</CardTitle>
          <CardDescription>Only .csv files are supported.</CardDescription>
        </CardHeader>
        <input {...getInputProps()} />
      </Card>
    </section>
  );
}
