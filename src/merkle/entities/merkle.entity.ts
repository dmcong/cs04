import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MerkleDocument = HydratedDocument<Merkle>;

@Schema()
export class Merkle {
  @Prop({ required: true, unique: true })
  root: string;

  @Prop({
    type: [{ address: { type: String }, amount: { type: String } }],
    _id: false,
    required: true,
  })
  leaves: { address: string; amount: string }[];
}

export const MerkleSchema = SchemaFactory.createForClass(Merkle);
