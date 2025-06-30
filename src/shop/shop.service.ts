import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private shopRepo: Repository<ShopItem>,
  ) {}

  findAll() {
    return this.shopRepo.find();
  }

  create(item: Partial<ShopItem>) {
    return this.shopRepo.save(item);
  }
}
