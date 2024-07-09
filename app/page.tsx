import type { Metadata } from "next";
import { Users } from "./components/users/Users";

export default function IndexPage() {
  return <Users />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
