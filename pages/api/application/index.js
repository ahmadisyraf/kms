import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.method === "GET") {
    try {
      const applications = await prisma.application.findMany({
        include: { user: true },
      });

      return res.json(applications, { status: 200 });
    } catch (error) {
      return res.json({ error: error }, { status: 500 });
    }
  }
}
