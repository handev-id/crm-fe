import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { BaseSelect } from "./base-select";

interface Props {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
}

const countryCodes = [
  { code: "62", flag: "🇮🇩" },
  { code: "1", flag: "🇺🇸" },
  { code: "44", flag: "🇬🇧" },
  { code: "65", flag: "🇸🇬" },
  { code: "60", flag: "🇲🇾" },
  { code: "86", flag: "🇨🇳" },
  { code: "81", flag: "🇯🇵" },
  { code: "82", flag: "🇰🇷" },
  { code: "91", flag: "🇮🇳" },
  { code: "61", flag: "🇦🇺" },
];

const normalizePhone = (v: string) => v.replace(/\D/g, "").replace(/^0+/, "");

const findCountryFromValue = (value: string) =>
  [...countryCodes]
    .sort((a, b) => b.code.length - a.code.length)
    .find((c) => value.startsWith(c.code));

const PhoneInput = ({
  label = "Phone",
  value = "",
  onChange,
  defaultCountry,
}: Props) => {
  const [countryCode, setCountryCode] = useState<string>("62");
  const [phoneNumber, setPhoneNumber] = useState("");

  const syncing = useRef(false);

  useEffect(() => {
    syncing.current = true;

    if (!value) {
      setPhoneNumber("");
      syncing.current = false;
      return;
    }

    const matched = findCountryFromValue(value);

    if (matched) {
      setCountryCode(matched.code);
      setPhoneNumber(normalizePhone(value.slice(matched.code.length)));
    } else {
      setPhoneNumber(normalizePhone(value));
    }

    syncing.current = false;
  }, [value]);

  useEffect(() => {
    if (defaultCountry) {
      const matched = countryCodes.find((c) => c.code === defaultCountry);
      if (matched) {
        setCountryCode(matched.code);
      }
    }
  }, [defaultCountry]);

  const emit = (cc: string, phone: string) => {
    if (syncing.current) return;
    onChange(phone ? `${cc}${phone}` : "");
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div className="flex gap-2 w-full">
        <BaseSelect
          containerClassName="w-[150px]"
          options={countryCodes.map((c) => ({
            value: c.code,
            label: `${c.flag} +${c.code}`,
          }))}
          value={countryCode}
          onChange={(v) => {
            setCountryCode(v as string);
            emit(v as string, phoneNumber);
          }}
        />

        <Input
          type="tel"
          inputMode="numeric"
          placeholder="8123456789"
          value={phoneNumber}
          onChange={(e) => {
            const v = normalizePhone(e.target.value);
            setPhoneNumber(v);
            emit(countryCode, v);
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
