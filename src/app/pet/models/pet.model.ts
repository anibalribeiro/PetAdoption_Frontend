import { CategoryEnum } from './categoryEnum.model';
import { BaseEntity } from '../../shared/models/baseEntity.model';

export interface Pet extends BaseEntity {
  name: string;
  age?: number;
  category?: CategoryEnum;
  description: string;
  user: {
    id: number;
    username: string;
    phone: string;
  };
  photo: string;
  active?: boolean;
}
