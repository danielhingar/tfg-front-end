import { Usuario } from '../usuario';
import { About } from './about';
import {Product} from './products/product';
export class Company extends Usuario {
    about: About;
    businessName: string;
    category: string;
    image: string;
    products: Product[] = [];
}
