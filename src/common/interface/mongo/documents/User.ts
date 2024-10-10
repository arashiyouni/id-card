import { Types } from "mongoose"

export interface UserSchema {
    username: string;
    name: string;
    email?: string;
    password?: string;
    recoveryToken?: string;
    isAdmin?: boolean;
    roles?: Types.ObjectId[] | RoleDocument[];
    idDocente?: string;
    dui?: string;
  }
  

  export interface UserDocument extends UserSchema, Document {
    // Métodos de instancia
    populateRoles(): void;
  }
  

export interface Role extends Document {
name: String
description?: String
category?: String
permissions?: Types.ObjectId[] | Permission[]
}

export interface RoleDocument extends Role, Document {
//
}

export interface Permission {
name: String
description?: String
category: String
}

export interface PermissionDocument extends Permission, Document {
//
}

export interface Portal extends Document {
  carnet: string
  carrera: string
  idCarrera: string
  idPlan: number
  isAdmin: boolean
  nombre: string
  plan: string
  roles: []
  username: string
}

export interface PortalUserDocument extends Estudiante, PortalUser, Document {
  // Instance Methods
  populateRoles(): void
}

export interface Estudiante {
  carnet: string
  nombre: string
  idCarrera: string
  carrera: string
  idPlan: number
  plan: string
}

export interface PortalUser {
  username: string
  isAdmin?: boolean
  roles?: Types.ObjectId[] | RoleDocument[]
}
