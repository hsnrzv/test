import { ProductType } from '@app/domain/enums/product-type';
import { User } from '@app/domain/api-response/user-response.model';

export interface Garden {
  address: string;
  bookedDate: string[];
  description: string;
  id: string;
  images: string[];
  owner: User;
  productTypes: ProductType[];
  rate?: number;
  rule: GardenRule;
  title: string;
}

interface GardenRule {
  events: boolean;
  numberOfGuest: number;
  pets: boolean;
}
