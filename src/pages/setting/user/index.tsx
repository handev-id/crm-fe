import { useApi } from "@/api/api";
import { userIndexApi } from "@/api/endpoints/user";
import { DataGrid } from "@/components/data-grid";
import { useEffect } from "react";

export default function SettingUser() {
  const userIndex = useApi({
    api: userIndexApi,
  });

  useEffect(() => {
    userIndex.process({});
  }, []);

  return (
    <DataGrid
      data={userIndex.data?.data || []}
      columns={[
        {
          key: "id",
          label: "ID",
        },
        {
          key: "firstName",
          label: "First Name",
        },
        {
          key: "lastName",
          label: "Last Name",
        },
        {
          key: "username",
          label: "Username",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "phone",
          label: "Phone",
        },
      ]}
      loading={userIndex.isLoading}
      onSearch={(data) => console.log(data)}
    />
  );
}
