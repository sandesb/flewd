import { createApi } from '@reduxjs/toolkit/query/react';
import supabase from '../config/supabaseClient';

// Base query for Supabase
const supabaseBaseQuery = async ({ url, method, body, params }) => {
  let supabaseQuery;
  switch (method) {
    case 'select':
      supabaseQuery = supabase.from(url).select(body);
      if (params?.id) {
        supabaseQuery = supabaseQuery.eq('id', params.id);
      }
      break;
    case 'insert':
      // Use upsert to handle custom IDs - insert if not exists, update if exists
      supabaseQuery = supabase.from(url).upsert(body, { onConflict: 'id' }).select();
      break;
    case 'update':
      supabaseQuery = supabase.from(url).update(body).eq('id', params.id);
      break;
    case 'delete':
      supabaseQuery = supabase.from(url).delete().eq('id', params);
      break;
    default:
      return { error: { status: 'CUSTOM_ERROR', data: 'Invalid method' } };
  }

  const { data, error } = await supabaseQuery;
  if (error) {
    console.error('Error in Supabase query:', error);
    return { error: { status: 'CUSTOM_ERROR', data: error.message } };
  }

  console.log('Supabase response:', { data, error }); // Debug log
  return { data };
};

// Create userApi
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: supabaseBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: 'users', method: 'select', body: '*' }),
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => ({ url: 'users', method: 'select', body: '*', params: { id } }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'insert',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: 'users',
        method: 'update',
        body: user,
        params: { id },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: 'users',
        method: 'delete',
        params: id,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetUserQuery, 
  useAddUserMutation, 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = userApi;

export default userApi;
