declare const moment: any;

export class SlotPayment {
    id: number;
    slotId: number;
    recordingMemberId: number;
    cardVerificationToken: string;
    paymentConfirmationCode: string;
    paymentConfirmationDate: any;
    paymentAmount: number;

    fromJson(json: any): SlotPayment {
        this.id = json.id;
        this.slotId = json.registration_slot;
        this.recordingMemberId = json.recorded_by;
        this.cardVerificationToken = json.card_verification_token;
        this.paymentConfirmationCode = json.payment_confirmation_code;
        this.paymentAmount = json.payment_amount;
        this.paymentConfirmationDate = moment(json.payment_timestamp);

        return this;
    }

    toJson(): any {
        // return only what the client has updated
        return {
            id: this.id,
            registration_slot: this.slotId,
            recorded_by: this.recordingMemberId,
            card_verification_token: this.cardVerificationToken,
            payment_confirmation_code: this.paymentConfirmationCode,
            payment_amount: this.paymentAmount,
            payment_timestamp: this.paymentConfirmationDate.format('yyyy-MM-dd hh:mm:ss')
        };
    }
}
