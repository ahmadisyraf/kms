import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req = NextRequest, res = NextResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const fetchBilling = await prisma.billing.findMany({
        where: {
          applicationId: id,
        },
        include: {
          application: true,
        },
      });

      if (!fetchBilling) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json(fetchBilling, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  }
}
