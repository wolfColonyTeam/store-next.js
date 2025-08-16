import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import { dbConnect } from "@/lib/dbConnect";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // Базовая валидация (минимум, без зависимостей)
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    // check if exist user in db email + provider=credentials
    const existing = await User.findOne({
      email: email.trim(),
      provider: "credentials",
    }).lean();

    if (existing) {
      return NextResponse.json({
        message: "User already exists",
        status: 409,
        success: false,
      });
    }

    // TODO hash password
    // const hash = await bcrypt.hash(password, 10);

    const created = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: password,
      image: null,
      provider: "credentials",
    });

    return NextResponse.json({
      message: "User created",
      userId: created._id.toString(),
      status: 201,
      success: true,
    });
  } catch (err: any) {
    // catch duplicate (if there is unique by email+provider)
    if (err?.code === 11000) {
      return NextResponse.json({
        message: "User already exists",
        status: 409,
        success: false,
      });
    }
    console.error("Create user error:", err);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
