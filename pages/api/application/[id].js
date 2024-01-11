import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export default async function handler(req = NextRequest, res = NextResponse) {
  const { id } = req.query;
  if (req.method === "POST") {
    const {
      inputOwnerName,
      inputOwnerIC,
      inputOwnerPhoneNumber,
      inputOwnerAddress,
      inputBusinessName,
      inputBusinessPhoneNumber,
      inputTyphoidInjection,
      inputImage,
      inputBusinessSSM,
      inputCreatedDate,
    } = req.body;

    try {
      const findUser = await prisma.user.findUnique({
        where: {
          clerkId: id,
        },
      });

      if (!findUser) {
        return res.json({ message: "user not found" }, { status: 400 });
      }
      const createApplication = await prisma.application.create({
        data: {
          owner: {
            set: {
              name: inputOwnerName,
              ic: inputOwnerIC,
              icImage: inputImage,
              phoneNo: inputOwnerPhoneNumber,
              address: inputOwnerAddress,
            },
          },
          business: {
            set: {
              name: inputBusinessName,
              phoneNo: inputBusinessPhoneNumber,
              ssmNo: inputBusinessSSM,
              typhoidInjection: inputTyphoidInjection === "true" ? true : false,
            },
          },
          createdDate: new Date(inputCreatedDate),
          user: { connect: { id: findUser.id } },
        },
      });

      if (!createApplication) {
        return res.json({ message: "Failed to create" }, { status: 300 });
      }

      return res.json({ data: createApplication }, { status: 200 });
    } catch (error) {
      return res.json({ message: error }, { status: 500 });
    }
  } else if (req.method === "GET") {
    if (req.query.type === "application") {
      try {
        const findApplication = await prisma.application.findUnique({
          where: {
            id: id,
          },
          include: {
            user: true,
          },
        });

        if (!findApplication) {
          return res.json({ error: "Application not found" }, { status: 400 });
        }

        return res.json(findApplication, { status: 200 });
      } catch (error) {
        return res.json(error, { status: 500 });
      }
    } else if (req.query.search) {
      const search = req.query.search;

      try {
        const searchApplication = await prisma.application.findMany({
          where: {
            status: {
              contains: search,
            },
          },
        });

        if (!searchApplication) {
          res.json({ message: "Something wrong" }, { status: 400 });
        }

        return res.json(searchApplication, { status: 200 });
      } catch (err) {
        return res.json({ message: err.message }, { status: 200 });
      }
    } else {
      try {
        const findUser = await prisma.user.findUnique({
          where: {
            clerkId: id,
          },
        });

        if (!findUser) {
          return res.json({ message: "User not found" }, { status: 400 });
        }

        const currentUserApplication = await prisma.application.findMany({
          where: {
            userId: findUser.id,
          },
          include: {
            user: true,
          },
        });

        return res.json(currentUserApplication, { status: 200 });
      } catch (error) {
        return res.json({ error: error.message }, { status: 500 });
      }
    }
  } else if (req.method === "PATCH") {
    const { inputStatus } = req.body;

    try {
      const updateStatus = await prisma.application.update({
        where: {
          id: id,
        },
        data: {
          status: inputStatus,
        },
      });

      if (!updateStatus) {
        req.json({ message: "Error to update status" }, { status: 500 });
      }

      return res.json(updateStatus, { status: 200 });
    } catch (err) {
      return res.json({ error: error.message }, { status: 500 });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleteApplication = await prisma.application.delete({
        where: {
          id: id,
        },
      });

      if (!deleteApplication) {
        return res.json({ message: "Something wrong" }, { status: 404 });
      }

      return res.json({ message: "Application deleted" }, { status: 200 });
    } catch (err) {
      return res.json({ message: err.message }, { status: 500 });
    }
  }
}
