import * as mongo from 'mongodb';
import { PriceMap } from './model/price-map';
import { FeatureList } from './model/featurelist';
import {Reservation } from './model/reservation';

export class Database {
  private db: mongo.Db;

  constructor() {
    this.connect();
  }

  public connect() {
    mongo.MongoClient.connect('mongodb://MarioMartinez:m4adv1970@ds129166.mlab.com:29166/test_control',
      (err: mongo.MongoError, db: mongo.Db) => {
        if (err) {
          console.log('Error connecting to Mongo');
          process.exit(1);
        }
        this.db = db;
        console.log('Connected to Mongo');
      });
  }

  public cotizacion(uid: string, cotizaciones: any, success: (cotizaciones) => void, error: () => void): void {
    cotizaciones['uid'] = uid;
    this.db.collection('cotizaciones').insert(cotizaciones)
      // .then(success)
      .then(writeOpResult => success(writeOpResult))
      .catch(error);
  }

  public getEquipment(success: (collection: any[]) => void, error:() => void): void {
    this.db.collection('equipment').find().toArray((err: mongo.MongoError, docs: any) => {
      if(err) {
        console.log(err);
      } else {
        success(docs)
      }
    });
  }

  public getFeatures(success: (collection: any[]) => void, error: () => void): void {
    this.db.collection('features').find().toArray((err: mongo.MongoError, docs: any) => {
      if (err) {
        console.log(err);
        error();
      } else {
        success(docs);
      }
    });
  }

 public getTourById(tourID: string, success: (collection: any[]) => void, error: () => void): void {
    this.db.collection('tours').find({tourId : tourID}).toArray((err: mongo.MongoError, docs: any) => {
      if (err) {
        error();
      } else {
        success(docs);
      }
    });
  }
  public getReservation(ID: string, success: (collection: any[]) => void, error: () => void): void {
    this.db.collection('reservations').find({uid : ID}).toArray((err: mongo.MongoError, docs: any[]) => {
      if (err) {
        error();
      } 
      else {
        docs.forEach(item => item['id'] = item._id);
        success(docs);
      }
    });
  }


  public getCotizaciones(uid: string, success: (collection: any[]) => void, error: () => void): void {
    this.db.collection('cotizaciones').find().toArray((err: mongo.MongoError, docs: any[]) => {
      if (err) {
        error();
      } else {
        docs.forEach(item => item['id'] = item._id);
        success(docs);
      }
    });
  }

  public createReservation(uid: string, reservation: any, success: (reservation) => void, error: () => void): void {
    reservation['uid'] = uid;
    this.db.collection('reservations').insert(reservation)
      .then(writeOpResult => success(writeOpResult))
      .catch(error);
  } 


  // public getSecurityDetails(ticker: string, success: (doc: any) => void, error: () => void): void {
  //     this.db.collection('securities').findOne({ ticker: ticker }, (err: mongo.MongoError, doc: any) => {
  //       if (err) {
  //         error();
  //       } else {
  //         this.db.collection('prices').find({ symbol: ticker }).sort({ date: -1 }).limit(2)
  //           .toArray((err, prices) => {
  //             if (err) {
  //               error();
  //             } else {
  //               doc['lastPrices'] = [];
  //               prices.forEach(price => doc['lastPrices'].push(price));
  //               success(doc);
  //             }
  //           });
  //       }
  //     });
  //   }

  // public getSecurityPrices(ticker: string, success: (collection: any[]) => void, error: () => void): void {
  //   this.db.collection('prices').find({ symbol: ticker }).toArray((err: mongo.MongoError, docs: any) => {
  //     if (err) {
  //       error();
  //     } else {
  //       success(docs);
  //     }
  //   });
  // }

  // public getPortfolioById(uid: string, id: string, success: (portfolio: Portfolio) => void, error: () => void): void {
  //   this.db.collection('portfolios')
  //     .findOne({ uid: uid, _id: new mongo.ObjectID(id) }, (err: mongo.MongoError, doc: any) => {
  //       if (err) {
  //         error();
  //       } else {
  //         doc['id'] = doc._id;
  //         success(doc);
  //       }
  //     });
  // }

  // public getPortfolios(uid: string, success: (collection: any[]) => void, error: () => void): void {
  //   this.db.collection('portfolios').find({ uid: uid }).toArray((err: mongo.MongoError, docs: any[]) => {
  //     if (err) {
  //       error();
  //     } else {
  //       docs.forEach(item => item['id'] = item._id);
  //       success(docs);
  //     }
  //   });
  // }

  // public createPortfolio(uid: string, portfolio: any, success: (portfolio) => void, error: () => void): void {
  //   portfolio['uid'] = uid;
  //   this.db.collection('portfolios').insert(portfolio)
  //     // .then(success)
  //     .then(writeOpResult => success(writeOpResult))
  //     .catch(error);
  // }

  // public updatePortfolio(uid: string, portfolio: any, success: () => void, error: () => void): void {
  //   portfolio['uid'] = uid;
  //   portfolio._id = new mongo.ObjectID(portfolio.id);
  //   delete portfolio.id;
  //   this.db.collection('portfolios').update({ uid: uid, _id: portfolio._id }, portfolio)
  //     .then(success)
  //     .catch(error);
  // }

  // public deletePortfolio(uid: string, id: any, success: () => void, error: () => void): void {
  //   this.db.collection('portfolios').deleteOne({ uid: uid, _id: new mongo.ObjectID(id) })
  //     .then(success)
  //     .catch(error);
  // }
}
