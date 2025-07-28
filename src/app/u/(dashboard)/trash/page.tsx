import TrashCont from "@/components/Trash/TrashCont";

const TrashCan = () => {
  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1300px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Trash</h2>
      </div>
      <TrashCont />
    </div>
  );
};

export default TrashCan;
