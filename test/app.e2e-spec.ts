import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Leaf, Tree } from 'cs01-congdm';

import { CreateMerkleDto } from 'src/merkle/dto/create-merkle.dto';
import { Merkle } from 'src/merkle/entities/merkle.entity';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const WALLET_ADDRESS = '0xb00B5C688cC8f68ca0aEeAE6a0ab0712d7eB2D67';

  const leaves: Leaf[] = Array.from(Array(4).keys()).map(
    (i) => new Leaf(WALLET_ADDRESS, BigInt(i + 1) * 1_000_000_000_000_000_000n),
  );
  const tree = new Tree(leaves);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect('Ok');
  });

  it('create Merkle', () => {
    const dto: CreateMerkleDto = {
      root: tree.root.toString(),
      leaves: leaves.map((l) => ({
        address: l.address,
        amount: l.amount.toString(),
      })),
    };
    return request(app.getHttpServer()).post('/merkle').send(dto).expect(201);
  });

  it('get Merkle', () => {
    return request(app.getHttpServer())
      .get(`/merkle/${tree.root.toString()}`)
      .then((result) => {
        const data: Merkle = result.body;
        const createdTree = new Tree(
          data.leaves.map((l) => new Leaf(l.address, BigInt(l.amount))),
        );
        expect(result.statusCode).toEqual(200);
        expect(createdTree.root.eq(tree.root)).toEqual(true);
      });
  });
});
