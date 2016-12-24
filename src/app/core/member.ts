/**
 "id": 1,
 "address1": "2740 Pilgrim Ln",
 "address2": "",
 "city": "Plymouth",
 "state": "MN",
 "zip": "55441",
 "phone_number": "612-723-1335",
 "handicap": "3.0",
 "handicap_revision_date": "2016-06-15",
 "birth_date": "1960-10-27",
 "status": "",
 "summary": "Now is the winter of our discontent made glorious summer by this son of York.",
 "stripe_customer_id": "cus_9gnzzbgmY7ywkn",
 "dues_paid": false
 */
export class Member {
  id: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone_number: string;
  handicap: number;
  handicap_revision_date: string;
  birth_date: string;
  status: string;
  summary: string;
  stripe_customer_id: string;
  dues_paid: boolean;
}
