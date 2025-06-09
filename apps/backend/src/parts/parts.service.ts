// file: apps/backend/src/parts/parts.service.ts
import { Injectable } from '@nestjs/common';
import { Part } from '@fullsend/types';
import * as supplierDataJson from '../data/supplier_data.json';

interface SupplierPart {
  partNumber: string;
  name: string;
  brand: string;
  b2bPrice: number;
  stock: number;
  supplier: string;
}

const supplierData: SupplierPart[] = supplierDataJson as SupplierPart[];

interface FindPartsQuery {
  model: string;
  year: string;
  engine: string;
}

@Injectable()
export class PartsService {
  private readonly MARKUP = 1.35;

  findAll(query: FindPartsQuery): Part[] {
    console.log('Searching for parts with query:', query);

    let compatiblePartNumbers: string[] = [];
    if (query.model.toLowerCase() === 'golf') {
      compatiblePartNumbers = ['VW-GOLF-BRK-1', 'VW-GOLF-FLT-1'];
    } else if (query.model.toLowerCase() === 'a4') {
      compatiblePartNumbers = ['AUDI-A4-BRK-1'];
    }

    const availableParts = supplierData.filter((supplierPart) =>
      compatiblePartNumbers.includes(supplierPart.partNumber),
    );

    const finalPartsResult: Part[] = availableParts.map(
      (supplierPart, index) => {
        const finalPrice = supplierPart.b2bPrice * this.MARKUP;
        return {
          id: `<span class="math-inline">{supplierPart.supplier}-</span>{supplierPart.partNumber}-${index}`, // Corrected line
          partNumber: supplierPart.partNumber,
          name: supplierPart.name,
          brand: supplierPart.brand,
          description: `Kvalitetan deo od proizvođača ${supplierPart.brand}.`,
          imageUrl: `https://placehold.co/600x400?text=${supplierPart.brand}`,
          price: parseFloat(finalPrice.toFixed(2)),
          stockStatus: supplierPart.stock > 0 ? 'Na stanju' : 'Nema na stanju',
        };
      },
    );
    return finalPartsResult;
  }
}
