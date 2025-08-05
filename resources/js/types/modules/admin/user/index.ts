import { IUser } from "@/types/shared";
import { TPaginationResponse } from "@/types/shared/response";

export type TPaginatedUserResponse = TPaginationResponse<IUser>;

export type TUserForm = {
  name: string;
  email: string;
  password: string;
};
