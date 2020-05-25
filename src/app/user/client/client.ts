import { Usuario } from '../usuario';
import { Basket } from './basket/basket';
import { Product } from '../company/products/product';
export class Client extends Usuario {
    basket: Basket;
    address: string;
    number: string;
    codePostal: string;
    locality: string;
    province: string;
    wishProducts: Product[] = [];
}
