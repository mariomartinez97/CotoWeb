import { Price } from './price';

export class SecurityData {
  ticker: string;
  security: string;
  sector: string;
  industry: string;
  lastPrices: Price[];
}
