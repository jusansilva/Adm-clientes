import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockService = {
    create: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    }),
    findAll: jest
      .fn()
      .mockResolvedValue([
        { id: 1, nome: 'Jusan', salario: 2000, empresa: '70000' },
      ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{ provide: ClientService, useValue: mockService }],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um cliente', async () => {
    const dto = { nome: 'Jusan', salario: 2000, empresa: '70000' };
    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve listar todos os clientes', async () => {
    expect(await controller.findAll()).toEqual([
      { id: 1, nome: 'Jusan', salario: 2000, empresa: '70000' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve buscar um cliente por id', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve atualizar um cliente', async () => {
    const dto = { nome: 'Novo', salario: 3000, empresa: '80000' };
    expect(await controller.update('1', dto)).toEqual({ affected: 1 });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve remover um cliente', async () => {
    expect(await controller.remove('1')).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
