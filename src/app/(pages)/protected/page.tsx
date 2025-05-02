import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";

export default async function ProtectedPage() {
  const session = await getServerSession(options);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Protected Page</h1>
      </div>
      
      <div className="bg-black/5 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
        <p className="mb-4">This page is only visible to authenticated users.</p>
        <p>Your session info:</p>
        <pre className="bg-black/10 p-4 rounded mt-2 overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
} 