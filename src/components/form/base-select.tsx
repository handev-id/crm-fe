import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OptionType = {
  label: string;
  value: string | number;
};

interface Props {
  label?: string;
  options: OptionType[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  message?: string;
  disabled?: boolean;
  contentClassName?: string;
  containerClassName?: string;
}

export function BaseSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  message,
  disabled,
  contentClassName,
  containerClassName,
}: Props) {
  return (
    <div className={cn("w-full space-y-1.5", containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <Select
        disabled={disabled}
        value={
          value !== null && value !== undefined ? String(value) : undefined
        }
        onValueChange={(v) => {
          const original =
            options.find((o) => String(o.value) === v)?.value ?? v;
          onChange?.(original);
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full mt-1 border-input py-5",
            message && "border-destructive"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          side="bottom"
          align="start"
          avoidCollisions={false}
          className={cn(
            "max-h-60 overflow-y-auto p-1 border-input",
            contentClassName
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              className="py-2"
            >
              <span className="truncate">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
