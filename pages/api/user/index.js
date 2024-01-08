import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.method === "GET") {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = userId? await clerkClient.users.getUser(userId) : null;

    try {
      const currentUser = await prisma.user.findUnique({
        where: {
          clerkId: userId,
        },
      });

      if (currentUser) {
        return res.json({ user: currentUser }, { status: 200 });
      }

      const createUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          image: user.imageUrl,
        },
      });

      if (createUser) {
        return res.json({ user: createUser }, { status: 200 });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
