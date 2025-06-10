import { Injectable } from '@nestjs/common';
import * as supplierDataJson from '../data/supplier_data.json';

interface SupplierPart {
  partNumber: string;
  name: string;
  brand: string;
  b2bPrice: number;
  stock: number;
  supplier: string;
}

export interface SearchResult {
  partNumber: string;
  name: string;
  brand: string;
}

const supplierData: SupplierPart[] = supplierDataJson as SupplierPart[];

@Injectable()
export class SearchService {
  searchParts(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const lowercasedQuery = query.toLowerCase();

    const results = supplierData.filter(
      (part) =>
        part.name.toLowerCase().includes(lowercasedQuery) ||
        part.brand.toLowerCase().includes(lowercasedQuery) ||
        part.partNumber.toLowerCase().includes(lowercasedQuery),
    );

    // The fix is here. We wrap the object literal `{...}` in parentheses `()`.
    return results.slice(0, 10).map((part) => ({
      name: part.name,
      brand: part.brand,
      partNumber: part.partNumber,
    }));
  }
}
