import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { createContext, ReactNode, useContext, useState } from "react";

type ConfirmDeleteOptions = {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmDeleteContextType = {
  show: (options: ConfirmDeleteOptions) => void;
};

const ConfirmDeleteContext = createContext<ConfirmDeleteContextType | null>(null);

// Global instance to hold the context methods
let globalConfirmDelete: ConfirmDeleteContextType | null = null;

type ConfirmDeleteProviderProps = {
  children: ReactNode;
};

export function ConfirmDeleteProvider({ children }: ConfirmDeleteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ConfirmDeleteOptions>({
    title: "",
    description: "",
    onConfirm: () => {},
    confirmText: "Delete",
    cancelText: "Cancel",
  });

  const show = (newOptions: ConfirmDeleteOptions) => {
    setOptions({
      confirmText: "Delete",
      cancelText: "Cancel",
      ...newOptions,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isProcessing) return;
    setIsOpen(false);
    setIsProcessing(false);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await options.onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const contextValue = { show };

  globalConfirmDelete = contextValue;

  return (
    <ConfirmDeleteContext.Provider value={contextValue}>
      {children}
      <AlertDialog onOpenChange={handleClose} open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            <AlertDialogDescription>{options.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing} onClick={handleClose}>
              {options.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              disabled={isProcessing}
              onClick={handleConfirm}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                options.confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDeleteContext.Provider>
  );
}

export const ConfirmDelete = {
  show: (options: ConfirmDeleteOptions) => {
    if (!globalConfirmDelete) {
      throw new Error("ConfirmDelete.show must be used within a ConfirmDeleteProvider");
    }
    globalConfirmDelete.show(options);
  },
};

export function useConfirmDelete() {
  const context = useContext(ConfirmDeleteContext);
  if (!context) {
    throw new Error("useConfirmDelete must be used within a ConfirmDeleteProvider");
  }
  return context;
}

export type { ConfirmDeleteOptions };
