"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOutButton, useSession, useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { session, isLoaded: sessionLoaded } = useSession();

  if (!userLoaded || !sessionLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!isSignedIn || !user || !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-600">Not signed in</h2>
        <p className="text-muted-foreground">
          Please sign in to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-lg dark:bg-slate-900">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src={user.imageUrl} alt={user.firstName || "User"} />
          <AvatarFallback>{user.firstName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <Badge className="mb-2 text-base px-3 py-1">
            {user.primaryEmailAddress?.emailAddress}
          </Badge>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Badge variant="secondary">User ID: {user.id}</Badge>
            <Badge variant="outline">
              Last Sign In:{" "}
              {user.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleString()
                : "-"}
            </Badge>
            <Badge variant="outline">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "-"}
            </Badge>
          </div>
        </div>
        <div className="w-full mt-8">
          <h2 className="text-xl font-semibold mb-4 text-left">Session Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-xs text-muted-foreground mb-1">
                Session ID
              </div>
              <div className="font-mono text-sm break-all">{session.id}</div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <Badge
                variant={
                  session.status === "active" ? "default" : "destructive"
                }
              >
                {session.status}
              </Badge>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-xs text-muted-foreground mb-1">
                Last Active
              </div>
              <div className="font-mono text-sm">
                {session.lastActiveAt
                  ? new Date(session.lastActiveAt).toLocaleString()
                  : "-"}
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-xs text-muted-foreground mb-1">Expires At</div>
              <div className="font-mono text-sm">
                {session.expireAt
                  ? new Date(session.expireAt).toLocaleString()
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            variant="destructive"
          >
            <SignOutButton />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
