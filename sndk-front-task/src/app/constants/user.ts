export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  fullName: string;
  status: string;
  createdAt?: string;
  modifiedAt?: string;
}
