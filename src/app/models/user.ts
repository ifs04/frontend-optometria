export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  is_active: "ACTIVE" | "INACTIVE";
}

export interface UserResponseI {
    id?: number;
    username: string;
    email: string;
    avatar?: string;
}