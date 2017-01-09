export class SavedCard {
    customerId: string;
    description: string;
    expires: string;

    fromJson(json: any): SavedCard {
        this.customerId = json.stripe_id;
        this.description = json.card;
        this.expires = json.expires;
        return this;
    }
}
