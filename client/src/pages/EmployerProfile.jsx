import React, { useState, useEffect } from "react";
import {
  useGetJobsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useEditJobMutation,
  useGetJobsForCompanyQuery,
} from "../state/jobhunterApiSlice";
import JobForCompanyCard from "../components/JobForCompanyCard";

const EmployerProfile = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    position: "",
    company: "",
    city: "",
    type: "",
    salaryFrom: "",
    salaryTo: "",
    description: "",
    homeOffice: false,
  });
  const [errors, setErrors] = useState({
    position: false,
    company: false,
    city: false,
    type: false,
    salaryFrom: false,
    salaryTo: false,
    description: false,
  });

  const {
    data: fetchedJobs,
    error,
    isLoading,
    refetch,
  } = useGetJobsForCompanyQuery({ userId: user?.user.id, token: user?.accessToken });
  const [addJob] = useAddJobMutation();

  useEffect(() => {
    if (fetchedJobs?.data) {
      setJobs(fetchedJobs.data);
    }
  }, [fetchedJobs?.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name === "salaryFrom" || name === "salaryTo" ? parseInt(value) : value;
    setNewJob({ ...newJob, [name]: processedValue });
    setErrors({ ...errors, [name]: false });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewJob({ ...newJob, [name]: checked });
  };

  const handleAddJob = async () => {
    const newErrors = {
      position: !newJob.position,
      company: !newJob.company,
      city: !newJob.city,
      type: !newJob.type,
      salaryFrom: !newJob.salaryFrom,
      salaryTo: !newJob.salaryTo,
      description: !newJob.description,
    };

    setErrors(newErrors);

    if (
      !newErrors.position &&
      !newErrors.company &&
      !newErrors.city &&
      !newErrors.type &&
      !newErrors.salaryFrom &&
      !newErrors.salaryTo &&
      !newErrors.description
    ) {
      try {
        await addJob({ job: newJob, token: user.accessToken });
        setNewJob({
          position: "",
          company: "",
          city: "",
          type: "",
          salaryFrom: "",
          salaryTo: "",
          description: "",
          homeOffice: false,
        });
        setShowForm(false);
        refetch();
      } catch (error) {
        console.error("Error adding job:", error);
      }
    }
  };

  const handleResetForm = () => {
    setNewJob({
      position: "",
      company: "",
      city: "",
      type: "",
      salaryFrom: "",
      salaryTo: "",
      description: "",
      homeOffice: false,
    });
    setErrors({
      position: false,
      company: false,
      city: false,
      type: false,
      salaryFrom: false,
      salaryTo: false,
      description: false,
    });
  };

  const [deleteJob] = useDeleteJobMutation();

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob({ id: jobId, token: user.accessToken });
      refetch();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const [editJob] = useEditJobMutation();

  const handleEditJob = async (jobId, editedJob) => {
    try {
      await editJob({
        id: jobId,
        job: editedJob,
        token: user.accessToken,
      });
      refetch();
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };

  return (
    <div className="mt-10 bg-gray-800 rounded-lg shadow-md border-amber-400 p-6 text-white min-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Felhasználó adatai</h1>
      <div className="mb-6">
        <div className="flex mb-4">
          <p className="text-lg mr-7">
            <strong>Név:</strong>
          </p>
          <p className="text-lg">{user?.user.fullname}</p>
        </div>
        <div className="flex mb-6">
          <p className="text-lg mr-4">
            <strong>Email:</strong>
          </p>
          <p className="text-lg">{user?.user.email}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 mt-10">
          Meghirdetett állások
        </h2>
        <button
          className="bg-gradient-to-r from-amber-400 to-orange-600 text-gray-900 py-2 px-4 rounded-lg font-semibold"
          onClick={() => setShowForm(!showForm)}
        >
          Új munkalehetőség hozzáadása
        </button>
      </div>
      {showForm && (
        <div className="mb-14 bg-gray-700 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">
            Új munkalehetőség hozzáadása
          </h3>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Pozíció
            </label>
            <input
              type="text"
              name="position"
              value={newJob.position}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.position ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.position && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Cég
            </label>
            <input
              type="text"
              name="company"
              value={newJob.company}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.company ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Város
            </label>
            <input
              type="text"
              name="city"
              value={newJob.city}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.city ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Munkaidő
            </label>
            <select
              name="type"
              value={newJob.type}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.type ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            >
              <option value="">Munkaidő kiválasztása</option>
              <option value="full-time">Teljes munkaidő</option>
              <option value="part-time">Részmunkaidő</option>
              <option value="internship">Gyakornok</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Fizetési sáv alja
            </label>
            <input
              type="number"
              name="salaryFrom"
              value={newJob.salaryFrom}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.salaryFrom ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.salaryFrom && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Fizetési sáv teteje
            </label>
            <input
              type="number"
              name="salaryTo"
              value={newJob.salaryTo}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.salaryTo ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.salaryTo && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2 flex items-center">
            <label
              htmlFor="homeOffice"
              className="text-sm font-medium text-gray-300 mr-2"
            >
              Home Office
            </label>
            <input
              type="checkbox"
              id="homeOffice"
              name="homeOffice"
              checked={newJob.homeOffice}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Leírás
            </label>
            <textarea
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                errors.description ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <button
            className="bg-gradient-to-r from-amber-400 to-orange-600 text-gray-900 py-2 px-4 rounded-lg font-semibold mr-2"
            onClick={handleAddJob}
          >
            Munkalehetőség hozzáadása
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold"
            onClick={handleResetForm}
          >
            Törlés
          </button>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading jobs</p>
      ) : jobs.length > 0 ? (
        <div className="mb-4">
          {jobs.map((job, index) => (
            <JobForCompanyCard
              token={user.accessToken}
              key={index}
              job={{
                ...job,
                homeOffice: Boolean(job.homeOffice),
              }}
              handleDelete={handleDeleteJob}
              handleEdit={handleEditJob}
            />
          ))}
        </div>
      ) : (
        <p className="mt-2 mb-2">Még nincs meghirdetett munkalehetőség.</p>
      )}
    </div>
  );
};

export default EmployerProfile;
