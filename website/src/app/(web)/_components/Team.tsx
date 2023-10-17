import Image from "next/image";

const sampleTeams = [
  {
    image: "/team/team1.webp",
    name: "Nama",
    position: "Jabatan",
  },
  {
    image: "/team/team2.webp",
    name: "Nama",
    position: "Jabatan",
  },
  {
    image: "/team/team1.webp",
    name: "Nama",
    position: "Jabatan",
  },
];

type TeamProps = {
  teams?: Array<{ image: string; name: string; position: string }>;
};

const Team = ({ teams = sampleTeams }: TeamProps) => {
  return (
    <div className="carousel carousel-center rounded-box w-full">
      {teams.map((item, index) => (
        <div key={index} className="carousel-item relative">
          <Image
            width={480}
            height={0}
            src={item.image}
            alt="Drink"
            className="max-h-[480px]"
            style={{ height: "auto" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-50 text-center">
            <div className="text-lg font-bold">{item.name}</div>
            <div className="text-gray-500">{item.position}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
