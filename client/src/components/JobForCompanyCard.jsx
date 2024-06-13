import React, { useState } from "react";
import Modal from "../components/Modal";
import Applicants from "../components/Applicants";

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

const JobForCompanyCard = ({ token, job, handleDelete, handleEdit }) => {
  const {
    id,
    position,
    company,
    city,
    type,
    salaryFrom,
    salaryTo,
    description,
    homeOffice,
  } = job;

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedJob, setEditedJob] = useState({
    ...job,
    homeOffice: Boolean(job.homeOffice),
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!editedJob.position.trim()) {
      errors.position = "A pozíció kitöltése kötelező";
    }
    if (!editedJob.company.trim()) {
      errors.company = "A cég kitöltése kötelező";
    }
    if (!editedJob.city.trim()) {
      errors.city = "A város kitöltése kötelező";
    }
    if (!editedJob.type.trim()) {
      errors.type = "A munka típusának kiválasztása kötelező";
    }
    if (!editedJob.salaryFrom) {
      errors.salaryFrom = "A minimálbér megadása kötelező";
    }
    if (!editedJob.salaryTo) {
      errors.salaryTo = "A maximálbér megadása kötelező";
    }
    if (!editedJob.description.trim()) {
      errors.description = "A leírás kitöltése kötelező";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onDeleteClick = () => {
    handleDelete(id);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCancelEditClick = () => {
    setIsEditing(false);
    setEditedJob({ ...job });
  };

  const onSaveEditClick = () => {
    console.log(editedJob);
    if (validateForm()) {
      handleEdit(id, editedJob);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name === "salaryFrom" || name === "salaryTo" ? parseInt(value) : value;
    setEditedJob({ ...editedJob, [name]: processedValue });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedJob({ ...editedJob, [name]: Boolean(checked) });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      {!isEditing ? (
        <div>
          <h2 className="text-2xl font-bold">{position}</h2>
          <p>
            <strong>{company}</strong>, {city} 📍
          </p>
          <p>
            {formatJobType(type)} /{" "}
            {Boolean(homeOffice) ? "Home office ✅" : "Home office ❌"} /{" "}
            {formatSalary(salaryFrom)} Ft - {formatSalary(salaryTo)} Ft
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Pozíció
            </label>
            <input
              type="text"
              name="position"
              value={editedJob.position}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.position && "border-red-500"
              }`}
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Cég
            </label>
            <input
              type="text"
              name="company"
              value={editedJob.company}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.company && "border-red-500"
              }`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Hely
            </label>
            <input
              type="text"
              name="city"
              value={editedJob.city}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.city && "border-red-500"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Munkaidő
            </label>
            <select
              name="type"
              value={editedJob.type}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.type && "border-red-500"
              }`}
            >
              <option value="">Válassz munkatípust</option>
              <option value="full-time">Teljes munkaidő</option>
              <option value="part-time">Részmunkaidő</option>
              <option value="internship">Gyakornok</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Fizetési sáv
            </label>
            <input
              type="number"
              name="salaryFrom"
              value={editedJob.salaryFrom}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.salaryFrom && "border-red-500"
              }`}
            />
            {errors.salaryFrom && (
              <p className="text-red-500 text-sm">{errors.salaryFrom}</p>
            )}
            <input
              type="number"
              name="salaryTo"
              value={editedJob.salaryTo}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.salaryTo && "border-red-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
            <div className="mb-2 mt-2 flex items-center">
              <label
                htmlFor="homeOffice"
                className="text-sm font-medium text-gray-300 mr-4"
              >
                Home Office
              </label>
              <input
                type="checkbox"
                id="homeOffice"
                name="homeOffice"
                checked={editedJob.homeOffice}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Leírás
            </label>
            <textarea
              name="description"
              value={editedJob.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${
                errors.description && "border-red-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>
      )}
      <div>
        {!isEditing ? (
          <>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold mr-2"
              onClick={onEditClick}
            >
              Szerkesztés
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold mr-2"
              onClick={onDeleteClick}
            >
              Törlés
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Megtekintés
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold mr-2"
              onClick={onSaveEditClick}
            >
              Mentés
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold"
              onClick={onCancelEditClick}
            >
              Mégse
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <Applicants jobId={id} token={token}/>
        </Modal>
      )}
    </div>
  );
};

export default JobForCompanyCard;
