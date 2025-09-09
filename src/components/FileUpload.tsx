import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}
