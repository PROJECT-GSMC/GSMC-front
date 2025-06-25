"use client";

import type { Member } from "@repo/types/member";
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface MemberContextType {
  member: Member | undefined;
  setMember: (member: Member) => void;
}

const MemberContext = createContext<MemberContextType>({
  member: undefined,
  setMember: () => {
    throw new Error("MemberContext not initialized");
  },
});

const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMember] = useState<Member | undefined>();
  const value = useMemo(() => ({ member, setMember }), [member]);
  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};

const useMember = (): MemberContextType => {
  const context = useContext(MemberContext);
  return context;
};

export { MemberProvider, useMember };
