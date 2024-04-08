import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { PrismaService } from '../../prisma.service';

describe('BoardController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.history.deleteMany({});
    await prismaService.task.deleteMany({});
    await prismaService.list.deleteMany({});
    await prismaService.board.deleteMany({});
  });

  it('/POST board', async () => {
    const createBoardDto = { name: 'Test Board' };
    return request(app.getHttpServer())
      .post('/board')
      .send(createBoardDto)
      .expect(201)
      .then((response) => {
        expect(response.body.name).toBe(createBoardDto.name);
      });
  });

  it('/POST board name empty', async () => {
    const createBoardDto = { name: '' };
    return request(app.getHttpServer()).post('/board').send(createBoardDto).expect(404);
  });

  it('/GET boards', async () => {
    await prismaService.board.create({ data: { name: 'Test Board' } });

    return request(app.getHttpServer())
      .get('/board')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('Test Board');
      });
  });

  it('/GET board/:id', async () => {
    const createdBoard = await prismaService.board.create({ data: { name: 'Test Board' } });

    return request(app.getHttpServer())
      .get(`/board/${createdBoard.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(createdBoard.id);
        expect(response.body.name).toBe(createdBoard.name);
      });
  });

  it('/PATCH board/:id', async () => {
    const createdBoard = await prismaService.board.create({ data: { name: 'Test Board' } });
    const updateBoardDto = { name: 'Updated Board' };
    return request(app.getHttpServer())
      .patch(`/board/${createdBoard.id}`)
      .send(updateBoardDto)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(createdBoard.id);
        expect(response.body.name).toBe(updateBoardDto.name);
      });
  });

  it('/DELETE board/:id', async () => {
    const createdBoard = await prismaService.board.create({ data: { name: 'Test Board' } });

    return request(app.getHttpServer())
      .delete(`/board/${createdBoard.id}`)
      .expect(200)
      .then(async () => {
        const deletedBoard = await prismaService.board.findUnique({ where: { id: createdBoard.id } });
        expect(deletedBoard).toBeNull();
      });
  });
});
