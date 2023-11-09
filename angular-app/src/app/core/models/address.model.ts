export class Address {
  constructor(
    public id: string,
    public street: string,
    public number: string,
    public city: string,
    public province: string,
    public country: string,
    public postal_code: string,
    public floor?: string | null,
  ) {}
}