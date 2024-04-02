import { HttpException, HttpStatus } from '@nestjs/common';

export const handlePrismaError = (error: any, message: string) => {
  console.error('Prisma error:', error);
  return new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: message,
    },
    HttpStatus.NOT_FOUND,
  );
};
