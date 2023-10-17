import { PropsWithChildren } from "react";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/next-auth";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto w-full sm:w-[640px]">
      <div className="flex justify-between items-center px-4 bg-blue-900 h-[200px]">
        <div className="text-white">
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <p className="mb-2">{session?.user?.email || "Loading..."}</p>
          <Link className="bg-blue-600" href="/api/auth/signout">
            <Button>Logout</Button>
          </Link>
        </div>
        <Image src="/image/mobile.png" width={160} height={160} alt="mobile" />
      </div>
      <main className="p-4 min-h-[100vh]">{children}</main>
      <div className="text-white p-4 bg-blue-900">
        <Image
          className="mx-auto"
          src="/image/footer.png"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          alt="logo"
        />
        <div className="font-bold text-lg">Kontak Kami</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="font-bold">Kantor Pusat</div>
            Jl. Pasir Putih No. 65 Tarakan Kalimantan Utara, Indonesia
          </div>
          <div>
            <div className="font-bold">Email</div> hidrologi_bwskv@gmail.com
          </div>
          <div>
            <div className="font-bold">Phone</div>0812 5533 9011
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1991.5505816747989!2d117.5804866206247!3d3.3251770083128855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3214753e0c442731%3A0xa02413239a7f442b!2sBalai%20Wilayah%20Sungai%20Kalimantan%20V!5e0!3m2!1sid!2sid!4v1643277840609!5m2!1sid!2sid"
          style={{ width: "100%", height: "260px" }}
          allowFullScreen={true}
        />
      </div>
    </div>
  );
};

export default Layout;
