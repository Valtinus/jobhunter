import React, { useState } from "react";

const ExperienceCard = ({ experience, handleDelete, handleEdit }) => {
  const { id, title, company, interval } = experience;
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperience, setEditedExperience] = useState({ ...experience });

  const onDeleteClick = () => {
    handleDelete(id);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCancelEditClick = () => {
    setIsEditing(false);
    setEditedExperience({ ...experience });
  };

  const onSaveEditClick = () => {
    handleEdit(id, editedExperience);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExperience({ ...editedExperience, [name]: value });
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      {!isEditing ? (
        <div>
          <p>
            <strong className="mr-2">Munkakör:</strong> {title}
          </p>
          <p>
            <strong className="mr-14">Cég:</strong> {company}
          </p>
          <p>
            <strong className="mr-2">Időtartam:</strong> {interval}
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Munkakör
            </label>
            <input
              type="text"
              name="title"
              value={editedExperience.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Időtartam
            </label>
            <input
              type="text"
              name="interval"
              value={editedExperience.interval}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Cég
            </label>
            <input
              type="text"
              name="company"
              value={editedExperience.company}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
        </div>
      )}
      <div>
        {!isEditing ? (
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold mr-2"
            onClick={onEditClick}
          >
            Szerkesztés
          </button>
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
        {!isEditing && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold"
            onClick={onDeleteClick}
          >
            Törlés
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
