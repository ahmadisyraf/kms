import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.query.filter) {
    if (req.method === "GET") {
      const status = req.query.status;
      try {
        const applications = await prisma.application.findMany({
          where: {
            status: status,
          },
          include: { user: true },
        });

        return res.json(applications, { status: 200 });
      } catch (error) {
        return res.json({ error: error }, { status: 500 });
      }
    }
  } else {
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
}
