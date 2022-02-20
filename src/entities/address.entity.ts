import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { LocationInfo } from '../types/locationInfo.type';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column('json', { nullable: false })
  info: LocationInfo;
}
