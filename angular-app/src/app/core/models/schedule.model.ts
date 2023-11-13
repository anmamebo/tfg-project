import { Doctor } from "./doctor.model";


export class Schedule {
  constructor(
    public id: string,
    public start_time: Date,
    public end_time: Date,
    public date_only: Date,
    public day_of_week: Number,
    public doctor?: Doctor,
  ) {}
}