import { Portfolio } from '../model/portfolio';
import { Price } from '../model/price';
import { PriceMap } from '../model/price-map';
import { DataPoint } from '../model/data-point';

export class ReturnCalculator {

  public static calculateReturns(prices: DataPoint[]): DataPoint[] {
    let result: DataPoint[] = [];

    for (let i = 0; i < prices.length; i++) {
      result.push({
        date: prices[i].date,
        close: (i == 0) ? 0 : prices[i].close / prices[i - 1].close - 1
      });
    }

    return result;
  }

  public static calculatePortfolioHistoricalReturn(portfolio: Portfolio, priceMap: PriceMap): DataPoint[] {
    let result: DataPoint[] = [];
    let datesLoaded: boolean = false;

    portfolio.items.forEach((item) => {
      priceMap[item.symbol] = priceMap[item.symbol].map((price) => {
        if (!datesLoaded) {
          result.push({ date: price.date, close: 0 });
        }
        price.close *= item.shares;
        return price;
      });
      datesLoaded = true;
    });

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < portfolio.items.length; j++) {
        result[i].close += priceMap[portfolio.items[j].symbol][i].close;
      }
    }

    return this.calculateReturns(result);
  }
}
