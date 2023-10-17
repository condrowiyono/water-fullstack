import Image from "next/image";
import ObservationCard, { ObservationCardProps } from "../../(auth)/mobile/_components/ObservationCard";
import { RiverCountType } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import Banner from "../_components/Banner";
import Team from "../_components/Team";
import ObservationDataCards from "../_components/ObervationDataCards";
import { formatDateTime } from "@/utils/dayjs";

export default async function Page() {
  const riverCount = await fetcher<RiverCountType>({ baseURL: process.env.API_URL, url: "/rivers-count" });

  const observationCard: ObservationCardProps[] = [
    {
      title: "Curah Hujan",
      icon: "/image/rainfall.png",
      color: "bg-green-600",
      total: riverCount.data.pch?.total || 0,
      manual: riverCount.data.pch?.manual || 0,
      telemetry: riverCount.data.pch?.telemetry || 0,
      href: "/data/rainfalls",
    },
    {
      title: "Duga Air",
      icon: "/image/waterlevel.png",
      color: "bg-blue-600",
      total: riverCount.data.tma?.total || 0,
      manual: riverCount.data.tma?.manual || 0,
      telemetry: riverCount.data.tma?.telemetry || 0,
      href: "/data/waterlevels",
    },
    {
      title: "Klimatologi",
      icon: "/image/climate.png",
      color: "bg-red-500",
      total: riverCount.data.iklim?.total || 0,
      manual: riverCount.data.iklim?.manual || 0,
      telemetry: riverCount.data.iklim?.telemetry || 0,
      href: "/data/climates",
    },
  ];

  return (
    <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
      <Navbar />
      <section className="w-full h-full md:h-screen md:snap-start">
        <Banner />
      </section>
      <section className="w-full h-full md:h-screen md:snap-start flex items-center justify-between">
        <div className="p-4 mx-auto w-full max-w-[720px]">
          <div className="text-center text-4xl font-bold mb-4">POS HIDROLOGI</div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mx-auto">
            {observationCard.map((item, index) => (
              <ObservationCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full h-full md:h-screen md:snap-start bg-gray-100">
        <div className="p-4 pt-[5rem] mx-auto w-full max-w-[1244px]">
          <div className="text-center text-4xl font-bold">POS CURAH HUJAN</div>
          <div className="text-center text-gray-500">{formatDateTime(new Date(), "DD MMMM YYYY")}</div>
          <ObservationDataCards
            type="rainfalls"
            unit="mm"
            className="grid md:grid-cols-5 grid-cols-2 gap-6 mx-auto my-4"
          />
        </div>
      </section>
      <section className="w-full h-full md:h-screen md:snap-start bg-gray-100">
        <div className="p-4 pt-[5rem] mx-auto w-full max-w-[1244px]">
          <div className="text-center text-4xl font-bold">POS DUGA AIR</div>
          <div className="text-center text-gray-500">{formatDateTime(new Date(), "DD MMMM YYYY")}</div>
          <ObservationDataCards
            type="waterlevels"
            unit="mdpl"
            className="grid md:grid-cols-5 grid-cols-2 gap-6 mx-auto my-4"
          />
        </div>
      </section>
      <section className="w-full h-full md:h-screen md:snap-start bg-gray-100">
        <div className="p-4 pt-[5rem] mx-auto w-full max-w-[1244px]">
          <div className="text-center text-4xl font-bold">POS KLIMATOLOGI</div>
          <div className="text-center text-gray-500">{formatDateTime(new Date(), "DD MMMM YYYY")}</div>
          <ObservationDataCards
            type="climates"
            unit="Curah Hujan (mm)"
            className="grid md:grid-cols-5 grid-cols-2 gap-6 mx-auto my-4"
          />
        </div>
      </section>
      <section className="w-full h-full md:h-screen md:snap-start bg-yellow-200 flex items-center">
        <div className="p-4 pt-[5rem] mx-auto w-full max-w-[1244px]">
          <div className="text-center text-4xl font-bold mb-4">TIM KAMI</div>
          <Team />
        </div>
      </section>
      <Footer className="bg-blue-900  md:snap-start" />
    </main>
  );
}
