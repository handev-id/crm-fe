import { useApi } from "@/api/api";
import { userIndexApi } from "@/api/endpoints/user";
import { User } from "@/api/models/user";
import { DataGrid } from "@/components/data-grid";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryParams from "@/hooks/use-queryparams";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SettingUser() {
  const queryParams = useQueryParams();
  const userIndex = useApi({
    api: userIndexApi,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<User>>();

  const onSubmit = (data: Partial<User>) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    userIndex.process({
      page: Number(queryParams.get("page") || 1),
      search: queryParams.get("search") || "",
    });
  }, [queryParams.params]);

  return (
    <DataGrid
      data={userIndex.data?.data || []}
      columns={[
        "indexing",
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ]}
      limit={userIndex.data?.meta.perPage}
      buttons={
        <Modal title="Add User" trigger={<Button>Tambah</Button>}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                label="Username"
                {...register("username", { required: "Username is required" })}
                placeholder="Enter username"
                message={errors.username?.message}
              />

              <Input
                label="Email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
              />

              <Input
                label="Phone"
                {...register("phone")}
                placeholder="Enter phone number"
              />

              <Input
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter password"
                message={errors.password?.message}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Modal>
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
  );
}
