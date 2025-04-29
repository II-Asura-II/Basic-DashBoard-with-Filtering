import { useEffect, useState } from "react";
import data from "../Utils/data";
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiDownArrowAlt,
  BiFilterAlt,
  BiSort,
  BiUpArrowAlt,
} from "react-icons/bi";

type Config = {
  key: string;
  direction: string;
};

const Table = () => {
  const [projects, setProjects] = useState(data);
  const [isDropped, setIsDropped] = useState(false);
  const [sortConfig, setSortConfig] = useState<Config | null>(null);
  const [sortedIcon, setSortedIcon] = useState(<BiSort />);
  const [filterVisible, setFilterVisible] = useState(false);
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    client: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });

  const sortProjects = (key: keyof (typeof data)[0]) => {
    const sortedProjects = [...projects];

    const isAscending =
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending";

    sortedProjects.sort((a, b) => {
      if (key === "date") {
        if (isAscending) {
          return (
            new Date(b[key].split("/").reverse().join("-")).getTime() -
            new Date(a[key].split("/").reverse().join("-")).getTime()
          );
        } else {
          return (
            new Date(a[key].split("/").reverse().join("-")).getTime() -
            new Date(b[key].split("/").reverse().join("-")).getTime()
          );
        }
      } else {
        if (isAscending) {
          return a[key] > b[key] ? -1 : 1;
        } else {
          return a[key] > b[key] ? 1 : -1;
        }
      }
    });

    setSortConfig({ key, direction: isAscending ? "descending" : "ascending" });
    setSortedIcon(
      isAscending ? <BiDownArrowAlt size={20} /> : <BiUpArrowAlt size={20} />
    );

    setProjects(sortedProjects);
  };

  const handleSort = (key: keyof (typeof data)[0]) => {
    setIsDropped(!isDropped);
    sortProjects(key);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesQuery =
      query === "" ||
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      );

    const matchesFilters = Object.entries(filters).every(([key, value]) =>
      value === ""
        ? true
        : project[key as keyof typeof project]!.toString()
            .toLowerCase()
            .includes(value.toLowerCase())
    );

    return matchesQuery && matchesFilters;
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const changePage = (pageNumber: number) => setPage(pageNumber);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="flex flex-col p-4 h-full justify-between">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <div className="relative flex w-fit">
            <button
              onClick={() => setIsDropped(!isDropped)}
              className="border-[#afafaf] border-1 text-[#cccccc] flex items-center gap-x-0.5 cursor-pointer py-2 w-22 justify-center rounded-sm">
              {sortedIcon}
              Sort
              <BiChevronDown size={20} />
            </button>

            <div
              className={`w-22 flex flex-col absolute top-12 border-1 bg-gray-900 border-[#afafaf] rounded-sm ${
                isDropped ? "opacity-100 visible" : "opacity-0 invisible"
              } transition duration-2`}>
              <button
                className="cursor-pointer rounded-t-sm py-2 bg-gray-900 hover:bg-gray-800 text-[#cccccc]"
                onClick={() => handleSort("client")}>
                Name
              </button>
              <button
                className="cursor-pointer py-2 bg-gray-900 hover:bg-gray-800 text-[#cccccc]"
                onClick={() => handleSort("country")}>
                Country
              </button>
              <button
                className="cursor-pointer py-2 bg-gray-900 hover:bg-gray-800 text-[#cccccc]"
                onClick={() => handleSort("date")}>
                Date
              </button>
              <button
                className="cursor-pointer rounded-b-sm py-2 bg-gray-900 hover:bg-gray-800 text-[#cccccc]"
                onClick={() => handleSort("progress")}>
                Progress
              </button>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className="text-[#cccccc] border-1 border-[#afafaf] flex items-center gap-x-0.5 cursor-pointer py-2 w-22 justify-center rounded-sm">
              <BiFilterAlt />
              Filter
              <BiChevronDown size={20} />
            </button>

            <div
              className={`space-y-2 pb-4 px-4 bg-gray-900 border-1 border-[#afafaf] rounded-sm p-2 ${
                !filterVisible && "hidden"
              } absolute top-12 transition duration-500`}>
              <div>
                <label className="text-[#cccccc]" htmlFor="name">
                  Filter by Name:
                </label>
                <input
                  onChange={handleFilter}
                  value={filters.client}
                  className="bg-gray-950 text-[#cccccc] rounded-sm mt-1 focus:outline-green-500 outline-1 py-1 px-2"
                  type="text"
                  name="client"
                  id="client"
                />
              </div>
              <div>
                <label className="text-[#cccccc]" htmlFor="country">
                  Filter by Country:
                </label>
                <input
                  onChange={handleFilter}
                  value={filters.country}
                  className="bg-gray-950 text-[#cccccc] rounded-sm mt-1 focus:outline-green-500 outline-1 py-1 px-2"
                  type="text"
                  name="country"
                  id="country"
                />
              </div>
              <div>
                <label className="text-[#cccccc]" htmlFor="email">
                  Filter by Email:
                </label>
                <input
                  onChange={handleFilter}
                  value={filters.email}
                  className="bg-gray-950 text-[#cccccc] rounded-sm mt-1 focus:outline-green-500 outline-1 py-1 px-2"
                  type="text"
                  name="email"
                  id="email"
                />
              </div>
              <div>
                <label className="text-[#cccccc]" htmlFor="project">
                  Filter by Project:
                </label>
                <input
                  onChange={handleFilter}
                  value={filters.project}
                  className="bg-gray-950 text-[#cccccc] rounded-sm mt-1 focus:outline-green-500 outline-1 py-1 px-2"
                  type="text"
                  name="project"
                  id="project"
                />
              </div>
              <div>
                <label className="text-[#cccccc]" htmlFor="status">
                  Filter by Status:
                </label>
                <input
                  onChange={handleFilter}
                  value={filters.status}
                  className="bg-gray-950 text-[#cccccc] rounded-sm mt-1 focus:outline-green-500 outline-1 py-1 px-2"
                  type="text"
                  name="status"
                  id="status"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <input
            className="bg-gray-950 text-[#cccccc] rounded-sm py-1 px-2 focus:outline-green-500 outline-1"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="h-full my-10">
        {filteredProjects.length > 0 ? (
          <div className="border-[#818181] border-1 rounded-sm min-w-fit">
            <table className="min-w-full table-auto text-sm  text-[#cccccc]">
              <thead>
                <tr className=" border-[#818181] border-b-1">
                  <th className="text-left p-2">Image</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Country</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Project Name</th>
                  <th className="text-left p-2">Task Progress</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((client, i) => (
                  <tr key={i}>
                    <td className="p-2">
                      <img
                        className="object-cover min-h-15 h-15 min-w-15 w-15 rounded-full"
                        src={client.image}
                        alt={client.client}
                      />
                    </td>
                    <td className="p-2">{client.client}</td>
                    <td className="p-2">{client.country}</td>
                    <td className="p-2">{client.email}</td>
                    <td className="p-2">{client.project}</td>
                    <td className="p-2">
                      <div className="min-w-[100%] rounded-full h-2 bg-[#cacaca]">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: client.progress.toString() + "%",
                          }}></div>
                      </div>
                    </td>
                    <td className="p-2">{client.status}</td>
                    <td className="p-2">{client.date}</td>
                    <td className="p-2">{client.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-[#cccccc] flex justify-center">
            No results
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="disabled:opacity-50 gap-x-0.5 flex justify-center bg-[#cccccc] rounded-sm min-w-25 p-2 pl-0 cursor-pointer items-center disabled:cursor-not-allowed">
          <BiChevronLeft size={25} />
          Previous
        </button>
        <span className="text-[#cccccc]">
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages || totalPages <= 1}
          onClick={() => changePage(page + 1)}
          className="disabled:opacity-50 gap-x-0.5 flex bg-[#cccccc] rounded-sm min-w-25 p-2 pr-0 justify-center cursor-pointer items-center disabled:cursor-not-allowed">
          Next
          <BiChevronRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default Table;
