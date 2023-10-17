import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-[8rem] pb-32 mx-auto max-w-[1244px]">{children}</main>
      <Footer className="bg-blue-900" />
    </>
  );
};

export default Layout;
