import { IPaginationResponse, IUser } from "@/types/shared";

export type TPaginatedUserResponse = IPaginationResponse<IUser>;

export type TUserForm = {
  name: string;
  email: string;
  password: string;
};
