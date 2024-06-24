"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache/provider";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const clerkPublishKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl={"/"} publishableKey={clerkPublishKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ConvexQueryCacheProvider>{children}</ConvexQueryCacheProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
