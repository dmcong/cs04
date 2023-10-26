import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMerkleDto } from './dto/create-merkle.dto';
import { Merkle } from './entities/merkle.entity';

@Injectable()
export class MerkleService {
  constructor(@InjectModel(Merkle.name) private catModel: Model<Merkle>) {}
  create(createMerkleDto: CreateMerkleDto) {
    const createdCat = new this.catModel(createMerkleDto);
    return createdCat.save();
  }

  findAll() {
    return `This action returns all merkle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merkle`;
  }
}
