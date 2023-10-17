import Image from "next/image";

const RequestInformation = () => {
  return (
    <Image
      src="/request-information.png"
      width={600}
      height={0}
      style={{ width: "100%", height: "auto" }}
      alt="Request Information"
    />
  );
};

export default RequestInformation;
