export enum PolicyCategory {
    LocalRule = <any>"Local Rules",
    Handicaps = <any>"Handicaps and Scoring",
    ClubPolicy = <any>"Club Policy"
}

export class Policy {
    id: number;
    category: PolicyCategory;
    title: string;
    description: string;

    fromJson(json: any): Policy {
        this.id = json.id;
        this.category = json.policy_type == 'R'? PolicyCategory.LocalRule : json.policy_type == 'S'? PolicyCategory.Handicaps : PolicyCategory.ClubPolicy;
        this.title = json.title;
        this.description = json.description;
        return this;
    }
}