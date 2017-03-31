import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
    private static counter = 0;

    id = 0;

    constructor() {
        this.id = SearchService.counter++;
    }
    public getXQuery(): string {
        // Todo: do all the calculations to get a correct xQuery
        return 'dummy xQuery';
    }
}
