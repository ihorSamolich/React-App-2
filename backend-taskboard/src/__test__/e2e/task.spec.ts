import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../../prisma.service';
import { AppModule } from '../../app.module';
import { CreateTaskDto } from '../../task/dto/create-task.dto';

describe('TaskController (e2e)', () => {
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
    await prismaService.list.create({ data: { name: 'Test List', boardId } });
  });

  afterEach(async () => {
    await app.close();
  });

  it('/task (POST)', async () => {
    const list = await prismaService.list.findFirst({ where: { name: 'Test List' } });
    const listId = list.id;

    const createTaskDto: CreateTaskDto = {
      dueDate: new Date(),
      listId: listId,
      priorityId: 1,
      name: 'Test Task',
      description: 'Test description',
    };
    return request(app.getHttpServer())
      .post('/task')
      .send(createTaskDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(createTaskDto.name);
        expect(res.body.description).toBe(createTaskDto.description);
        expect(res.body.dueDate).toBe(createTaskDto.dueDate.toISOString());
        expect(res.body.listId).toBe(createTaskDto.listId);
      });
  });

  it('/task (GET)', async () => {
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/task/:id (GET)', async () => {
    const list = await prismaService.list.findFirst({ where: { name: 'Test List' } });
    const listId = list.id;

    const task = await prismaService.task.create({
      data: {
        dueDate: new Date(),
        listId: listId,
        priorityId: 1,
        name: 'Test Task',
        description: 'Test description',
      },
    });

    return request(app.getHttpServer())
      .get(`/task/${task.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(task.name);
        expect(res.body.description).toBe(task.description);
      });
  });

  it('/task/:id (DELETE)', async () => {
    const list = await prismaService.list.findFirst({ where: { name: 'Test List' } });
    const listId = list.id;

    const task = await prismaService.task.create({
      data: {
        dueDate: new Date(),
        listId: listId,
        priorityId: 1,
        name: 'Test Task',
        description: 'Test description',
      },
    });

    return request(app.getHttpServer())
      .delete(`/task/${task.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(task.id);
        expect(res.body.name).toBe(task.name);
        expect(res.body.description).toBe(task.description);
      });
  });
});
