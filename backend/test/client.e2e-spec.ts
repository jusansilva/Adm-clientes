import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;
  let clienteId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /client - deve criar um cliente', async () => {
    const res = await request(app.getHttpServer())
      .post('/client')
      .send({ nome: 'Jusan', salario: 2000, empresa: '70000' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Jusan');
    clienteId = res.body.id;
  });

  it('GET /client - deve listar clientes', async () => {
    const res = await request(app.getHttpServer()).get('/client').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((c: any) => c.id === clienteId)).toBe(true);
  });

  it('DELETE /client/:id - deve excluir cliente', async () => {
    await request(app.getHttpServer())
      .delete(`/client/${clienteId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
