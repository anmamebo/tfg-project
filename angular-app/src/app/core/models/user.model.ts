export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public email: string,
    public name?: string,
    public last_name?: string
  ) {}
}
