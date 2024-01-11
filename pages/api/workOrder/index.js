import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.method === "GET") {
    try {
      const getWorkOrder = await prisma.workorder.findMany();

      return res.json(getWorkOrder, { status: 200 });
    } catch (error) {
      return res.json({ error: error }, { status: 500 });
    }
  }
}
