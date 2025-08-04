import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClienteDto } from './dto/create-client.dto';
import { UpdateClienteDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clienteRepository: Repository<Client>,
  ) {}

  create(data: CreateClienteDto) {
    const cliente = this.clienteRepository.create(data);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOneBy({ id });
  }

  update(id: number, data: UpdateClienteDto) {
    return this.clienteRepository.update(id, data);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
