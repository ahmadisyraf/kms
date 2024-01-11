import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  if (req.method === "GET") {
    try {
      const allBilling = await prisma.billing.findMany({
        include: { application: true },
      });

      if (!allBilling) {
        return res.json({ message: "Something wrong" }, { status: 400 });
      }

      return res.json(allBilling, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  }
}
