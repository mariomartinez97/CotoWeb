import { PInfo } from './user';
import { Tours } from './tours';
import { Equipment } from './equipment';

export class Reservation {
    //user: PInfo;    
    _id: string;
    tour: Tours;
    equipment: Equipment[];
    priceTotal: string;
    uid: any;
    totalTour: any;
    totalEquip: any;
    date: Date;
  }