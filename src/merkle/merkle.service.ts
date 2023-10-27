import { Tree, Leaf } from 'cs01-congdm';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMerkleDto } from './dto/create-merkle.dto';
import { Merkle } from './entities/merkle.entity';

@Injectable()
export class MerkleService {
  constructor(@InjectModel(Merkle.name) private merkleModel: Model<Merkle>) {}
  async create(createMerkleDto: CreateMerkleDto) {
    // TODO: create
    const tree = new Tree(
      createMerkleDto.leaves.map((leaf) => {
        return new Leaf(leaf.address, BigInt(leaf.amount));
      }),
    );
    if (tree.root.toString() !== createMerkleDto.root) {
      throw new Error('Invalid root');
    }
    const createdMerkle = new this.merkleModel(createMerkleDto);
    return createdMerkle.save();
  }

  findAll() {
    return this.merkleModel.find().exec();
  }

  findOne(root: string) {
    return this.merkleModel.findOne({ root }).exec();
  }
}
