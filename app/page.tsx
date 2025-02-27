import "server-only"
import type { Metadata } from "next";
import { Users } from "../components/users/Users";
import { fetchUsers } from "../apis/users";

export default async function IndexPage() {
  // Prepare data for SSR
  const data = await fetchUsers();
  return <Users data={data}/>;
};

export const metadata: Metadata = {
  title: "Next.js as Frontend",
};