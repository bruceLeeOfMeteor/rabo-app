import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();

  query = new FormControl('');
  formSubscription: Subscription;

  ngOnInit(): void {
    this.formSubscription = this.query.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(query => this.onQueryChanged(query));
  }
  onQueryChanged(query: string) {
    this.searched.emit(query);
  }
}
