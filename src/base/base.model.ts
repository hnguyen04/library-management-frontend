import { GridColDef } from '@mui/x-data-grid';

export interface IBaseHttpResponse<T> {
  result: T;
  data?: T;
  targetUrl?: string;
  success: boolean;
  error: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
  totalCount: number;
  totalRecords: number;
}

export interface IPaginatedItems<T> {
  items: T[];
  data: T[];
  totalCount: number;
  totalRecords: number;
}

export interface ILVPair<T> {
  label: string;
  value: T;
}

export type TBaseModalProps = {
  open: boolean;
  onClose: () => void;
};

export interface IDownloadTempFileInput {
  fileName: string;
  fileTypeId: string;
  fileToken: string;
}

export type TBaseCrudCol = GridColDef & {
  hide?: boolean;
};

export type TBaseFormMode = 'create' | 'edit' | 'view';
