import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Invalid email format",
    //     },
    //     { status: 400 }
    //   );
    // }

    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });

    //*     <------ checking if user exist through his/her email ----->
    if (!isUserExist) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    //?     <------- checking the password if exist ------->
    const isPasswordValid = await bcrypt.compare(
      //todo    -----> Check if entered password matches stored hashed password
      password,
      isUserExist.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
    };

    const token = await jwt.sign(tokenData, process.env.CONCEALED_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successfull",
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

//todo      <--------- WITHOUT TOKEN ----------->
//*       User → Login करता है → Server says "OK" → User नया page open करे →
//*       Server: "तू कौन है? फिर से login कर!"

//todo      <--------- WITH TOKEN ---------->
//*       User → Login करता है → Server token देता है →
//*       User हर request के साथ token भेजता है →
//*       Server token verify करता है → "आ जा भाई, तू logged in है"
