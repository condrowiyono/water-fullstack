import Image from "next/image";
import Link from "next/link";

const guides = [
  {
    id: 1,
    name: "Laporan Bencana",
    download: "/guide/laporan-bencana.pdf",
  },
];
const Guide = () => {
  return (
    <>
      <div className="text-4xl text-center">Pedoman</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama Pedoman</th>
              <th>Unduh</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>
                  <Link className="btn btn-primary btn-sm" target="_blank" href={item.download}>
                    Unduh
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Guide;
