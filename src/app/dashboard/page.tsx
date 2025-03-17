// src/pages/dashboard.tsx
import { withAuth } from "@/middleware/withAuth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyLocalToken } from "@/lib/auth";
import LogoutButton from "@/app/dashboard/LogoutButton";
import { JwtPayload } from "jsonwebtoken";

async function getUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyLocalToken(token) as JwtPayload;
  if (!decoded) {
    redirect("/login");
  }

  return decoded;
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl mb-2 text-black">
          Welcome, {user["username"]}!
        </h2>
        <p className="mb-2 text-black">You are logged in with: {user.email}</p>
      </div>

      <LogoutButton />
    </div>
  );
}
