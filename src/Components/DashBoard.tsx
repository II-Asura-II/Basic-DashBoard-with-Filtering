import SideBar from "./SideBar";
import Table from "./Table";

const DashBoard = () => {
  return (
    <div className="h-screen ml-[7%] flex">
      <SideBar />
      <div className="w-full">
        <Table />
      </div>
    </div>
  );
};

export default DashBoard;
