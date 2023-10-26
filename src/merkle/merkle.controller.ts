import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MerkleService } from './merkle.service';
import { CreateMerkleDto } from './dto/create-merkle.dto';

@Controller('merkle')
export class MerkleController {
  constructor(private readonly merkleService: MerkleService) {}

  @Post()
  create(@Body() createMerkleDto: CreateMerkleDto) {
    console.log('createMerkleDto', createMerkleDto);
    return this.merkleService.create(createMerkleDto);
  }

  @Get()
  findAll() {
    return this.merkleService.findAll();
  }

  @Get(':root')
  findOne(@Param('root') root: string) {
    return this.merkleService.findOne(root);
  }
}
