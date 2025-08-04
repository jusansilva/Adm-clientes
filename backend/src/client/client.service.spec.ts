import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './client.entity';

describe('ClientService', () => {
  let service: ClientService;
  let repo: typeof mockRepository;

  const mockRepository = {
    create: jest.fn().mockImplementation((data: Partial<Client>): Client => {
      return data as Client;
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    }),
    find: jest
      .fn()
      .mockResolvedValue([
        { id: 1, nome: 'Jusan', salario: 2000, empresa: '70000' },
      ]),
    findOneBy: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repo = module.get(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um cliente', async () => {
    const dto = { nome: 'Jusan', salario: 2000, empresa: '70000' };
    await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('deve listar todos os clientes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, nome: 'Jusan', salario: 2000, empresa: '70000' },
    ]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('deve buscar um cliente por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      nome: 'Jusan',
      salario: 2000,
      empresa: '70000',
    });
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('deve atualizar um cliente', async () => {
    const dto = { nome: 'Novo', salario: 3000, empresa: '80000' };
    await service.update(1, dto);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve remover um cliente', async () => {
    await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
