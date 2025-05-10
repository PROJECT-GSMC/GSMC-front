import instance from "node_modules/@repo/ui/src/axios";

import type { ChangePasswordProps } from "../model/changePWForm";

export const patchPassword = async ({
  email,
  newPassword,
}: ChangePasswordProps) => {
  return instance.patch(`/password-change`, {
    email,
    newPassword,
  });
};
