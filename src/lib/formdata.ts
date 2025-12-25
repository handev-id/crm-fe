export function appendFormData(formData: FormData, key: string, value: any) {
  if (value === null || value === undefined) return;

  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      appendFormData(formData, `${key}[${i}]`, v);
    });
    return;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      appendFormData(formData, `${key}[${k}]`, v);
    });
    return;
  }

  formData.append(key, String(value));
}
