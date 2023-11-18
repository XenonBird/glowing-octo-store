import { dbConnect } from '@/dbConfig/db-config';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserValidationSchema } from '@/validation/zod-schemas';

// register
export async function POST(request) {
  try {
    await dbConnect();
    // const cookies = request.cookies.getAll();
    const incomingData = await request.json();
    const validatedData = UserValidationSchema.safeParse(incomingData);
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
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });
    response.cookies.set('username', savedUser.name, {
      httpOnly: true,
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    console.log('🔴', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
