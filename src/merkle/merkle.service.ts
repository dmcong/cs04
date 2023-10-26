import { Injectable } from '@nestjs/common';
import { CreateMerkleDto } from './dto/create-merkle.dto';
import { UpdateMerkleDto } from './dto/update-merkle.dto';

@Injectable()
export class MerkleService {
  create(createMerkleDto: CreateMerkleDto) {
    return 'This action adds a new merkle';
  }

  findAll() {
    return `This action returns all merkle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merkle`;
  }

  update(id: number, updateMerkleDto: UpdateMerkleDto) {
    return `This action updates a #${id} merkle`;
  }

  remove(id: number) {
    return `This action removes a #${id} merkle`;
  }
}
