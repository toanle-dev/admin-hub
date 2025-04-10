import { Role } from '@prisma/client';

export interface JwtToken {
  userId: number;
  email: string;
  phone: string;
  role: Role;
}
