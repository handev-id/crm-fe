import { useApi } from "@/api/api";
import {
  userCreateApi,
  userDeleteApi,
  userIndexApi,
  userUpdateApi,
} from "@/api/endpoints/user";
import { Attachment } from "@/api/models/attachment";
import { User } from "@/api/models/user";
import { DataGrid } from "@/components/data-grid";
import { Modal } from "@/components/modal";
import { BaseSelect } from "@/components/select";
import { AvatarUpload } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConfirm from "@/hooks/use-alert";
import useModal from "@/hooks/use-modal";
import useQueryParams from "@/hooks/use-queryparams";
import { userRoles } from "@/hooks/use-user";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SettingUser() {
  const queryParams = useQueryParams();
  const userModal = useModal();
  const confirm = useConfirm();

  const userIndex = useApi({
    api: userIndexApi,
  });

  const fetchUsers = () => {
    userIndex.process({
      page: Number(queryParams.get("page") || 1),
      search: queryParams.get("search") || "",
    });
  };

  const userCreate = useApi({
    api: userCreateApi,
    onSuccess: () => {
      userModal.setOpen(false);
      reset();
      fetchUsers();
    },
  });

  const userUpdate = useApi({
    api: userUpdateApi,
    onSuccess: () => {
      userModal.setOpen(false);
      reset();
      fetchUsers();
    },
  });

  const userDelete = useApi({
    api: userDeleteApi,
    onSuccess: () => {
      fetchUsers();
    },
  });

  const onDelete = async (id: number) => {
    const ok = await confirm();

    if (ok) {
      toast.promise(userDelete.process(id), {
        loading: "Deleting user...",
        success: "User deleted successfully",
      });
    }

    userModal.setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Partial<User>>({
    defaultValues: {
      roles: [],
    },
  });

  const onSubmit = (data: Partial<User>) => {
    toast.promise((data.id ? userUpdate : userCreate).process(data), {
      loading: "Creating user...",
      success: "User created successfully",
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [queryParams.params]);

  useEffect(() => {
    if (!userModal.open) {
      reset({
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        roles: [],
        password: "",
        avatar: undefined,
      });
    }
  }, [userModal.open]);

  return (
    <>
      <DataGrid
        data={userIndex.data?.data || []}
        columns={[
          "indexing",
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "username", label: "Username" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          {
            key: null,
            label: "Actions",
            render: (_, i) => {
              const data = userIndex.data?.data[i];

              return (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      userModal.setOpen(true);
                      reset(data);
                    }}
                    className="text-[var(--primary)] hover:bg-[color-mix(in_oklch,var(--primary),white_90%)]"
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
        limit={userIndex.data?.meta.perPage}
        buttons={
          <Button onClick={() => userModal.setOpen(true)}>Tambah</Button>
        }
        loading={userIndex.isLoading}
        pageTotal={userIndex.data?.meta.lastPage}
        initialPage={Number(queryParams.get("page") || 1)}
        onPageChanged={(page) => {
          queryParams.update({ page });
        }}
        onSearch={(value) => {
          queryParams.update({ search: value, page: 1 });
        }}
      />

      <Modal modal={userModal} title="Add User">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AvatarUpload
            value={watch("avatar") as File}
            onChange={(file) => setValue("avatar", file)}
            defaultAvatar={(watch("avatar") as Attachment)?.url}
          />

          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
              Basic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter first name"
                message={errors.firstName?.message}
              />

              <Input
                label="Last Name"
                {...register("lastName")}
                placeholder="Enter last name"
              />

              <Input
                label="Phone"
                {...register("phone")}
                placeholder="Enter phone number"
              />

              <Input
                label="Email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
              />

              <Controller
                control={control}
                name="roles"
                render={({ field, fieldState }) => (
                  <BaseSelect
                    label="Roles"
                    options={userRoles}
                    value={field.value}
                    onChange={field.onChange}
                    isMulti
                    placeholder="Select roles"
                    message={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
              Account Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Username"
                {...register("username", {
                  required: "Username is required",
                })}
                placeholder="Enter username"
                message={errors.username?.message}
              />

              <Input
                label="Password"
                type="password"
                {...register("password")}
                placeholder="Enter password"
                message={errors.password?.message}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="submit" className="bg-[var(--primary)]">
              Save User
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
