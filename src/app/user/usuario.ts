export class Usuario {
    id: number;
    username: string;
    password: string;
    name: string;
    surnames: string;
    email: string;
    phone: string;
    enabled: boolean;
    roles: string[] = [];
}
