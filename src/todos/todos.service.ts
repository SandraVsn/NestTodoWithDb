import { Injectable, NotFoundException } from '@nestjs/common';
import { Todos } from './todos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos) private todosRepository: Repository<Todos>,
  ) {}

  create(body: CreateTodoDto) {
    //create todo object and then save it
    const newTodo = this.todosRepository.create(body);
    return this.todosRepository.save(newTodo);
  }

  find() {
    return this.todosRepository.find();
  }

  findOne(id: number) {
    if (!id) return NotFoundException;
    return this.todosRepository.findOne({ where: { id } });
  }

  async update(id: number) {
    // get, check if exists, if yes update it
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todosRepository.save({ ...todo, isCompleted: true });
  }
}
