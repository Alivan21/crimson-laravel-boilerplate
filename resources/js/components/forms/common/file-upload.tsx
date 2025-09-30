import { FileText, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/clsx";

type FileUploadProps = {
  accept?: string;
  disabled?: boolean;
  file: File | string | null;
  maxSize?: number;
  multiple?: boolean;
  onFileChange: (file: File | null) => void;
};

type FilePreviewProps = {
  file: File | string;
  onRemove: (e: React.MouseEvent) => void;
  preview: string | null;
};

type EmptyStateProps = {
  isDragActive: boolean;
};

/**
 * Utility functions
 */
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const normalizeDropzoneAccept = (value?: string): Accept | undefined => {
  if (!value || value.trim() === "" || value === "*/*") return undefined;
  // Avoid passing extension-only patterns or lists to prevent dropzone warnings
  if (value.includes(",") || value.trim().startsWith(".")) return undefined;
  return { [value]: [] } as Accept;
};

const getPreviewUrl = (file: string): string => {
  return file.startsWith("http") || file.startsWith("/") ? file : `/storage/${file}`;
};

const getFileDisplayName = (file: File | string): string => {
  return typeof file === "string" ? "Existing image" : file.name;
};

const getFileDisplayInfo = (file: File | string): string => {
  if (typeof file === "string") return "Existing file";
  return `${formatFileSize(file.size)}${file.type ? ` • ${file.type}` : ""}`;
};

const getFileTitle = (file: File | string): string => {
  return typeof file === "string" ? getPreviewUrl(file) : file.name;
};

/**
 * Custom hook for managing file preview
 */
const useFilePreview = (file: File | string | null) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    // Handle string URLs
    if (typeof file === "string") {
      setPreview(getPreviewUrl(file));
      return;
    }

    // Handle File objects with image type
    if (file.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return preview;
};

/**
 * Sub-components
 */
const EmptyState = ({ isDragActive }: EmptyStateProps) => (
  <p className="text-gray-500">
    {isDragActive ? "Drop the file here..." : "Drag & drop a file, or click to select"}
  </p>
);

const FilePreview = ({ file, onRemove, preview }: FilePreviewProps) => (
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
        onClick={onRemove}
        variant="destructive"
      >
        <X className="size-4" />
      </Button>
    </div>
    <div className="text-sm">
      <p className="max-w-[16rem] truncate font-medium text-gray-900" title={getFileTitle(file)}>
        {getFileDisplayName(file)}
      </p>
      <p className="text-gray-600">{getFileDisplayInfo(file)}</p>
      <p className="mt-1 text-xs text-gray-500">Click to replace</p>
    </div>
  </div>
);

/**
 * Main component
 */
export function FileUpload({
  accept = "image/*",
  disabled = false,
  file,
  maxSize = 2 * 1024 * 1024, // 2MB default
  multiple = false,
  onFileChange,
}: FileUploadProps) {
  const preview = useFilePreview(file);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("File type not supported or file is too large.");
        return;
      }

      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        onFileChange(selectedFile);
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: normalizeDropzoneAccept(accept),
    disabled,
    maxSize,
    multiple,
    onDrop,
  });

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFileChange(null);
    },
    [onFileChange],
  );

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
        <FilePreview file={file} onRemove={handleRemoveFile} preview={preview} />
      ) : (
        <EmptyState isDragActive={isDragActive} />
      )}
    </div>
  );
}
