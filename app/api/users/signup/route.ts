import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { userSchema } from "@/common/userSchema";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { email, name, password } = result.data;

    //todo  <--- Hashing the password --->
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isExist = await prisma.user.findUnique({
      where: { email },
    });
    if (isExist) {
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: { user },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
};
