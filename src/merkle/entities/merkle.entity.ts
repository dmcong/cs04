import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MerkleDocument = HydratedDocument<Merkle>;

@Schema()
export class Merkle {
  @Prop()
  root: string;

  @Prop([String])
  leafs: string[];
}

export const MerkleSchema = SchemaFactory.createForClass(Merkle);
