import { BiFolder, BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const SideBar = () => {
  return (
    <div className="w-[6%] fixed left-0 top-0 bottom-0 flex flex-col border-[#818181] border-r-1 items-center gap-y-6 p-4 h-full">
      <div className="text-[#cccccc] text-xl pt-1 mb-3">Logo</div>
      <div>
        <BiFolder cursor={"pointer"} color="#cccccc" size={25} />
      </div>
      <div>
        <BiUser cursor={"pointer"} color="#cccccc" size={25} />
      </div>
      <div>
        <CiSettings cursor={"pointer"} color="#cccccc" size={28} />
      </div>
    </div>
  );
};

export default SideBar;
