import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Class } from 'src/class/class.entity';
import { Avatar } from 'src/avatar/avatar.entity';
import { Level1 } from 'src/level-1/level-1.entity';
import { Level2 } from 'src/level-2/level-2.entity';
import { Level3 } from 'src/level-3/level-3.entity';
import { Progress } from '../../progress/progress.entity';
import { InventoryItem } from 'src/inventory/inventory.entity';
import { ShopItem } from 'src/shop/shop.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Class, classRoom => classRoom.students, { nullable: true })
  classRoom: Class;
  
@OneToOne(() => Avatar, { nullable: true })
@JoinColumn()
avatar: Avatar;

@OneToMany(() => Level1, level => level.player)
level1Progress: Level1[];

@OneToMany(() => Level2, level => level.player)
level2Progress: Level2[];

@OneToMany(() => Level3, level => level.player)
level3Progress: Level3[];

@OneToMany(() => Progress, progress => progress.player)
progress: Progress[];

@OneToMany(() => InventoryItem, inventory => inventory.player)
inventory: InventoryItem[];

@Column({ default: 0 })
coins: number;

@ManyToOne(() => ShopItem, { nullable: true })
activeAvatar: ShopItem;

}





