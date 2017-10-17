export class UserModel {
    IdUser: number;
    Nick: string;
    Password: string;
    Name: string;
    SurnameFirst: string;
    SurnameSecond: string;
    Email: string;
    Phone: string;
    Address: string;
}

export class UserLoginModel {
    Nick: string;
    Password: string;
}

export class UserAuthModel {
    IdUser: number;
    Nick: string;
    Token: string;
}
