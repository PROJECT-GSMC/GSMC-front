import instance from "@repo/api/axios";

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
