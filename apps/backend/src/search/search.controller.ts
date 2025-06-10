import { Controller, Get, Query } from '@nestjs/common';
import { SearchService, SearchResult } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // This is the ONLY method we need in this controller.
  // It now explicitly returns an array of our safe SearchResult objects.
  @Get()
  search(@Query('q') query: string): SearchResult[] {
    return this.searchService.searchParts(query);
  }
}
