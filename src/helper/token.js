import jwt from 'jsonwebtoken';

const getTokenData = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return { ...error, success: false };
  }
};

export default getTokenData;
