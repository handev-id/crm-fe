import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  modal: {
    open: boolean;
    setOpen: (v: boolean) => void;
  };
  onClose?: () => void;
}

export function Modal({ children, title, description, modal, onClose }: Props) {
  useEffect(() => {
    if (!modal.open && onClose) {
      onClose();
    }
  }, [modal.open]);
  return (
    <Dialog open={modal.open} onOpenChange={modal.setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
