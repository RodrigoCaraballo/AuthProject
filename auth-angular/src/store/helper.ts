import { UserTokenModel } from "../models";
import jwt_decode from 'jwt-decode';

export function getAuthUser(): UserTokenModel | null {
  const authToken = localStorage.getItem('authToken');

  if(authToken) {
    console.log('Auth');

    const newDecodeToken: UserTokenModel = jwt_decode<UserTokenModel>(authToken);

    return newDecodeToken
  }

  console.log('Not Auth');

  return null;
}
