import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  const { id } = req.query;
  if (req.method === "POST") {
    const { assignee, date, note } = req.body;

    try {
      const createWorkOrder = await prisma.workorder.create({
        data: {
          assignee: assignee,
          complaint: { connect: { complaintid: id } },
          date: new Date(date),
          note: note,
        },
      });

      if (!createWorkOrder) {
        return res.json({ message: "Failed to create" }, { status: 300 });
      }

      return res.json({ data: createWorkOrder }, { status: 200 });
    } catch (error) {
      return res.json({ message: error.message }, { status: 500 });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleteWorkOrder = await prisma.workorder.delete({
        where: {
          id: id, // Assuming id is a number; convert it to the appropriate type if needed
        },
      });

      if (!deleteWorkOrder) {
        return res.json({ message: "Failed to delete" }, { status: 300 });
      }

      return res.json({ data: deleteWorkOrder }, { status: 200 });
    } catch (error) {
      return res.json({ message: error.message }, { status: 500 });
    }
  } else if (req.method === "GET") {
    try {
      const getWorkOrderById = await prisma.workorder.findUnique({
        where: {
          id: id,
        },
        include: {
          complaint: true,
        },
      });

      if (!getWorkOrderById) {
        return res.json({ message: "Work order not found" }, { status: 404 });
      }

      return res.json({ data: getWorkOrderById }, { status: 200 });
    } catch (error) {
      return res.json({ message: error.message }, { status: 500 });
    }
  } else if (req.method === "PATCH") {
    const { assignee, date, note } = req.body;

    try {
      const updatedWorkOrder = await prisma.workorder.update({
        where: {
          id: id, // Assuming id is a number; convert it to the appropriate type if needed
        },
        include: {
          complaint: true,
        },
        data: {
          assignee: assignee,
          date: new Date(date),
          note: note,
        },
      });

      if (!updatedWorkOrder) {
        return res.json(
          { message: "Failed to update work order" },
          { status: 300 }
        );
      }

      return res.json({ data: updatedWorkOrder }, { status: 200 });
    } catch (error) {
      return res.json({ message: error.message }, { status: 500 });
    }
  }
}
