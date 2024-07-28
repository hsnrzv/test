export interface SignUpRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  profileImage?: string;
  mobile?: string;
  address?: string;
  bio?: string;
}
