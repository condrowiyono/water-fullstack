"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const matchAny = (pathname: string, href: string) => {
  if (href === "/data") return pathname.startsWith("/data");
  if (href === "/map") return pathname.startsWith("/map");
  return pathname === href;
};

const menu = [
  { label: "Beranda", href: "/" },
  {
    label: "Data",
    href: "/data",
    children: [
      { label: "Pos Curah Hujan", href: "/data/rainfalls" },
      { label: "Pos Duga Air", href: "/data/waterlevels" },
      { label: "Pos Klimatologi", href: "/data/climates" },
    ],
  },
  {
    label: "Peta",
    href: "/map",
    children: [
      { label: "Peta Curah Hujan", href: "/map/rainfalls" },
      { label: "Peta Duga Air", href: "/map/waterlevels" },
      { label: "Peta Klimatologi", href: "/map/climates" },
    ],
  },
  {
    label: "Galeri",
    href: "/gallery",
  },
  {
    label: "Pedoman",
    href: "/guide",
  },
  {
    label: "Permohonan Informasi",
    href: "/request-information",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 fixed z-10 w-full shadow-lg">
      <div className="mx-auto max-w-[1244px] flex justify-between w-full items-center">
        <div className="flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu.map((item, index) => (
                <li key={index}>
                  {item.children ? (
                    <details>
                      <summary>{item.label}</summary>
                      <ul className="p-2">
                        {item.children.map((child, index) => (
                          <li key={index}>
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/">
            <Image src="/image/header.png" width={256} height={0} alt="logo" style={{ height: "auto" }} />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold uppercase">
            {menu.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <details>
                    <summary
                      className={`text-blue-900 border-b-4 border-solid${
                        matchAny(pathname, item.href) ? " border-blue-900" : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </summary>
                    <ul className="p-2 w-56">
                      {item.children.map((child, index) => (
                        <li key={index}>
                          <Link
                            className={`text-blue-900 no-underline border-solid ${
                              matchAny(pathname, child.href) ? "border-blue-900" : "border-transparent"
                            }`}
                            href={child.href}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    className={`text-blue-900 no-underline border-b-4 border-solid ${
                      matchAny(pathname, item.href) ? " border-blue-900" : "border-transparent"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
