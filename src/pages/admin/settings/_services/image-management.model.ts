export interface IImageSettingProperties {
  header: Array<File | string>;
  bannerAdvert: Array<File | string>;
  avatar: Array<File | string>;
  shopHouse: Array<File | string>;
}
export interface IImageSettingTenant {
  type: number;
  properties: string;
  tenantId?: number;
  id: number;
}
