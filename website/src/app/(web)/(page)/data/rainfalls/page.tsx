import ObservationDataCards from "@/app/(web)/_components/ObervationDataCards";

const RainfallPage = () => {
  return (
    <>
      <div className="text-4xl text-center mb-8">Pos Curah Hujan</div>
      <ObservationDataCards type="rainfalls" className="grid md:grid-cols-5 grid-cols-2 gap-6 mx-auto my-4" />
    </>
  );
};

export default RainfallPage;
