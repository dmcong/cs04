import { Module } from '@nestjs/common';
import { MerkleService } from './merkle.service';
import { MerkleController } from './merkle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merkle, MerkleSchema } from './entities/merkle.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Merkle.name, schema: MerkleSchema }]),
  ],
  controllers: [MerkleController],
  providers: [MerkleService],
})
export class MerkleModule {}
