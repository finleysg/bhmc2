export class User {

  id: number = 0;
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  is_authenticated: boolean = false;
  is_staff: boolean = false;
  is_active: boolean = false;

  constructor() {
  }

  get name() {
    if (!this.is_authenticated) {
      return 'Guest';
    }
    return this.first_name + ' ' + this.last_name;
  };

  //TODO: this is temporary
  isInRole(role: string) {
    let result = true;
    if (this.is_staff && role) {
      result = false;
    }
    return result;
  }
}
