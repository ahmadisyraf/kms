import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req = NextRequest, res = NextResponse) {
  const { id } = req.query;
  
  if (req.method === "GET") {
    try{
        
        const fetchPromotion = await prisma.promotion.findMany({
            where: {
                applicationId : id,
            },
            include: {
                application: true
            }
        });

        if(!fetchPromotion){
            return res.json({message:"Something wrong"},{status:404});
        }
        return res.json(fetchPromotion,{status:200});
    }catch(err){
        return res.json({message:err.message},{status:500});
    }
}
}
