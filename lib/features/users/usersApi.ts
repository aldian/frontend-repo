import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  name: string;
}

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api",
  }),
  reducerPath: "usersApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Users"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `UsersApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getUsers: build.query<User[]| User, { id?: string; limit?: number }>({
      query: ({id, limit}) => {
        const params = new URLSearchParams();
        if (id !== undefined) {
          params.append("id", id);
        }
        if (limit !== undefined) {
          params.append("limit", limit.toString());
        }
        return `/users?${params.toString()}`;
      },
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result, error, { id, limit }) => {
        if (id !== undefined) {
          return [{ type: "Users", id }];
        }
        if (limit !== undefined) {
          return [{ type: "Users", id: `limit-${limit}` }];
        }
        return [{ type: "Users", id: "LIST" }];
      },
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      // `invalidatesTags` determines which 'tag' should be invalidated
      // after the mutation is executed.
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

// Hooks are auto-generated by RTK-Query
// Same as `usersApi.endpoints.getUsers.useQuery`
export const { useGetUsersQuery, useUpdateUserMutation } = usersApi;
