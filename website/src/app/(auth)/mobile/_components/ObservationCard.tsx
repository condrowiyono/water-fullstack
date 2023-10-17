import Image from "next/image";
import Link from "next/link";

export type ObservationCardProps = {
  title: string;
  icon: string;
  color: string;
  total: number;
  manual: number;
  telemetry: number;
  href?: string;
};

const ObservationCard = (props: ObservationCardProps) => {
  const { title, icon, color, total, href, manual, telemetry } = props;

  return (
    <Link
      href={href || "#"}
      className={`rounded-lg no-underline text-white shadow-lg p-4 mx-auto w-full ${color} hover:opacity-80`}
    >
      <Image src={icon} width={120} height={120} style={{ width: "100%", height: "auto" }} alt={title} />
      <div className="text-center text-4xl font-bold">{total || manual + telemetry}</div>
      <div className="text-center font-bold">{title}</div>
      <div className="my-4 border-t border-white border-solid"></div>
      <div className="grid grid-cols-1 gap-2">
        <div className="text-center">
          <div className="font-bold text-lg">{manual}</div>
          <div className="text-sm">Manual</div>
        </div>
        <div className="text-center">
          <div className=" font-bold text-lg">{telemetry}</div>
          <div className="text-sm">Telemetric</div>
        </div>
      </div>
    </Link>
  );
};

export default ObservationCard;
