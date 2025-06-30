import PrefixHeader from "./components/PrefixHeader";
import PrefixForm from "../../modules/system/components/PrefixForm";
import PrefixFooter from "./components/PrefixFooter";

export default function PrefixScreen() {
  return (
    <div
      name="viewport"
      className="flex flex-col items-center justify-center bg-gray-50 h-screen w-screen"
    >
      <div className="flex flex-col h-[340px]  w-full max-w-[600px] bg-white border-[0.1px] border-gray-300 rounded-lg  sm:py-8 sm:shadow-lg">
        <div className="flex items-center border-b-[7px] border-azulOscuro h-14 w-full">
          <PrefixHeader />
        </div>
        <PrefixForm />
        <div className="flex justify-end mt-6 border-t-[3px] border-azulOscuro w-full">
          <PrefixFooter />
        </div>
      </div>
    </div>
  );
}
