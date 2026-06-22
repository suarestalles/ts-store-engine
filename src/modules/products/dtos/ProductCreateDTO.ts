export interface ProductCreateDTO {
    name: string;
    price: number;
    description: string;
    images: string[];
    categoryId: string;
}