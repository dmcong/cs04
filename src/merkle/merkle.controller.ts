import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerkleService } from './merkle.service';
import { CreateMerkleDto } from './dto/create-merkle.dto';
import { UpdateMerkleDto } from './dto/update-merkle.dto';

@Controller('merkle')
export class MerkleController {
  constructor(private readonly merkleService: MerkleService) {}

  @Post()
  create(@Body() createMerkleDto: CreateMerkleDto) {
    return this.merkleService.create(createMerkleDto);
  }

  @Get()
  findAll() {
    return this.merkleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merkleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerkleDto: UpdateMerkleDto) {
    return this.merkleService.update(+id, updateMerkleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merkleService.remove(+id);
  }
}
