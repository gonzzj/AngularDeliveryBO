import { Component, OnInit } from '@angular/core';
import { HouseService } from './../../services/house.service';
import { House } from './../../models/house';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  houses: House[];
  housesSearchResult: House[];
  inputName: string;
  inputAddress: string;
  columnsOptions: any[] = [
    {
      title: 'Nombre',
      field: 'name',
      orderable: true
    },
    {
      title: 'Dirección',
      field: 'address',
      orderable: true
    },
    {
      title: 'Horario de cierre',
      field: 'hourMax'
    }
  ];

  constructor(private houseService: HouseService) { }

  ngOnInit() {
    this.getHouses();
    this.inputName = '';
    this.inputAddress = '';
    this.searchHouses();
  }

  /**
   * Get all the delivery houses
   */
  getHouses(): void {
    this.houseService.getHouses()
      .subscribe(houses => this.houses = houses);
  }

  /**
   * Set a name variable in order to start the search functionality
   *
   * @param value - Input name
   */
  addSearchByName(value): void {
    this.inputName = value;
    this.searchHouses();
  }

  /**
   * Set an address variable in order to start the search functionality
   *
   * @param value - Input name
   */
  addSearchByAddress(value): void {
    this.inputAddress = value;
    this.searchHouses();
  }

  /**
   * Search delivery houses by name and address using the variables of above
   */
  searchHouses(): void {
    const houseResults = [];
    const inputName = this.inputName.toLowerCase();
    const inputAddress = this.inputAddress.toLowerCase();

    for (const house of this.houses) {
      if (house['name'].toLowerCase().search(inputName) !== -1 && house['address'].toLowerCase().search(inputAddress) !== -1) {
        houseResults.push(house);
      }
    }

    this.housesSearchResult = houseResults;
  }
}
