import { ResendEntityBase } from '../ResendEntityBase';
import type { ResendSDK } from '../ResendSDK';
import type { Control } from '../types';
import type { ContactImportResponseSuccess, ContactImportResponseSuccessLoadMatch, ContactImportResponseSuccessListMatch, ContactImportResponseSuccessCreateData } from '../ResendTypes';
declare class ContactImportResponseSuccessEntity extends ResendEntityBase<ContactImportResponseSuccess> {
    constructor(client: ResendSDK, entopts: any);
    make(this: ContactImportResponseSuccessEntity): ContactImportResponseSuccessEntity;
    load(this: any, reqmatch?: ContactImportResponseSuccessLoadMatch, ctrl?: Control): Promise<ContactImportResponseSuccessEntity>;
    list(this: any, reqmatch?: ContactImportResponseSuccessListMatch, ctrl?: Control): Promise<ContactImportResponseSuccessEntity[]>;
    create(this: any, reqdata?: ContactImportResponseSuccessCreateData, ctrl?: Control): Promise<ContactImportResponseSuccessEntity>;
}
export { ContactImportResponseSuccessEntity };
