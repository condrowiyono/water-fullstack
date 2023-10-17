import Image from "next/image";

const banner = [
  {
    id: "slide1",
    image: "/banner/banner1.webp",
    blur: "/banner/banner1-blur.webp",
    description: "Tim Hidrologi BWS Kalimantan V Melakukan Kunjungan Lapangan Di Pos Teluk Bayur",
  },
  {
    id: "slide2",
    image: "/banner/banner2.webp",
    blur: "/banner/banner2-blur.webp",
    description: "",
  },
  {
    id: "slide3",
    image: "/banner/banner3.webp",
    blur: "/banner/banner3-blur.webp",
    description: "",
  },
  {
    id: "slide4",
    image: "/banner/banner4.webp",
    blur: "/banner/banner4-blur.webp",
    description: "",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full">
      {banner.map((item, index) => (
        <div key={index} id={item.id} className="carousel-item relative w-full">
          <Image
            src={item.image}
            className="h-screen"
            alt="slide"
            width={1280}
            height={720}
            placeholder="blur"
            blurDataURL={item.blur}
            style={{ objectFit: "cover", width: "100vw", height: "100vh" }}
          />
          {item.description && (
            <div className="absolute mx-auto max-w-[1244px] flex justify-between left-5 right-5 bottom-5 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center w-full">{item.description}</div>
            </div>
          )}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${index > 0 ? index : banner.length}`} className="btn btn-circle">
              ❮
            </a>
            <a href={`#slide${index + 2 > banner.length ? 1 : index + 2}`} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
