import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { House } from './../../models/house';

@Component({
  selector: 'app-grid-sort',
  templateUrl: './grid-sort.component.html'
})
export class GridSortComponent implements OnInit {
  @Input() data: House[];
  @Input() column: object;
  sortDirection: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.sortDirection = 0;
  }

    /**
   * Sort the column alphabetically by pressing the sort button
   *
   * @param column - Name of the column
   */
  sortColumn(column, sortDirection): any {
    this.data.sort(function(a, b) {
      const x = a[column].toLowerCase();
      const y = b[column].toLowerCase();

      if (sortDirection === 1) {
        return (y).localeCompare(x);
      } else {
        return (x).localeCompare(y);
      }
    });

    if (this.sortDirection === 1) {
      this.sortDirection = 2;
    } else {
      this.sortDirection = 1;
    }

    this.router.navigate(['/delivery-search', 1]);
  }
}
