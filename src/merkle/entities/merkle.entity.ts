import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MerkleDocument = HydratedDocument<Merkle>;

@Schema()
export class Merkle {
  @Prop()
  root: string;

  @Prop({
    type: [{ address: { type: String }, amount: { type: String } }],
    _id: false,
  })
  leaves: { address: string; amount: string }[];
}

export const MerkleSchema = SchemaFactory.createForClass(Merkle);
