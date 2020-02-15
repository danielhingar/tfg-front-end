import { Reporter } from '../reporter';
import { Facture } from '../../client/facture/facture';
export class Claim {
    id: number;
    title: string;
    description: string;
    createDate: string;
    attachment: string;
    status: string;
    answer: string;
    reporter: Reporter;
    facture: Facture;
}
