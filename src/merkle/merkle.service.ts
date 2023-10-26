import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMerkleDto } from './dto/create-merkle.dto';
import { Merkle } from './entities/merkle.entity';
import { Leaf, MerkleDistribution, Tree } from 'cs01-congdm';
import { InfuraProvider, Wallet } from 'ethers';

@Injectable()
export class MerkleService {
  constructor(@InjectModel(Merkle.name) private merkleModel: Model<Merkle>) {}
  async create(createMerkleDto: CreateMerkleDto) {
    const tree = new Tree(
      createMerkleDto.leaves.map((l) => new Leaf(l.address, BigInt(l.amount))),
    );
    const wallet = new Wallet(
      Wallet.createRandom().privateKey,
      new InfuraProvider('sepolia', '3a3c7d470c4b4d2c8e794139ef79f0d7'),
    );

    const merke = new MerkleDistribution({
      tree,
      wallet,
      contractAddress: '0xfAF2b8a2fdcd17427d08273D68180D11b932CeF6',
    });
    const root = await merke.contract.root();
    if (root !== `0x${Buffer.from(merke.tree.root.value).toString('hex')}`) {
      throw new Error('Invalid merkle root');
    }
    const createdCat = new this.merkleModel(createMerkleDto);
    return createdCat.save();
  }

  findAll() {
    return this.merkleModel.find().exec();
  }

  findOne(root: string) {
    return this.merkleModel.findOne({ root }).exec();
  }
}
