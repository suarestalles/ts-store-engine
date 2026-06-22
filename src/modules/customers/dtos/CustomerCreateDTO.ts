export interface CustomerCreateDTO {
    name: string;
    userId: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
}