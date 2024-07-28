export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio?: string;
  profileImage?: string;
  mobile?: string;
  address?: string;
  postalCode?: string;
  token?: string;
}
