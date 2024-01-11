import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.method === "GET") {
    try {
      const getComplaint = await prisma.complaint.findMany();

      return res.json(getComplaint, { status: 200 });
    } catch (error) {
      return res.json({ error: error }, { status: 500 });
    }
  }
}
