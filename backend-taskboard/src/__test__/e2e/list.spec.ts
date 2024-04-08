import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma.service';

describe('ListController (e2e)', () => {
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

    await prismaService.board.create({ data: { name: 'Test Board' } });
  });

  it('/list (POST)', async () => {
    const board = await prismaService.board.findFirst({ where: { name: 'Test Board' } });
    const boardId = board.id;

    return request(app.getHttpServer())
      .post('/list')
      .send({ name: 'Test List', boardId: boardId })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('Test List');
      });
  });

  it('/list (GET)', async () => {
    return request(app.getHttpServer())
      .get('/list')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/list/:id (GET)', async () => {
    const board = await prismaService.board.findFirst({ where: { name: 'Test Board' } });
    const boardId = board.id;
    await prismaService.list.create({ data: { name: 'Test List', boardId: boardId } });

    return request(app.getHttpServer())
      .get(`/list/${board.id}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/list/:id (PATCH)', async () => {
    const board = await prismaService.board.findFirst({ where: { name: 'Test Board' } });
    const boardId = board.id;

    const createdList = await prismaService.list.create({ data: { name: 'Test List', boardId: boardId } });

    return request(app.getHttpServer())
      .patch(`/list/${createdList.id}`)
      .send({ name: 'Updated List' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Updated List');
      });
  });

  it('/list/:id (DELETE)', async () => {
    const board = await prismaService.board.findFirst({ where: { name: 'Test Board' } });
    const boardId = board.id;

    const createdList = await prismaService.list.create({ data: { name: 'Test List', boardId: boardId } });

    return request(app.getHttpServer())
      .delete(`/list/${createdList.id}`)
      .expect(200)
      .then(async () => {
        const deletedList = await prismaService.board.findUnique({ where: { id: createdList.id } });
        expect(deletedList).toBeNull();
      });
  });
});
