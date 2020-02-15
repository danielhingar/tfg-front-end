import { Client } from '../client';
import { Company } from '../../company/company';
import { ItemBasket } from '../basket/itemBasket';
import { Shipping } from '../../admin/shipping/shipping';
export class Facture {
    id: number;
    status: string;
    address: string;
    name: string;
    surnames: string;
    phone: string;
    locality: string;
    province: string;
    postalCode: string;
    number: string;
    block: string;
    stairs: string;
    floor: string;
    createDate: string;
    client: Client;
    company: Company;
    itemBaskets: ItemBasket[] = [];
    shipping: Shipping;
}
