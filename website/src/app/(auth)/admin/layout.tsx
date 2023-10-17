"use client";

import { PropsWithChildren } from "react";
import { Layout as BaseLayout, Button, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const routeSegment = pathname.split("/").slice(0, 4).join("/");

  return (
    <BaseLayout hasSider>
      <BaseLayout.Sider
        trigger={null}
        className="sider"
        collapsible
        style={{
          display: "block",
          backgroundColor: "#FFF",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          style={{ minHeight: "100vh" }}
          selectedKeys={[routeSegment]}
          mode="inline"
          onClick={({ key }) => router.push(key)}
          items={[
            {
              label: "Dashboard",
              key: "/admin",
            },
            {
              label: "Daftar Pos",
              key: "/admin/river-observation",
            },
            {
              label: "Data",
              key: "#",
              children: [
                {
                  label: "Pos Curah Hujan",
                  key: "/admin/data/rainfall",
                },
                {
                  label: "Pos Duga Air",
                  key: "/admin/data/waterlevel",
                },
                {
                  label: "Pos Klimatologi",
                  key: "/admin/data/climate",
                },
              ],
            },
            {
              label: "Daftar User",
              key: "/admin/user",
            },
          ]}
        />
      </BaseLayout.Sider>

      <BaseLayout style={{ minHeight: "100vh" }}>
        <BaseLayout.Header className="flex items-center justify-between px-4">
          <Image src="/image/pu.png" width={40} height={40} alt="logo" />
          <Link href="/api/auth/signout">
            <Button>Logout</Button>
          </Link>
        </BaseLayout.Header>
        <main className="p-4">{children}</main>
      </BaseLayout>
    </BaseLayout>
  );
};

export default Layout;
