import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { House } from './../../models/house';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() rows: number;
  @Input() cantRowsPerPage: number;
  arrayPages: number[];
  previousPage: number;
  nextPage: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.setPaginatorArrowButtons(params.page);
    });
  }

  ngOnChanges() {
    this.router.navigate(['/delivery-search', 1]);
    this.setPaginator();
  }

  /**
   * Set the pages and paginator
   */
  setPaginator(): void {
    const pages = Math.ceil(this.rows / this.cantRowsPerPage);

    this.arrayPages = Array(pages).fill(1);
  }

  /**
   * Set the exact page number to the arrow buttons on the paginator
   *
   * @param page - Number of the page
   */
  setPaginatorArrowButtons(page): void {
    if (Number(page) === 1) {
      this.previousPage = 1;
    } else {
      this.previousPage = Number(page) - 1;
    }

    if (Number(page) === this.arrayPages.length) {
      this.nextPage = this.arrayPages.length;
    } else {
      this.nextPage = Number(page) + 1;
    }
  }
}
