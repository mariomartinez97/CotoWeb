import { PInfo } from './user';
import { Tours } from './tours';
import { Equipment } from './equipment';

export class Reservation {
    //user: PInfo;    
    tour: Tours;
    equipment: Equipment[];
    priceTotal: string;
    uid: any;
  }
  
  
  