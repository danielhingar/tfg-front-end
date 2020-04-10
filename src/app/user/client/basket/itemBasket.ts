import { Product } from '../../company/products/product';

export class ItemBasket {
    id: number;
    quantity: number;
    size: string;
    capacity: string;
    product: Product;
    status: string;
}
