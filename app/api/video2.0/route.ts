import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
){
   try{
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if(!userId){
        return new NextResponse("Unauthorized" , { status: 401});
    }

    
    if(!prompt){
        return new NextResponse("Prompt is required"  , {status: 400});
    }
    
    const  response = await replicate.run(
      "lucataco/animate-diff:1531004ee4c98894ab11f8a4ce6206099e732c1da15121987a8eef54828f0663",
      {
        input: {
          prompt
        }
      }
    );

     
    return NextResponse.json(response);

   }catch(error){
      console.log("[VIDEO2.0_ERROR]" , error);
      return new NextResponse("Internal error" , {status: 500})
   }

}
    
