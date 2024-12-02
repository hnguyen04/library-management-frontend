import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

export class ImageManagementService extends BaseCrudService {
  constructor() {
    super('/api/services/app/Images');
  }
  public async getImage<T>(
    query?: {
      type: number;
      tenantId?: number;
    },
    path = '/GetImage',
  ): Promise<{ data: T }> {
    const res = await httpService.request<TBaseResponse<{ data: T }>>({
      method: 'GET',
      url: `${this.basePath}${path}`,
      params: query,
    });

    return res.result;
  }
  async uploadImage(data: any[]) {
    if (data && data.length) {
      const listImageFiles = [];
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] !== 'string') {
          listImageFiles.push(data[i]);
        }
      }
      if (listImageFiles.length > 0) {
        const resUrlImg = await httpService.uploadListImage({
          files: listImageFiles,
        });
        return resUrlImg.result;
      }
    }
    return [];
  }
  private arrayImgWithType(_array: any[]) {
    const listImgUrl: string[] = [];
    const listImgFile: File[] = [];
    _array.forEach((el) => {
      if (typeof el === 'string') {
        listImgUrl.push(el);
      } else {
        listImgFile.push(el);
      }
    });
    return {
      imgUrl: listImgUrl,
      imgFile: listImgFile,
    };
  }
  public async create<T>(data: any, path?: '/CreateOrUpdateImage'): Promise<T> {
    const listImage = data.listImage;
    const oldHeader = this.arrayImgWithType(listImage.header ?? []);
    if (listImage.header && oldHeader.imgFile.length) {
      const headerImg = await this.uploadImage(oldHeader.imgFile);
      listImage.header = [...oldHeader.imgUrl, ...headerImg];
    }
    const oldBannerAdvert = this.arrayImgWithType(listImage.bannerAdvert ?? []);
    if (listImage.bannerAdvert && oldBannerAdvert.imgFile.length) {
      const bannerAdvertImg = await this.uploadImage(oldBannerAdvert.imgFile);
      listImage.bannerAdvert = [...oldBannerAdvert.imgUrl, ...bannerAdvertImg];
    }
    const oldAvatar = this.arrayImgWithType(listImage.avatar ?? []);
    if (listImage.avatar && oldAvatar.imgFile.length) {
      const avatarImg = await this.uploadImage(oldAvatar.imgFile);
      listImage.avatar = [...oldAvatar.imgUrl, ...avatarImg];
    }
    const oldShopHouse = this.arrayImgWithType(listImage.shopHouse ?? []);
    if (listImage.shopHouse && oldShopHouse.imgFile.length) {
      const shopHouseImg = await this.uploadImage(oldShopHouse.imgFile);
      listImage.shopHouse = [...oldShopHouse.imgUrl, ...shopHouseImg];
    }

    const res = await httpService.request<TBaseResponse<T>>({
      method: 'POST',
      url: `/api/services/app/Images${path}`,
      data: {
        properties: JSON.stringify(listImage),
        tenantId: data.tenantId,
        type: data.type,
        id: data.id,
      },
    });

    return res.result;
  }
}
