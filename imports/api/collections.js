import { Mongo } from 'meteor/mongo';

export const Bins = new Mongo.Collection('bins');
export const Wastes = new Mongo.Collection('wastes');
export const Days = new Mongo.Collection('days');

Bins.attachSchema(new SimpleSchema({
  binName: {
    type: String,
    label: "Name",
    max: 50
  },
  binWeight: {
    type: Number,
    min: 0,
    label: "Weight of the bin"
  },
  wasteType: {
    type: String,
    label: "Type of waste in the bin",
    max: 50
  }
}));
