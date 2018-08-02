import { Component, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SecuritySearchService } from '../services/security-search.service'
import { SecurityData } from '../models/security-data';

@Component({
  selector: 'br-security-finder',
  templateUrl: './templates/security-finder.component.html',
  styleUrls: ['./styles/security-finder.component.css'],
})
export class SecurityFinderComponent {
  @Output() onSelected = new EventEmitter<SecurityData>();

  securities: Observable<SecurityData[]>;
  private searchTerms = new Subject<string>();

  constructor(private securitySearchService: SecuritySearchService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.securities = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.securitySearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<SecurityData[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log('error');
        return Observable.of<SecurityData[]>([]);
      });
  }

  public selectSecurity(security: SecurityData): void {
    this.onSelected.emit(security);
    this.searchTerms.next(null);
  }

  public onFocusOut(): void {
    this.searchTerms.next(null);
  }

  public onFocus(term: string): void {
    if (term) {
      this.searchTerms.next(term);
    }
  }
}
