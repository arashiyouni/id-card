export enum Role {
    User = 'user',
    Admin = 'admin',
}

export interface PayloadUserJWT {
    email: string
    password: string
}

export interface PayloadUser {
    carnet: string,
    email : string,
    name: string,
    role: string

}