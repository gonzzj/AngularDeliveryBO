import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { House } from './../models/house';
import { HOUSES } from './../mocks/mock-houses';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor() { }

  /**
   * Add a new delivery house to the mock of delivery Houses
   *
   * @param house - New delivery house
   */
  setHouse(house: House): any {
    let i = -1;
    for (const item of HOUSES) {
      i++;
      if (item.id === house.id) {
        return HOUSES[i] = house;
      }
    }
    return HOUSES.push(house);
  }

  /**
   * Get all the delivery houses
   */
  getHouses(): Observable<House[]> {
    return of(HOUSES);
  }

  /**
   * Get a delivery house by ID
   *
   * @param id
   */
  getHouse(id): Observable<House> {
    return of (HOUSES.find(house => house.id === id));
  }

  /**
   * Get the last ID of all the delivery houses in order to create a new delivery house
   */
  getHouseLastId(): number {
    return HOUSES[HOUSES.length - 1].id + 1;
  }

  /**
   * Remove a delivery house by ID
   *
   * @param id
   */
  removeHouse(id): House[] {
    let i = -1;
    for (const house of HOUSES) {
      i++;
      if (house.id === id) {
        HOUSES.splice(i, 1);
      }
    }

    return HOUSES;
  }
}
