import { User } from './user';
import { Tours } from './tours';
import { Equipment } from './equipment';

export class Reservation {
    user: User;
    tour: Tours;
    equipment: Equipment[];
    priceTotal: string;
  }
  
  
  