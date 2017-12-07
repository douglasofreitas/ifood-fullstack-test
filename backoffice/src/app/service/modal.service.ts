import * as _ from 'underscore';
import * as $ from 'jquery';

export class ModalService {

    open(id: string) {
        // open modal specified by id
        $('#'+id).modal("show");
    }

    close(id: string) {
        // close modal specified by id
        $('#'+id).modal("hide");
    }
}