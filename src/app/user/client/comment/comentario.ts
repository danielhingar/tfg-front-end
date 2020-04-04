import { Client } from '../client';
import { Product } from '../../company/products/product';

export class Comentario {
    id: number;
    title: string;
    description: string;
    valoration: number;
    client: Client;
    product: Product;
    createDate: string;
}
