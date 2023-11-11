import { dbConnect } from '@/dbConfig/db-config';
import getTokenData from '@/helper/token';
import User from '@/models/user';

export async function GET(request) {
  try {
    const token = request.cookies.get('token');

    if (!token) {
      return Response.json({ message: 'Please login' }, { status: 400 });
    }

    const decodedToken = getTokenData(token.value);

    if (!decodedToken.success) {
      return Response.json(
        { message: `${decodedToken?.message}, please login` },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findById(
      decodedToken.data.userid,
      'name _id email mobile isAdmin'
    );

    if (!user) {
      return Response.json(
        { message: 'User not found, please login' },
        { status: 404 }
      );
    }

    const data = { ...user._doc };

    const links = user.isAdmin
      ? [
          { text: 'Add product', url: '/admin/new' },
          { text: 'Dashboard', url: '/admin/dashboard' },
        ]
      : [];

    return Response.json({ data, links }, { status: 200 });
  } catch (error) {
    console.log('🔴', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
