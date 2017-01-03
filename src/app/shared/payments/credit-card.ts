export class CreditCard {

    stripe: any;
    number: any;
    exp: any;
    cvc: any;

    constructor () {
        this.stripe = Stripe;
        this.number = {
            value: '',
            isValid: true,
            errorMessage: 'The card number is invalid'
        };
        this.exp = {
            value: '',
            isValid: true,
            errorMessage: 'The expiration date is invalid or past'
        };
        this.cvc = {
            value: '',
            isValid: true,
            errorMessage: 'The CV code is invalid'
        };
    }

    createToken() {
        return new Promise((resolve, reject) => {
            this.stripe.card.createToken({
                number: this.number.value,
                exp: this.exp.value,
                cvc: this.cvc.value
            }, (status: number, response: any) => {
                if (status === 200) {
                    resolve(response.id);
                } else {
                    reject(response.error);
                }
            });
        });
    }

    validateCardNumber() {
        let result = true;
        if (this.number.value === '') {
            // no-op
        } else {
            if (this.number.value.length <= 12) {
                result = false;
            } else {
                result = this.stripe.card.validateCardNumber(this.number.value);
            }
        }
        this.number.isValid = result;
    };

    validateExpiry = () => {
        let result = true;
        if (this.exp.value !== '') {
            result = this.stripe.card.validateExpiry(this.exp.value);
        }
        this.exp.isValid = result;
    };

    validateCVC = () => {
        let result = true;
        if (this.cvc.value !== '') {
            result = this.stripe.card.validateCVC(this.cvc.value);
        }
        this.cvc.isValid = result;
    };

    isValid = () => {
        this.validateCardNumber();
        this.validateExpiry();
        this.validateCVC();
        return this.number.isValid && this.exp.isValid && this.cvc.isValid;
    }
}
