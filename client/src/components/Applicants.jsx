import React from 'react';
import { useGetApplicantsForJobQuery } from "../state/jobhunterApiSlice";
import ApplicantsCard from '../components/ApplicantsCard';

const Applicants = ({ jobId, token }) => {
  const { data: applicants, error, isLoading } = useGetApplicantsForJobQuery({ jobId, token });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading applicants</p>;

  console.log(applicants);

  return (
    <div className='min-w-64'>
      <h2 className="text-2xl font-bold mb-4">Jelentkezők</h2>
      {applicants && applicants.length > 0 ? (
        applicants.map((applicant) => (
          <ApplicantsCard key={applicant.user.id} name={applicant.user.fullname} email={applicant.user.email} />
        ))
      ) : (
        <h2>Még nincs jelentkező</h2>
      )}
    </div>
  );
};

export default Applicants;
