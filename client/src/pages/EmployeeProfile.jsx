import React, { useState, useEffect } from "react";
import {
  useGetExperiencesQuery,
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useEditExperienceMutation,
} from "../state/jobhunterApiSlice";
import ExperienceCard from "../components/ExperienceCard";

const EmployeeProfile = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [workExperiences, setWorkExperiences] = useState(
    user?.workExperiences || []
  );
  const [newExperience, setNewExperience] = useState({
    title: "",
    interval: "",
    company: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    interval: false,
    company: false,
  });

  const {
    data: fetchedExperiences,
    error,
    isLoading,
    refetch,
  } = useGetExperiencesQuery(user.accessToken);
  const [addExperience] = useAddExperienceMutation();

  useEffect(() => {
    if (fetchedExperiences?.data) {
      setWorkExperiences(fetchedExperiences.data);
    }
  }, [fetchedExperiences?.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleAddExperience = async () => {
    const newErrors = {
      title: !newExperience.title,
      interval: !newExperience.interval,
      company: !newExperience.company,
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.interval && !newErrors.company) {
      try {
        await addExperience({
          experience: newExperience,
          token: user.accessToken,
        });
        setNewExperience({ title: "", interval: "", company: "" });
        setShowForm(false);
        refetch();
      } catch (error) {
        console.error("Error adding experience:", error);
      }
    }
  };

  const handleResetForm = () => {
    setNewExperience({ title: "", interval: "", company: "" });
    setErrors({ title: false, interval: false, company: false });
  };

  const [deleteExperience] = useDeleteExperienceMutation();

  const handleDeleteExperience = async (experienceId) => {
    try {
      await deleteExperience({ id: experienceId, token: user.accessToken });
      refetch();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const [editExperience] = useEditExperienceMutation();

  const handleEditExperience = async (experienceId, editedExperience) => {
    try {
      const { title, interval, company } = editedExperience;
      await editExperience({
        id: experienceId,
        experience: { title, interval, company },
        token: user.accessToken,
      });
      refetch();
    } catch (error) {
      console.error("Error editing experience:", error);
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
          Korábbi munkatapasztalatok
        </h2>
        <button
          className="bg-gradient-to-r from-amber-400 to-orange-600 text-gray-900 py-2 px-4 rounded-lg font-semibold"
          onClick={() => setShowForm(!showForm)}
        >
          Új munkatapasztalat hozzáadása
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Új munkatapasztalat</h3>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Munkakör
            </label>
            <input
              type="text"
              name="title"
              value={newExperience.title}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                errors.title ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Időtartam
            </label>
            <input
              type="text"
              name="interval"
              value={newExperience.interval}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                errors.interval ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.interval && (
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
              value={newExperience.company}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                errors.company ? "border-red-500" : "border-gray-600"
              } rounded-md text-white`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">Ez a mező kötelező</p>
            )}
          </div>
          <button
            className="bg-gradient-to-r from-amber-400 to-orange-600 text-gray-900 py-2 px-4 rounded-lg font-semibold mr-2"
            onClick={handleAddExperience}
          >
            Hozzáadás
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
        <p>Error loading experiences</p>
      ) : workExperiences.length > 0 ? (
        <div className="mb-4">
          {workExperiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              handleDelete={handleDeleteExperience}
              handleEdit={handleEditExperience}
            />
          ))}
        </div>
      ) : (
        <p className="mt-2 mb-2">Nincs még munkatapasztalat.</p>
      )}
    </div>
  );
};

export default EmployeeProfile;
