import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchSubmitted: EventEmitter<string> = new EventEmitter<string>();
  formSearch: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formSearch = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  submitSearch(): void {
    const searchTerm = this.formSearch.get('searchTerm')?.value;
    this.searchSubmitted.emit(searchTerm);
  }
}
