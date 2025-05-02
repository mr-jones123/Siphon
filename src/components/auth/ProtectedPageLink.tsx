"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

export function ProtectedPageLink() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Button size="lg" variant="outline" className="h-12 px-8" disabled>
        <LockIcon className="mr-2 h-4 w-4" /> Loading...
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <Link href="/protected">
        <Button size="lg" variant="outline" className="h-12 px-8">
          <LockIcon className="mr-2 h-4 w-4" /> Protected Page
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/login?authError=You must be signed in to access this page&callbackUrl=/protected">
      <Button size="lg" variant="outline" className="h-12 px-8">
        <LockIcon className="mr-2 h-4 w-4" /> Protected Page (Sign in required)
      </Button>
    </Link>
  );
} 