"use node";

import type { WebhookEvent } from "@clerk/nextjs/server";
import { v } from "convex/values";
import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

const webHookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  async handler(ctx, args) {
    const wh = new Webhook(webHookSecret);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});
