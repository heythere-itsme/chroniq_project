import Image from "next/image";
import RedirectButton from "@/components/HomePage/RedirectButton";

const HomePage = () => {
  
  return (
    <div className="landing-Page">
      <div className="flex justify-between px-50 pt-10 items-center">
        <div className="flex gap-2">
          <Image src="/chroniq.svg" width={80} height={40} alt="Logo || Chroniq" />
          <h1 className="font-main text-2 text-primary-light">ChroniQ</h1>
        </div>
        <RedirectButton />
      </div>

      <div className="px-100 flex items-center justify-between h-[calc(100vh-300px)]">
        <h1 className="font-ter text-2 font-bold text-primary-light w-[50vh]">
          Get organized without losing the vibe.
        </h1>
        <Image src={"/mascot.png"} width={450} height={450} alt="ChroniQ Mascot" />
      </div>
    </div>
  );
};

export default HomePage;