import { User } from "@/api/models/user";
import { create } from "zustand";

interface UserType {
  user: User | null;
  setUser: (user: User) => void;
}

const useUser = create<UserType>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export function getFullName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

export default useUser;
