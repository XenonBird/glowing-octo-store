import { dbConnect } from '@/dbConfig/db-config';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const UserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .refine(
      (email) => email.endsWith('@gmail.com'),
      'Email must end with "@gmail.com"'
    ),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// register
export async function POST(request) {
  try {
    await dbConnect();
    // const cookies = request.cookies.getAll();
    const incomingData = await request.json();
    const validatedData = UserSchema.safeParse(incomingData);
    if (!validatedData.success) {
      return Response.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }
    validatedData.data.email = validatedData.data.email.toLowerCase();

    // if user exist
    const targetUser = await User.findOne({ email: validatedData.data.email });
    // console.log('targetUser', targetUser);
    if (!targetUser) {
      return Response.json(
        { message: 'Email is not registered' },
        { status: 404 }
      );
    }

    const isPasswordMatch = bcrypt.compareSync(
      validatedData.data.password,
      targetUser.hash
    );

    if (!isPasswordMatch)
      return Response.json({ message: 'Incorrect password' }, { status: 400 });

    console.log('🎉 New user Login :', targetUser.name);

    // token and cookies
    const signedToken = jwt.sign(
      {
        userid: targetUser._id,
        username: targetUser.name,
        isAdmin: targetUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // response
    const response = NextResponse.json(targetUser, { status: 200 });
    response.cookies.set('token', signedToken, {
      httpOnly: true,
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });
    response.cookies.set('username', targetUser.name, {
      httpOnly: true,
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    console.log('🔴', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
