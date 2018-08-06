import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as cors from 'cors';
import * as expressJwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import * as jwtAuthz from "express-jwt-authz";
import * as jwt from "jsonwebtoken";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { Database } from './database';
import { ReturnCalculator } from './math/return-calculator';
import { PriceMap } from './model/price-map';
import { DataPoint } from './model/data-point';

export class Server {
  public app: express.Application;
  private checkJwt: expressJwt.RequestHandler;
  private db: Database;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.db = new Database();
    this.configureAuth();
    this.routes();
  }

  private configureAuth(): void {
    this.checkJwt = expressJwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://cotoweb.auth0.com/.well-known/jwks.json'
      }),

      audience: 'https://cotowebAPI.com',
      issuer: 'https://cotoweb.auth0.com/',
      algorithms: ['RS256']
    })
  }

  private routes(): void {


      this.app.post('/cotizaciones', (req: express.Request, res: express.Response) => {
        this.db.cotizacion(
          req.user.sub, req.body, (opRes) => res.json(opRes.insertedIds[0]), () => res.sendStatus(400)
      );
    });

    // this.app.get('/cotizaciones', (req: express.Request, res: express.Response) => {
    //   this.db.getCotizaciones(
    //     (result: any[]) => res.json(result),
    //     () => res.sendStatus(400),
    //     req.query.q ? req.query.q.replace(/[^\w\s]/gi, '') : null
    //   );
    // });


    // this.app.get('/cotizaciones', this.checkJwt, (req: express.Request, res: express.Response) => {
    //   this.db.getCotizaciones(
    //     (result: any[]) => res.json(result), () => res.sendStatus(400), req.user.sub, 
    //   )
    // });

    this.app.get('/cotizaciones', this.checkJwt, (req: express.Request, res: express.Response) => {
      this.db.getCotizaciones(
        req.user.sub, (result: any[]) => res.json(result), () => res.sendStatus(400)
      )
    }); 


    //     this.app.get('/cotizacion/:id/returns', this.checkJwt, (req: express.Request, res: express.Response) => {
    //   this.db.getPortfolioById(req.user.sub, req.params.id,
    //     (portfolio) => {
    //       let priceMap: PriceMap = { };
    //       let itemsProcessed = 0;
    //       portfolio.items.forEach(
    //         (item) => this.db.getSecurityPrices(
    //           item.symbol, (prices) => {
    //             priceMap[item.symbol] = prices;
    //             itemsProcessed++;
    //             if (itemsProcessed === portfolio.items.length) {
    //               res.json(ReturnCalculator.calculatePortfolioHistoricalReturn(portfolio, priceMap));
    //             }
    //           },
    //           () => res.sendStatus(400)
    //         )
    //       );
    //     },
    //     () => res.sendStatus(400));
    // });


  //   this.app.get('/securities', (req: express.Request, res: express.Response) => {
  //     this.db.getSecurities(
  //       (result: any[]) => res.json(result),
  //       () => res.sendStatus(400),
  //       req.query.q ? req.query.q.replace(/[^\w\s]/gi, '') : null
  //     );
  //   });

  //   this.app.get('/securities/:ticker', (req: express.Request, res: express.Response) => {
  //     this.db.getSecurityDetails(
  //       req.params.ticker, (doc: any) => res.json(doc), () => res.sendStatus(400)
  //     );
  //   });

  //   this.app.get('/securities/:ticker/prices', (req: express.Request, res: express.Response) => {
  //     this.db.getSecurityPrices(
  //       req.params.ticker, (result: any[]) => res.json(result), () => res.sendStatus(400)
  //     );
  //   });

  //   this.app.get('/portfolios', this.checkJwt, (req: express.Request, res: express.Response) => {
  //     this.db.getPortfolios(
  //       req.user.sub, (result: any[]) => res.json(result), () => res.sendStatus(400)
  //     )
  //   });

  //   this.app.post('/portfolios', this.checkJwt, (req: express.Request, res: express.Response) => {
  //     this.db.createPortfolio(
  //       req.user.sub, req.body, (opRes) => res.json(opRes.insertedIds[0]), () => res.sendStatus(400)
  //     );
  //   });

  //   this.app.put('/portfolios', this.checkJwt, (req: express.Request, res: express.Response) => {
  //     this.db.updatePortfolio(
  //       req.user.sub, req.body, () => res.sendStatus(200), () => res.sendStatus(400)
  //     );
  //   });

  //   this.app.delete('/portfolios/:id', this.checkJwt, (req: express.Request, res: express.Response) => {
  //     this.db.deletePortfolio(
  //       req.user.sub, req.params.id, () => res.sendStatus(200), () => res.sendStatus(400)
  //     );
  //   });

  //   this.app.get('/portfolios/:id/returns', this.checkJwt, (req: express.Request, res: express.Response) => {
  //     this.db.getPortfolioById(req.user.sub, req.params.id,
  //       (portfolio) => {
  //         let priceMap: PriceMap = { };
  //         let itemsProcessed = 0;
  //         portfolio.items.forEach(
  //           (item) => this.db.getSecurityPrices(
  //             item.symbol, (prices) => {
  //               priceMap[item.symbol] = prices;
  //               itemsProcessed++;
  //               if (itemsProcessed === portfolio.items.length) {
  //                 res.json(ReturnCalculator.calculatePortfolioHistoricalReturn(portfolio, priceMap));
  //               }
  //             },
  //             () => res.sendStatus(400)
  //           )
  //         );
  //       },
  //       () => res.sendStatus(400));
  //   });
   }
}
