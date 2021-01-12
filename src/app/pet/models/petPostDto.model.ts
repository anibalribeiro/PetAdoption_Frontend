import { CategoryEnum } from './categoryEnum.model';

export interface PetPostDto {
  name: string;
  age?: number;
  category?: CategoryEnum;
  description: string;
  userId: number;
  photo: string;
}
