import { Client } from '../client';
import { Company } from '../../company/company';
export class Conversation {
    id: number;
    issue: string;
    createDate: string;
    client: Client;
    company: Company;
}
