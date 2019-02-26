import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Este valor es requerido',
            'invalidCreditCard': 'Es inválido el número de tarjeta de crédito',
            'invalidEmailAddress': 'Dirección de correo electrónico no válida',
            'invalidPassword': 'Contraseña incorrecta.La contraseña debe tener al menos 6 caracteres y debe contener al menos un número..',
            'tamano': `mínimo requerido ${validatorValue.requiredLength}`,
            'phoneSize': 'Se requiere 7 números',
            'cellPhoneSize': 'Se requiere 10 números'
        };

        return config[validatorName];
    }
    static nombre(control){
        if(!control.value){
            return null;
        }else{
            return { 'required' : true};
        }
    }

    static tamano(tamano){
        if(tamano.value.length < 8){
            return {'tamano': true};
        }else{
            return null
        }
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static telefono(control) {
        const value: string = control.value;
        if (value && value.length >= 7) {
          return {
            'phoneSize': true
          }
        }
        return null;
      }
    
      static celular(control) {
        const value: string = control.value;
        if (value && value.length >= 10) {
          return {
            'cellPhoneSize': true
          }
        }
        return null;
      }
}

