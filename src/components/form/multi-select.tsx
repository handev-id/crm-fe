import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Button } from "../ui/button";

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
  popoverClassName?: string;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  message,
  disabled,
  isMulti = false,
  popoverClassName = "w-[190px]",
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
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full">
            <Button
              type="button"
              disabled={disabled}
              variant="outline"
              className={cn(
                "w-full justify-between py-5 mt-1 border-input bg-transparent",
                message && "border-destructive"
              )}
            >
              <span className="truncate text-left">
                {selectedLabels || placeholder}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={4}
          className={`${popoverClassName} p-1 border-input`}
        >
          <Command>
            <CommandGroup>
              {options.map((option) => {
                const checked = values.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                    className="px-2 py-0"
                  >
                    <div
                      className={cn(
                        "flex w-full items-center justify-between gap-2 py-2",
                        "border-b border-border",
                        "last:border-b-0"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 shrink-0",
                          checked ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <span className="truncate">{option.label}</span>
                    </div>
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
