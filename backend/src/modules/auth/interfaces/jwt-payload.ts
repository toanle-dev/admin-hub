export interface JwtPayload {
  email: string;
  phone: string;
  role: {
    id: number;
    name: string;
  };
  sub: number;
}
