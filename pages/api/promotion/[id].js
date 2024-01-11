import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req = NextRequest, res = NextResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const fetchPromotion = await prisma.promotion.findMany({
        where: {
          applicationId: id,
        },
        include: {
          application: true,
        },
      });

      if (!fetchPromotion) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }
      return res.json(fetchPromotion, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  } else if (req.method === "POST") {
    const {
      inputPromotionTitle,
      inputDescription,
      inputStartDate,
      inputEndDate,
      inputStartTime,
      inputProductName,
      inputProductCategory,
    } = req.body;
    try {
      const postPromotion = await prisma.promotion.create({
        data: {
          title: inputPromotionTitle,
          description: inputDescription,
          startDate: new Date(inputStartDate),
          endDate: new Date(inputEndDate),
          //   startTime: inputStartTime,
          productName: inputProductName,
          product: inputProductCategory,
          application: { connect: { id: id } },
        },
      });

      if (!postPromotion) {
        res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json(postPromotion, { status: 200 });
    } catch (err) {
      res.json({ message: err.message }, { status: 500 });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deletePromotion = await prisma.promotion.delete({
        where: {
          promoid: id,
        },
      });

      if (!deletePromotion) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json({ message: "Promotion deleted" }, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  }
}
