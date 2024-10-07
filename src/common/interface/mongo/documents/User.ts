
export interface CreateUser extends Document {
    email: string
    password: string
    tipo: string
    carnet: string
}