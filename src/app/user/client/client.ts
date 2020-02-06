import { Usuario } from '../usuario';
import { Basket } from './basket/basket';
export class Client extends Usuario {
    basket: Basket;
}
