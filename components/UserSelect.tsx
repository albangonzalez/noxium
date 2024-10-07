"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";

import { User } from "@/models/User";

export default function UserSelect({
  value,
  setValue,
}: {
  value: Selection;
  setValue: Dispatch<SetStateAction<Selection>>;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/users/`)
      .then((res) => res.json())
      .then((json) => { setUsers(json.data); setIsLoading(false) });
  }, []);

  return (
    <Select
      items={users}
      label="User"
      name="madeBy"
      selectedKeys={value}
      size="lg"
      onSelectionChange={setValue}
      isLoading={isLoading}
    >
      {users.map((user: User) => (
        <SelectItem
          key={user.id}
          textValue={user.firstName}
        >
          {user.firstName}
        </SelectItem>
      ))}
    </Select>
  );
}
