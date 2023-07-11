export interface IUserModel {
    readonly _id?: string;
    userUID: string;
    userProfileImagePath?: string;
    userFullname?: string;
    userBio?: string;
    userEmail: string;
    userPassword?: string;
    userPhone?: string;
}