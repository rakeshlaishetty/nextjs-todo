import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { usersdata } from "@/models/userdata";
export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;
  console.log(authToken);
  let data = null;
  if (process.env.JWT_KEY && authToken) {
    data = jwt.verify(authToken, process.env.JWT_KEY);
    const user = await usersdata.findById(data._id).select("-password");
    return NextResponse.json(user);
  } else {
    return NextResponse.json({},{status:500});
  }
}
