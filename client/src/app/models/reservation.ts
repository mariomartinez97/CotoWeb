import { User } from './user';
import { Extras } from './extras';
import { Tour } from './tour'
export class Reservation {
    user: User;
    ticketAdult: number;
    ticketChildren: number;
    ticketSenior: number;
    tourId: Tour;
    extras: Extras[];
  }
