"use client";
import { useGetUsersQuery } from "@/lib/features/users/usersApi";
import { useState } from "react";
import { User } from "@/lib/features/users/usersApi"; // Import the User type

export const Users = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery({ id: userId });

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching users.</p>}
      {isSuccess && Array.isArray(data) && (
        <ul>
          {data.map((user: User) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      {isSuccess && !Array.isArray(data) && (
        <div>
          <p>{data.name}</p>
        </div>
      )}
    </div>
  );
};