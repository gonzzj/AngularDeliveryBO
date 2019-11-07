import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  validationMessages: any;

  constructor() {
    this.validationMessages = {
      name: {
        required: 'El nombre es requerido!',
        maxlength: 'El nombre debe ser 50 caracteres o menos.'
      },
      phone: {
        required: 'El teléfono es requerido!',
        maxlength: 'El teléfono debe ser 50 caracteres o menos.'
      },
      description: {
        required: 'La descripción es requerida!',
        maxlength: 'La descripción debe ser 1000 caracteres o menos.'
      },
      specialities: {
        required: 'Las especialidades son requeridas!',
        maxlength: 'Las especialidades deben ser 500 caracteres o menos.'
      },
      address: {
        required: 'La dirección es requerida!',
        maxlength: 'La dirección debe ser 200 caracteres o menos.'
      },
      hourMin: {
        required: 'El horario mínimo es requerido!',
      },
      hourMax: {
        required: 'El horario máximo es requerido!',
      },
      lastname: {
        required: 'El apellido es requerido!',
        maxlength: 'El apellido debe ser 200 caracteres o menos.'
      },
      mail: {
        required: 'El mail es requerido!',
        maxlength: 'El mail debe ser 100 caracteres o menos.'
      },
      nameContact: {
        required: 'El nombre es requerido!',
        maxlength: 'El nombre debe ser 200 caracteres o menos.'
      },
      phoneContact: {
        required: 'El teléfono es requerido!',
        maxlength: 'El teléfono debe ser 100 caracteres o menos.'
      }
    };
  }

  /**
   * Get the exact error message based on the validation
   *
   * @param controlName - Name of the Form control
   * @param control - Form control
   * @returns {string}
   */
  getErrorMessage(controlName, control): string {
    let errorMessage = '';

    for (const error in control.errors) {
      errorMessage = this.validationMessages[controlName][error];
    }

    return errorMessage;
  }
}
