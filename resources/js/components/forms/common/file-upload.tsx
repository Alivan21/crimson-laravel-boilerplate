import React, { useCallback, useEffect, useState } from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/clsx";
import { FileText, X } from "lucide-react";

type FileUploadProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  multiple?: boolean;
};

export function FileUpload({
  file,
  onFileChange,
  accept = "image/*",
  maxSize = 2 * 1024 * 1024, // 2MB
  disabled = false,
  multiple = false,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const normalizeDropzoneAccept = (value?: string): Accept | undefined => {
    if (!value || value.trim() === "" || value === "*/*") return undefined;
    // If value is a list or extension-only pattern, avoid passing to dropzone to prevent warnings
    if (value.includes(",") || value.trim().startsWith(".")) return undefined;
    return { [value]: [] } as Accept;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("File type not supported or file is too large.");
        return;
      }

      const selectedFile = acceptedFiles[0];
      onFileChange(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    },
    [onFileChange],
  );

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    if (file.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: normalizeDropzoneAccept(accept),
    maxSize,
    multiple,
    disabled,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    setPreview(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors",
        isDragActive && "border-blue-500 bg-blue-50",
        file && !isDragActive && "border-solid border-green-500 bg-green-50",
        disabled && "cursor-not-allowed bg-gray-100",
      )}
    >
      <input {...getInputProps({ accept: accept === "*/*" ? undefined : accept })} />
      {file ? (
        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <div className="relative flex items-center justify-center">
            {preview ? (
              <img
                alt="Preview"
                className="mb-1 size-24 rounded-lg object-cover shadow-sm ring-1 ring-black/5"
                src={preview}
              />
            ) : (
              <div className="mb-1 flex size-24 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
            )}
            <Button
              className="absolute top-0 right-0 size-6 translate-x-2 -translate-y-2"
              onClick={handleRemoveFile}
              variant="destructive"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="text-sm">
            <p className="max-w-[16rem] truncate font-medium text-gray-900" title={file.name}>
              {file.name}
            </p>
            <p className="text-gray-600">
              {formatFileSize(file.size)}
              {file.type ? ` • ${file.type}` : ""}
            </p>
            <p className="mt-1 text-xs text-gray-500">Click to replace</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          {isDragActive ? "Drop the file here..." : "Drag & drop a file, or click to select"}
        </p>
      )}
    </div>
  );
}
