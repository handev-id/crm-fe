import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type OptionType = {
  label: string;
  value: string;
};

interface Props {
  label?: string;
  options: OptionType[];
  value?: string | string[] | number | number[] | null;
  message?: string;
  icon?: React.ReactNode;
}

export function BaseSelect({ label, options, icon, value, message }: Props) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div className="relative mt-1">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(options || []).map((option) => (
                <SelectItem value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
