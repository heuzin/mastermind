import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscSubscription = await db.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscSubscription) {
    return false;
  }

  const isValid =
    userSubscSubscription.stripePriceId &&
    userSubscSubscription.stripeCurrentPeriodEnd &&
    userSubscSubscription.stripeCurrentPeriodEnd.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
