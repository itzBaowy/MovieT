import prisma from '../prisma/connect.prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestException, UnauthorizedException, ForbiddenException } from '@moviet/shared/helpers/exception.helper.js';
import { validateEmail, validateUsername, validatePassword } from '@moviet/shared/helpers/validate.helper.js';

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_ACCESS_SECRET || 'access_secret',
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

export const authService = {
  register: async (req) => {
    const { username, email, password, fullName } = req.body;

    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });

    if (existingUser) throw new BadRequestException("Username hoặc Email đã tồn tại");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName,
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  login: async (req) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException("Tài khoản hoặc mật khẩu không chính xác");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Tài khoản hoặc mật khẩu không chính xác");

    const { accessToken, refreshToken } = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    const { password: _, refreshToken: __, ...userWithoutSecrets } = user;
    return { user: userWithoutSecrets, accessToken, refreshToken };
  },

  refreshToken: async (req) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new UnauthorizedException("Refresh token không được để trống");

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!user || user.refreshToken !== refreshToken) {
        throw new ForbiddenException("Refresh token không hợp lệ hoặc đã bị thu hồi");
      }

      const tokens = generateTokens(user);
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken }
      });

      return tokens;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ForbiddenException("Refresh token đã hết hạn");
      }
      throw new ForbiddenException("Refresh token không hợp lệ");
    }
  },

  getInfo: async (req) => {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException("Người dùng không tồn tại");

    const { password, refreshToken, ...userWithoutSecrets } = user;
    return userWithoutSecrets;
  },

  updateInfo: async (req) => {
    const userId = req.user?.id;
    const { fullName, avatar } = req.body;
    if (!userId) throw new UnauthorizedException();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        avatar,
      }
    });

    const { password, refreshToken, ...userWithoutSecrets } = user;
    return userWithoutSecrets;
  }
};
