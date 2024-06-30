import { 
    BadRequestException, 
} from "@nestjs/common";

class MailRecordListEmptyException extends BadRequestException {
    constructor() {
        super('No records found');
    }
}

export {
    MailRecordListEmptyException,
}