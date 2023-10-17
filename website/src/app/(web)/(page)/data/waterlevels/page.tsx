import ObservationDataCards from "@/app/(web)/_components/ObervationDataCards";

const WaterLevelPage = () => {
  return (
    <>
      <div className="text-4xl text-center mb-8">Pos Duga Air</div>
      <ObservationDataCards type="waterlevels" className="grid md:grid-cols-5 grid-cols-2 gap-6 mx-auto my-4" />
    </>
  );
};

export default WaterLevelPage;
