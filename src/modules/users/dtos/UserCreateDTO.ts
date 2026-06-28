export interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
}