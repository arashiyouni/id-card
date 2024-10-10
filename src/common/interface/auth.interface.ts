export interface UserRoles {
    username: string
    name: string
    email?: string
    isAdmin?: boolean
    roles?: Permissions[]
  }

  export interface Permissions {
    permissions: []
  }