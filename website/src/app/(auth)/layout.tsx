"use client";

import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/utils/antd";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Layout;
