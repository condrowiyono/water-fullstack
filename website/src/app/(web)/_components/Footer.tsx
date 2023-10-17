import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const Footer = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <section {...props}>
      <footer className="footer p-10 text-neutral-content max-w-[1244px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <aside className="mx-auto">
          <Image
            src="/image/footer.png"
            sizes="100vw"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            alt="logo"
          />
          <div>
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
          </div>
        </aside>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1991.5505816747989!2d117.5804866206247!3d3.3251770083128855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3214753e0c442731%3A0xa02413239a7f442b!2sBalai%20Wilayah%20Sungai%20Kalimantan%20V!5e0!3m2!1sid!2sid!4v1643277840609!5m2!1sid!2sid"
          style={{ width: "100%", height: "360px", border: 0 }}
          allowFullScreen={true}
        />
      </footer>
    </section>
  );
};

export default Footer;
