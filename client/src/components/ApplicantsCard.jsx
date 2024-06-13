import React from 'react';

const ApplicantsCard = ({ key, name, email }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center" key={key}>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-400">{email}</p>
    </div>
  );
};

export default ApplicantsCard;
