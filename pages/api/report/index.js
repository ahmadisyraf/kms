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
          }}
        if (req.query.filter === "total") {
            try {
                // Calculate the sum of the 'amount' property in 'billing' model
                const billingTotal = await prisma.billing.aggregate({
                    _sum: {
                        amount: true,
                    },
                });

                // Return the results
                res.json({ billingTotal }, { status: 200 });
            } catch (err) {
                res.json({ message: err.message }, { status: 500 });
            }
        }
    }

