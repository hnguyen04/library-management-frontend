export interface ITemplateBill {
  id?: number;
  urbanId?: number;
  urbanName?: string;
  buildingId?: number;
  buildingName?: string;
  name?: string;
  tenantId?: number;
  fileHTML?: any;
  content?: string;
  type?: ETemplateBillType;
}

export enum ETemplateBillType {
  BILL = 1,
  INVOICE = 2,
}
