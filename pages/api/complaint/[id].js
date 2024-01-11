import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req = NextRequest, res = NextResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const fetchComplaint = await prisma.complaint.findMany({
        where: {
          applicationId: id,
        },
        include: {
          application: true,
        },
      });

      if (!fetchComplaint) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }
      return res.json(fetchComplaint, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  } else if (req.method === "POST") {
    const {
      inputType,
      inputComment,
    } = req.body;
    try {
      const postComplaint = await prisma.complaint.create({
        data: {
          type: inputType,
          comment: inputComment,
          status: null,
          application: { connect: { id: id } },
        },
      });

      if (!postComplaint) {
        res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json(postComplaint, { status: 200 });
    } catch (err) {
      res.json({ message: err.message }, { status: 500 });
    }
  
      
  }
  if (req.method === "DELETE") {
    try {
      const deleteComplaint = await prisma.complaint.delete({
        where: {
          complaintid: id,
        },
      });

      if (!deleteComplaint) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json({ message: "Complaint deleted" }, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  }
}
