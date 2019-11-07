import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessagesService } from './../../services/error-messages.service';
import { HouseService } from './../../services/house.service';
import { House } from './../../models/house';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public deliveryForm: FormGroup;
  public admContactSubsription: Subscription;
  public submitted: boolean;
  public readOnly: boolean;
  public confirmationMessage: string;

  constructor(private _fb: FormBuilder, private houseService: HouseService, private errorMessagesService: ErrorMessagesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.readOnly = false;
    this.confirmationMessage = 'Se ha creado un delivery.';

    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.getHouse();
      this.copyAdmContact();
      this.confirmationMessage = 'Se ha modificado un delivery.';
    }
  }

  /**
   * Build the model-driven form
   */
  buildForm(): void {
    this.deliveryForm = this._fb.group({
      id: [this.houseService.getHouseLastId()],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      specialities: ['', [Validators.required, Validators.maxLength(500)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      hourMin: ['', Validators.required],
      hourMax: ['', Validators.required],
      admContact: this._fb.group({
        name: ['', [Validators.required, Validators.maxLength(200)]],
        lastname: ['', [Validators.required, Validators.maxLength(200)]],
        phone: ['', [Validators.required, Validators.maxLength(100)]],
        mail: ['', [Validators.required, Validators.maxLength(100)]]
      }),
      comContact: this._fb.group({
        idemAdmContact: [false],
        name: [''],
        lastname: [''],
        phone: [''],
        mail: ['']
      }),
    });
  }

  /**
   * Get a delivery house by the route parameter ID and set the form values to the model-driven form
   */
  getHouse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.houseService.getHouse(id)
      .subscribe(house => (<FormGroup>this.deliveryForm).setValue(house, { onlySelf: true }));
  }

  /**
   * Copy the values and validators of the administrator contact to the comercial contact if the checkbox idemAdmContact is true.
   *
   * @param checked
   */
  copyAdmContact(): void {
    const admContactForm = this.deliveryForm.controls['admContact'];
    const comContactForm = this.deliveryForm.controls['comContact'];
    const comContactChecked = this.deliveryForm.controls['comContact']['controls']['idemAdmContact'];

    if (comContactChecked.value) {
      (<FormControl>comContactForm).patchValue(admContactForm.value);
      this.admContactSubsription = admContactForm.valueChanges.subscribe(value => {
        (<FormControl>comContactForm).patchValue(value, { onlySelf: true });
      });

      this.readOnly = true;
      this.copyAdmContactValidators(true);
    } else {
      if (this.admContactSubsription) {
        this.admContactSubsription.unsubscribe();
      }

      this.readOnly = false;
      this.copyAdmContactValidators(false);
    }
  }

  /**
   * Set same validations from the Admin contact form to the comercial contact form
   *
   * @param flagValidator
   */
  copyAdmContactValidators(flagValidator): void {
    const admContactControls = this.deliveryForm.controls['admContact']['controls'];
    const comContactControls = this.deliveryForm.controls['comContact']['controls'];
    let validator;

    for (const control of Object.keys(admContactControls)) {
      if (flagValidator) {
        validator = admContactControls[control].validator;
      } else {
        validator = null;
      }

      (<FormControl>comContactControls[control]).setValidators(validator);
      (<FormControl>comContactControls[control]).updateValueAndValidity();
    }
  }

  /**
   * Get an error message to show it into the validation
   *
   * @param controlName
   * @param control
   */
  getErrorMessage(controlName, control): string {
    return this.errorMessagesService.getErrorMessage(controlName, control);
  }

  /**
   * Save a new delivery house to the mock if the validation is OK
   *
   * @param house - House model (interface)
   * @param isValid - Validation Flag
   */
  saveHouse(house: House, isValid: boolean): void {
    this.submitted = true;
    if (isValid) {
      console.log(house);
      this.houseService.setHouse(house);
      this.router.navigate(['/delivery-search', 1]);
      alert(this.confirmationMessage);
    } else {
      scroll(0, 0);
    }
  }

  /**
   * Cancel the delivery house and erase each input form
   */
  cancelHouse() {
    if (confirm('¿Seguro que quieres cancelar el delivery?')) {
      this.buildForm();
      this.submitted = false;
    }
  }
}
