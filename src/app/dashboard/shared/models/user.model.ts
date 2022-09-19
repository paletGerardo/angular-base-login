
    export interface UserModel {
        id: number;
        mail: string;
        name: string;
        phone: string;
        rol: string;
        status: boolean;
        surname: string;
    }

    export interface UserLogin {
        name: string;
        password: string;
    }
