import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetOneJobQuery,
  useApplyForAJobMutation,
  useGetJobsForApplicantQuery,
} from "../state/jobhunterApiSlice";

const formatSalary = (salary) => {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatJobType = (type) => {
  switch (type) {
    case "full-time":
      return "Teljes munkaidő";
    case "part-time":
      return "Részmunkaidő";
    case "internship":
      return "Gyakornok";
    default:
      return "";
  }
};

const Job = ({ user }) => {
  const { id } = useParams();
  const { data: job, error, isLoading } = useGetOneJobQuery(id);
  const { data: appliedJobs, isLoading: isLoadingAppliedJobs } = useGetJobsForApplicantQuery({ userId: user?.user.id, token: user?.accessToken });
  const [applyForAJob] = useApplyForAJobMutation();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (appliedJobs && job) {
      const applied = appliedJobs.some(appliedJob => appliedJob.jobId === job.id);
      setHasApplied(applied);
    }
  }, [appliedJobs, job]);

  if (isLoading || isLoadingAppliedJobs) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const formattedSalary = `${formatSalary(job.salaryFrom)} Ft - ${formatSalary(
    job.salaryTo
  )} Ft`;

  const handleApply = async () => {
    const application = {
      jobId: job.id,
    };

    try {
      const response = await applyForAJob({
        application: application,
        token: user.accessToken,
      }).unwrap();

      if (response.success) {
        alert("Sikeresen jelentkeztél a munkára!");
        setHasApplied(true);
      } else {
        alert("Hiba történt a jelentkezés során.");
      }
    } catch (error) {
      console.error("Hiba a jelentkezéssel:", error);
      alert("Hiba történt a jelentkezés során.");
    }
  };

  return (
    <div className="mt-10 bg-gray-800 rounded-lg shadow-md border-amber-400 min-w-full p-6 text-white max-w-xl mx-auto">
      <div className="flex justify-between items-center px-4 sm:px-0">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            {job.position}
          </h1>
          <p className="text-xl max-w-md text-sm leading-6 text-gray-300">
            {job.company}
          </p>
        </div>
        {user?.user.role === "jobseeker" && (
          hasApplied ? (
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold"
              disabled
            >
              Már jelentkeztél
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-amber-400 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold"
              onClick={handleApply}
            >
              Jelentkezem
            </button>
          )
        )}
      </div>
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-700">
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Pozíció
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {job.position}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">Cég</dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {job.company}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Hely
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {job.city}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Munkaidő
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {formatJobType(job.type)}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Fizetési sáv
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {formattedSalary}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Leírás
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {job.description}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-300">
              Home office
            </dt>
            <dd className="mt-1 text-mb leading-6 text-white sm:col-span-2 sm:mt-0">
              {job.homeOffice ? "✅" : "❌"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Job;
