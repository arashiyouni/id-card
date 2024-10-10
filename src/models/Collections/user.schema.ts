import mongoose, { model, Schema } from "mongoose";
import { UserSchema, Permission, Role, UserDocument } from "src/common/interface/mongo/documents/User";

export const userSchema = new mongoose.Schema<UserSchema>({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    idDocente: {
        type: String,
        required: false,
        default: '',
    },
    dui: {
        type: String,
        required: false,
        default: null,
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'roles',
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{ timestamps: true})
  
export const roleSchema = new mongoose.Schema<Role>(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: '',
            trim: true,
        },

        category: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        permissions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'permissions',
            },
        ],
},{timestamps: true,})
export const permissionSchema = new mongoose.Schema<Permission>(
    {
      name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
  
      description: {
        type: String,
        default: '',
        trim: true,
      },
  
      category: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
},{ timestamps: true })

export const UsuarioModel = 'users'
export const RoleModel = 'roles'
export const PermissionModel = 'permissions'