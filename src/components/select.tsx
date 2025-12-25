import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import { Button } from "./ui/button";

export type OptionType = {
  label: string;
  value: string | number;
};

interface Props {
  label?: string;
  options: OptionType[];
  value?: string | number | (string | number)[] | null;
  onChange?: (value: any) => void;
  placeholder?: string;
  message?: string;
  disabled?: boolean;
  isMulti?: boolean;
}

export function BaseSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  message,
  disabled,
  isMulti = false,
}: Props) {
  // @ts-ignore
  const values = React.useMemo<(string | number)[]>(() => {
    if (isMulti) return Array.isArray(value) ? value : [];
    return value !== null && value !== undefined ? [value] : [];
  }, [value, isMulti]);

  const toggleValue = (v: string | number) => {
    if (!isMulti) {
      onChange?.(v);
      return;
    }

    const exists = values.includes(v);
    const next = exists ? values.filter((x) => x !== v) : [...values, v];

    onChange?.(next);
  };

  const selectedLabels = options
    .filter((o) => values.includes(o.value))
    .map((o) => o.label)
    .join(", ");

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              message && "border-destructive"
            )}
          >
            <span className="truncate text-left">
              {selectedLabels || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandGroup>
              {options.map((option) => {
                const checked = values.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        checked ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
