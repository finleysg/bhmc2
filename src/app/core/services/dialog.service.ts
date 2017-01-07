import { Injectable } from '@angular/core';
import { default as swal } from 'sweetalert2';

@Injectable()
export class DialogService {
    /**
     * Ask user to confirm an action. `message` explains the action and choices.
     * Returns promise resolving to `true`=confirm or `false`=cancel
     */
    confirm(title: string, message: string) {
        return swal({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true
        });
    };
}
