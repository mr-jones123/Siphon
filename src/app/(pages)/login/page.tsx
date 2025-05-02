"use client";

import { useSearchParams } from "next/navigation";
// import { SignInButton } from "@/components/auth/SignInButton";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  
  return (
    <div className="container mx-auto max-w-md py-24">
      <div className="bg-black/5 p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>
              {error === "AccessDenied" 
                ? "You do not have permission to access this page." 
                : "There was an error signing you in. Please try again."}
            </p>
          </div>
        )}
        
        {searchParams.get("authError") && (
          <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-6 rounded">
            <p>{searchParams.get("authError")}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Sign in to access protected areas of the application.
          </p>
          
          {/* <SignInButton className="w-full">
            Sign in with Google
          </SignInButton> */}
          
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 