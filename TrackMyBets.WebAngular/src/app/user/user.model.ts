export class UserModel {
    idUser: number;
    nick: string;
    password: string;
    name: string;
    surnameFirst: string;
    surnameSecond: string;
    email: string;
    phone: string;
    address: string;
}

export class UserLoginModel {
    nick: string;
    password: string;
}

export class UserAuthModel {
    idUser: number;
    nick: string;
    token: string;
}
