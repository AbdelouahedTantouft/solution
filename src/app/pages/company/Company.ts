export interface Company {
    id: string;
    name: string;
    code: string;
    email: string;
    logo: string;
    profil: string;
    dateAjout: Date | null;
    password_db: string;
    user_db: string;
    server_db: string;
    port_db: string;
    database_db: string;
    user_count?: number;
}


