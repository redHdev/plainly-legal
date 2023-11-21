import {
    type Product,
    type Prices
} from '@prisma/client';

export interface FullProducts extends Product {
    price: Prices[];
  }