import React from "react";
import { Link, useNavigate } from "react-router-dom";

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

const JobCard = ({ job }) => {
  const formattedSalary = `${formatSalary(job.salaryFrom)} Ft - ${formatSalary(
    job.salaryTo
  )} Ft`;

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`jobs/${job.id}`);
  };

  return (
    <div className="flex items-start justify-between p-4 mb-4 bg-gray-800 rounded-lg shadow-md" onClick={handleRedirect}>
      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">{job.position}</h2>
        <p className="text-mb mb-2 text-white">{job.company}</p>
        <p className="text-sm text-white">{job.city} 📍</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-lg font-semibold mb-2 text-white">
          {formattedSalary}
        </p>
        <p className="text-mb text-gray-700 mb-2 text-white">
          {formatJobType(job.type)}
        </p>
        <p className="text-sm text-gray-700 text-white">
          Home office: {job.homeOffice ? "✅" : "❌"}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
