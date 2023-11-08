import { dbConnect } from '@/dbConfig/db-config';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const UserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .refine(
      (email) => email.endsWith('@gmail.com'),
      'Email must end with "@gmail.com"'
    ),
  number: z
    .string()
    .length(10, { message: 'Mobile number be 10 characters long' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  isAdmin: z.boolean().default(false),
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
    const ifUserExist = await User.findOne({
      $or: [
        {
          mobile: validatedData.data.number,
        },
        { email: validatedData.data.email },
      ],
    });
    if (ifUserExist) {
      if (ifUserExist.email === validatedData.data.email) {
        return Response.json(
          { message: 'Email is already registered' },
          { status: 400 }
        );
      } else {
        return Response.json(
          { message: 'Mobile is already registered' },
          { status: 400 }
        );
      }
    }

    // hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validatedData.data.password, salt);

    // adding user
    const newUser = new User({
      name: validatedData.data.name,
      email: validatedData.data.email.toLowerCase(),
      mobile: validatedData.data.number,
      hash: hash,
    });
    const savedUser = await newUser.save();
    if (!savedUser)
      return Response.json({ message: 'Try again' }, { status: 400 });
    console.log('🎉 New user registered :', savedUser.name);

    // token and cookies
    const signedToken = jwt.sign(
      {
        userid: savedUser._id,
        username: savedUser.name,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // response
    const response = NextResponse.json(savedUser, { status: 201 });
    response.cookies.set('token', signedToken, {
      httpOnly: true,
      expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    });
    response.cookies.set('username', targetUser.name, {
      httpOnly: true,
      expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    console.log('🔴', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
