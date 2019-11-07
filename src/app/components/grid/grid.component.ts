import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { House } from './../../models/house';
import { HouseService } from './../../services/house.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {
  @Input() data: House[];
  @Input() cantRowsPerPage: number;
  @Input() columns: object;
  rowsMin: number;
  rowsMax: number;

  constructor(private houseService: HouseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rowsMin = 0;
    this.rowsMax = this.cantRowsPerPage;

    this.route.params.subscribe((params: Params) => {
      if (params.page !== undefined) {
        this.changePage(params.page);
      }
    });
  }

  /**
   * Change the page and show new rows
   *
   * @param page - Page number
   */
  changePage(page): void {
    this.rowsMin = (page - 1) * this.cantRowsPerPage;
    this.rowsMax = page * this.cantRowsPerPage;
  }

  /**
   * Open a confirmation popup in order to remove a delivery house
   *
   * @param id
   * @param name - Name of the delivery house
   */
  removeHouse(id, name): void {
    if (confirm('¿Seguro que quieres eliminar el delivery: ' + name + '?')) {
      this.data = this.houseService.removeHouse(id);
    }
  }
}
