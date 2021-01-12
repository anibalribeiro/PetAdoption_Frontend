import { BaseEntity } from '../../shared/models/baseEntity.model';

export interface User extends BaseEntity {
  username: string;
  password: string;
  phone: string;
}
