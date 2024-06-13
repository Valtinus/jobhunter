import React, { useState, useEffect } from "react";
import { useGetJobsQuery } from "../state/jobhunterApiSlice";
import JobCard from "../components/JobCard";

const Home = () => {
  const { data: jobs = {}, error, isLoading, refetch } = useGetJobsQuery();
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    salaryFrom: 0,
    salaryTo: 0,
    type: "",
    city: "",
    homeOffice: 0,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const resetFilters = () => {
    setSearchText("");
    setFilterOptions({
      salaryFrom: 0,
      salaryTo: 0,
      type: "",
      city: "",
      homeOffice: 0,
    });
  };

  const filteredJobs =
    jobs.data &&
    jobs.data.filter((job) => {
      const searchTextMatch =
        job.position.toLowerCase().includes(searchText.toLowerCase()) ||
        job.description.toLowerCase().includes(searchText.toLowerCase());

      const salaryMatch =
        (!filterOptions.salaryFrom ||
          job.salaryFrom >= filterOptions.salaryFrom) &&
        (!filterOptions.salaryTo || job.salaryTo <= filterOptions.salaryTo);

      const employmentTypeMatch =
        !filterOptions.type ||
        job.type.toLowerCase() === filterOptions.type.toLowerCase();

      const locationMatch =
        !filterOptions.city ||
        job.city.toLowerCase().includes(filterOptions.city.toLowerCase());

      const isRemoteMatch =
        !filterOptions.homeOffice ||
        job.homeOffice === (filterOptions.homeOffice ? 1 : 0);

      return (
        searchTextMatch &&
        salaryMatch &&
        employmentTypeMatch &&
        locationMatch &&
        isRemoteMatch
      );
    });

  return (
    <div className="mt-10 min-w-full">
      <h1 className="font-bold mb-4">Főoldal</h1>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Böngéssz állásaink között</h1>
        <div>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Keresés... 🔍"
            className="border p-2 mr-2 rounded-xl"
          />
          <button
            className="bg-gradient-to-r from-amber-400 to-orange-600 text-gray-900 py-2 px-4 rounded"
            onClick={toggleFilter}
          >
            Szűrés
          </button>
          <button
            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
            onClick={resetFilters}
          >
            Szűrők törlése
          </button>
        </div>
      </div>
      {isFilterOpen && (
        <div className="mb-4">
          <div className="flex items-center flex-wrap">
            <label className="mr-4">
              Min. fizetés:{" "}
              <input
                type="number"
                name="salaryFrom"
                value={
                  filterOptions.salaryFrom === 0 ? "" : filterOptions.salaryFrom
                }
                onChange={handleFilterChange}
                className="border p-2 rounded-xl"
              />
            </label>
            <label className="mr-4">
              Max. fizetés:{" "}
              <input
                type="number"
                name="salaryTo"
                value={
                  filterOptions.salaryTo === 0 ? "" : filterOptions.salaryTo
                }
                onChange={handleFilterChange}
                className="border p-2 rounded-xl"
              />
            </label>
            <label className="mr-4">
              Foglalkoztatás típusa:{" "}
              <select
                name="type"
                value={filterOptions.type}
                onChange={handleFilterChange}
                className="border p-2 rounded-xl"
              >
                <option value="">Mind</option>
                <option value="full-time">Teljes munkaidő</option>
                <option value="part-time">Részmunkaidő</option>
                <option value="internship">Gyakornok</option>
              </select>
            </label>
            <label className="mr-4">
              Település:{" "}
              <input
                type="text"
                name="city"
                value={filterOptions.city}
                onChange={handleFilterChange}
                className="border p-2 rounded-xl"
              />
            </label>
            <label>
              Home office:{" "}
              <input
                type="checkbox"
                name="homeOffice"
                checked={filterOptions.homeOffice}
                onChange={handleFilterChange}
                className="mr-2"
              />
            </label>
          </div>
        </div>
      )}
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredJobs && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>Nincs a feltételeknek megfelelő munka</p>
        )}
      </div>
    </div>
  );
};

export default Home;
