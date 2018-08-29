import { PInfo } from './user';
import { Tours } from './tours';
import { Equipment } from './equipment';

export class Reservation {
    //user: PInfo;    
    _id: string;
    tour: any;
    equipment: Equipment[];
    priceTotal: string;
    uid: any;
  }