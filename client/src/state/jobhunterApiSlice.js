import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3030/';

export const jobhunterApi = createApi({
  reducerPath: 'jobhunterApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `jobs`,
    }),
    getOneJob: builder.query({
      query: (id) => `jobs/${id}`,
    }),
    getExperiences: builder.query({
      query: ( token ) => ({
        url: `experiences`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    addExperience: builder.mutation({
      query: ({ experience, token }) => ({
        url: `experiences`,
        method: 'POST',
        body: experience,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    addExperiences: builder.mutation({
      query: ({ array, token }) => ({
        url: `experiences`,
        method: 'POST',
        body: array,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    editExperience: builder.mutation({
      query: ({ id, experience, token }) => ({
        url: `experiences/${id}`,
        method: 'PATCH',
        body: experience,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    deleteExperience: builder.mutation({
      query: ({ id, token }) => ({
        url: `experiences/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    applyForAJob: builder.mutation({
      query: ({ application, token }) => ({
        url: `applicants`,
        method: 'POST',
        body: application,
        headers: { Authorization: `Bearer ${token}` },
      })
    }),
    getJobsForApplicant: builder.query({
      query: ({ userId, token }) => ({
        url: `applicants?userId=${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
    }),
    getJobsForCompany: builder.query({
      query: ({ userId, token }) => ({
        url: `jobs?userId=${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
    }),
    getApplicantsForJob: builder.query({
      query: ({ jobId, token }) => ({
        url: `applicants?jobId=${jobId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
    }),
    addJob: builder.mutation({
      query: ({ job, token }) => ({
        url: `jobs`,
        method: 'POST',
        body: job,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    editJob: builder.mutation({
      query: ({ id, job, token }) => ({
        url: `jobs/${id}`,
        method: 'PATCH',
        body: job,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    deleteJob: builder.mutation({
      query: ({ id, token }) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `authentication`,
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
    }),
    getJobsWithLimitAndSkip: builder.query({
      query: ({ limit, skip }) => `jobs?$limit=${limit}&$skip=${skip}`,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetOneJobQuery,
  useGetExperiencesQuery,
  useAddExperienceMutation,
  useAddExperiencesMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
  useApplyForAJobMutation,
  useGetJobsForApplicantQuery,
  useGetJobsForCompanyQuery,
  useGetApplicantsForJobQuery,
  useAddJobMutation,
  useEditJobMutation,
  useDeleteJobMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetJobsWithLimitAndSkipQuery,
} = jobhunterApi;
