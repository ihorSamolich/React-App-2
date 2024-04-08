import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma.service';

describe('HistoryController (e2e)', () => {
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

  beforeEach(async () => {
    await prismaService.history.deleteMany({});
    await prismaService.task.deleteMany({});
    await prismaService.list.deleteMany({});
    await prismaService.board.deleteMany({});

    const { id: boardId } = await prismaService.board.create({ data: { name: 'Test Board' } });
    const { id: listId } = await prismaService.list.create({ data: { name: 'Test List', boardId } });

    await prismaService.task.create({
      data: { name: 'Test Task', listId: listId, dueDate: new Date(), description: 'Test desc', priorityId: 1 },
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('/history/board/:boardId (GET)', async () => {
    const board = await prismaService.board.findFirst({ where: { name: 'Test Board' } });
    const boardId = board.id;
    return request(app.getHttpServer())
      .get(`/history/board/${boardId}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/history/:id (GET)', async () => {
    const task = await prismaService.task.findFirst({ where: { name: 'Test Task' } });
    const taskId = task.id;

    return request(app.getHttpServer())
      .get(`/history/${taskId}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
