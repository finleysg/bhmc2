export class CreditCard {

    // constructor (stripe) {
    //     this._stripe = stripe;
    //     this.number = {
    //         value: '',
    //         isValid: true,
    //         errorMessage: 'The card number is invalid'
    //     };
    //     this.exp = {
    //         value: '',
    //         isValid: true,
    //         errorMessage: 'The expiration date is invalid or past'
    //     };
    //     this.cvc = {
    //         value: '',
    //         isValid: true,
    //         errorMessage: 'The CV code is invalid'
    //     };
    // }
    //
    // createToken = () => {
    //     return this._stripe.card.createToken({
    //         number: this.number.value,
    //         exp: this.exp.value,
    //         cvc: this.cvc.value
    //     }).then( (response) => {
    //         return response.id;
    //     });
    // };
    //
    // validateCardNumber = () => {
    //     let result = true;
    //     if (this.number.value === '') {
    //         // no-op
    //     } else {
    //         if (this.number.value.length <= 12) {
    //             result = false;
    //         } else {
    //             result = this._stripe.card.validateCardNumber(this.number.value);
    //         }
    //     }
    //     this.number.isValid = result;
    // };
    //
    // validateExpiry = () => {
    //     let result = true;
    //     if (this.exp.value !== '') {
    //         result = this._stripe.card.validateExpiry(this.exp.value);
    //     }
    //     this.exp.isValid = result;
    // };
    //
    // validateCVC = () => {
    //     let result = true;
    //     if (this.cvc.value !== '') {
    //         result = this._stripe.card.validateCVC(this.cvc.value);
    //     }
    //     this.cvc.isValid = result;
    // };
    //
    // isValid = () => {
    //     this.validateCardNumber();
    //     this.validateExpiry();
    //     this.validateCVC();
    //     return this.number.isValid && this.exp.isValid && this.cvc.isValid;
    // }
}
