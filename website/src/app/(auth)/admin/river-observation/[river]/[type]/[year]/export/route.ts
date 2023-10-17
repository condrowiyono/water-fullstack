import { authOptions } from "@/utils/next-auth";
import { getServerSession } from "next-auth";

const mapType = new Map([
  ["pch", "rainfalls"],
  ["tma", "waterlevels"],
  ["iklim", "climates"],
]);

type Params = {
  river: string;
  type: string;
  year: string;
};

export async function GET(req: Request, { params }: { params: Params }) {
  const { river, type, year } = params;
  const session = await getServerSession(authOptions);

  const host = process.env.API_URL;
  const url = `${host}/admin/${mapType.get(type)}/${river}/export?year=${year}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  const blob = await response.blob();

  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=${river}-${type}-${year}.xlsx`,
    },
  });
}
