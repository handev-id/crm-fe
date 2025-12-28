import { useApi } from "@/api/api";
import {
  whatsappDeviceCreateApi,
  whatsappDeviceDeleteApi,
  whatsappDeviceIndexApi,
  whatsappDeviceUpdateApi,
} from "@/api/endpoints/whatsapp";
import { WhatsappDevice } from "@/api/models/whatsapp-device";
import { DataGrid } from "@/components/data-grid";
import { BaseSelect } from "@/components/form/base-select";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConfirm from "@/hooks/use-alert";
import useModal from "@/hooks/use-modal";
import useQueryParams from "@/hooks/use-queryparams";
import { Pencil, Plus, QrCode, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SettingWhatsappQrCode from "./qrcode";

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

export default function SettingWhatsappDevice() {
  const queryParams = useQueryParams();
  const deviceModal = useModal();
  const confirm = useConfirm();

  const deviceIndex = useApi({
    api: whatsappDeviceIndexApi,
  });

  const fetchDevices = () => {
    deviceIndex.process({
      page: Number(queryParams.get("page") || 1),
      search: queryParams.get("search") || "",
    });
  };

  const deviceCreate = useApi({
    api: whatsappDeviceCreateApi,
    onSuccess: () => {
      deviceModal.setOpen(false);
      reset();
      fetchDevices();
    },
  });

  const deviceUpdate = useApi({
    api: whatsappDeviceUpdateApi,
    onSuccess: () => {
      deviceModal.setOpen(false);
      reset();
      fetchDevices();
    },
  });

  const deviceDelete = useApi({
    api: whatsappDeviceDeleteApi,
    onSuccess: () => {
      fetchDevices();
    },
  });

  const onDelete = async (id: number) => {
    const ok = await confirm();

    if (ok) {
      toast.promise(deviceDelete.process(id), {
        loading: "Deleting device...",
        success: "Device deleted successfully",
      });
    }

    deviceModal.setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Partial<WhatsappDevice>>();

  const onSubmit = (data: Partial<WhatsappDevice>) => {
    toast.promise((data.id ? deviceUpdate : deviceCreate).process(data), {
      loading: "Saving device...",
      success: "Device saved successfully",
    });
  };

  useEffect(() => {
    fetchDevices();
  }, [queryParams.params]);

  useEffect(() => {
    if (!deviceModal.open) {
      reset({
        id: 0,
        name: "",
        countryCode: "",
        phone: "",
      });
    }
  }, [deviceModal.open]);

  return (
    <>
      <DataGrid
        data={deviceIndex.data?.data || []}
        columns={[
          "indexing",
          { key: "name", label: "Name" },
          { key: "whatsappId", label: "Phone" },
          { key: "status", label: "Status" },
          {
            key: null,
            label: "Actions",
            render: (_, i) => {
              const data = deviceIndex.data?.data[i];

              return (
                <div className="flex gap-2">
                  <SettingWhatsappQrCode
                    whatsappId={data?.whatsappId!}
                    refetchDevices={() => deviceIndex.process({})}
                    status={data?.status!}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      deviceModal.setOpen(true);
                      reset(data);
                    }}
                    className="text-[var(--primary)]"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete(data?.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            },
          },
        ]}
        limit={deviceIndex.data?.meta.perPage}
        buttons={
          <Button onClick={() => deviceModal.setOpen(true)}>
            <Plus />
            Add Device
          </Button>
        }
        loading={deviceIndex.isLoading}
        pageTotal={deviceIndex.data?.meta.lastPage}
        initialPage={Number(queryParams.get("page") || 1)}
        onPageChanged={(page) => {
          queryParams.update({ page });
        }}
        onSearch={(value) => {
          queryParams.update({ search: value, page: 1 });
        }}
      />

      <Modal modal={deviceModal} title="Add WhatsApp Device">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Name"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Device name"
              message={errors.name?.message}
            />

            <div className="flex gap-2">
              <Controller
                name="countryCode"
                control={control}
                rules={{ required: "CountryCode is required" }}
                render={({ field: { value, onChange } }) => (
                  <BaseSelect
                    label="Country Code"
                    options={countryCodes.map((c) => ({
                      label: `${c.flag} +${c.code}`,
                      value: c.code,
                    }))}
                    value={value}
                    onChange={onChange}
                    message={errors.countryCode?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="8123456789"
                    value={value}
                    onChange={(e) => {
                      const v = normalizePhone(e.target.value);
                      onChange(v);
                    }}
                    className="flex-1"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="submit" className="bg-[var(--primary)]">
              Save Device
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
