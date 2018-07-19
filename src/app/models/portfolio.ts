import { PortfolioItem } from './portfolio-item';
import { Price } from './price';

export class Portfolio {
  id: string;
  name: string;
  items: PortfolioItem[];
  returns: Price[];
}
