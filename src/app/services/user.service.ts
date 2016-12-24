import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable()
export class UserService {

  constructor() {
  }

  getCurrentUser(): User {
    const thisUser = new User();
    thisUser.id = 1;
    thisUser.first_name = 'Stuart';
    thisUser.last_name = 'Finley';
    thisUser.email = 'finleysg@gmail.com';
    thisUser.is_authenticated = true;
    thisUser.is_staff = true;
    thisUser.is_active = true;
    return thisUser;
  }
}
