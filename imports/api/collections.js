import { Mongo } from 'meteor/mongo';

export const Bins = new Mongo.Collection('bins');
export const Wastes = new Mongo.Collection('wastes');
export const Days = new Mongo.Collection('days');
export const Ethereum = new Mongo.Collection('ethereum');
