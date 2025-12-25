import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

type AvatarUploadProps = {
  value?: File;
  onChange: (file: File) => void;
  defaultAvatar?: string;
};

function AvatarUpload({ value, onChange, defaultAvatar }: AvatarUploadProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-24 w-24 rounded-full border-2 border-dashed border-[var(--primary)] flex items-center justify-center overflow-hidden bg-muted">
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        ) : defaultAvatar ? (
          <img
            src={defaultAvatar}
            alt="default avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs text-muted-foreground">Upload</span>
        )}
      </div>

      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onChange(e.target.files[0]);
            }
          }}
        />
        <span className="text-sm font-medium text-[var(--primary)] hover:underline">
          Upload Avatar
        </span>
      </label>
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarUpload };
