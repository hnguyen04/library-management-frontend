import NiceModal from '@ebay/nice-modal-react';
import { CollectionsOutlined, SaveAlt } from '@mui/icons-material';
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import * as R from 'rambda';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  StyledPageHeader,
  TBaseCrudContentProps,
} from '@/base/base-crud-content';
import BaseTabsPage from '@/base/base-tabs-page';
import ImageCropperModal from '@/base/image-cropper-modal';
import useTranslation from '@/hooks/use-translation';
import appService from '@/services/app/app.service';
import { ITenantSettingApp } from '@/services/tenant-settings/tenant-setting.model';
import tenantSettingService from '@/services/tenant-settings/tenant-setting.service';
import { removeEmptyKeys } from '@/services/utils';

import { IImageSettingTenant } from './_services/image-management.model';
import { ImageManagementService } from './_services/image-management.service';

function Page() {
  const { t } = useTranslation();
  const imgManagementService = useMemo(() => new ImageManagementService(), []);

  const { data: listTenant } = useQuery({
    queryKey: ['tenant/image-management'],
    queryFn: () => tenantSettingService.getAllTenant(),
  });
  const [tenantChoose, setTenantChoose] = useState<
    ITenantSettingApp | undefined
  >(listTenant?.items?.at(0));
  const { data: getListImage, refetch } = useQuery({
    queryKey: [`image-management/getAll`, tenantChoose?.id ?? 0],
    queryFn: () =>
      imgManagementService.getImage<IImageSettingTenant>(
        removeEmptyKeys({
          type: tenantChoose?.id ? 2 : 1,
          tenantId: tenantChoose?.id,
        }),
        '/GetImage',
      ),
    keepPreviousData: true,
  });

  const [listImageChoose, setListImageChoose] = useState<any>();
  useEffect(() => {
    if (getListImage && getListImage?.data?.properties) {
      setListImageChoose(JSON.parse(getListImage?.data?.properties));
    } else {
      setListImageChoose(undefined);
    }
  }, [getListImage]);

  const saveImgConfigMutation = useMutation({
    mutationFn: (data: any) =>
      imgManagementService.create(data, '/CreateOrUpdateImage'),
    onMutate: () => {
      appService.showLoadingModal();
    },
    onSettled: () => {
      appService.hideLoadingModal();
    },
    onSuccess: () => {
      refetch();
      enqueueSnackbar(t('Cập nhật thành công'), {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar(t('Cập nhật thất bại'), {
        variant: 'error',
      });
    },
  });

  const ref = useRef<HTMLInputElement>(null);
  const renderContent = useCallback(
    (props: Pick<TBaseCrudContentProps, 'name'>) => {
      return (
        <Fragment>
          <StyledPageHeader>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              marginBottom={2}
            >
              <Typography variant="h5" component="h1">
                {'Danh sách'}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Button
                startIcon={<SaveAlt />}
                variant="contained"
                onClick={() => {
                  if (listImageChoose) {
                    saveImgConfigMutation.mutate({
                      listImage: listImageChoose,
                      tenantId: tenantChoose?.id,
                      type: tenantChoose ? 2 : 1,
                      id: getListImage?.data?.id,
                    });
                  }
                }}
                sx={{
                  pl: 2.2,
                }}
              >
                {t('Lưu')}
              </Button>

              <Box
                sx={{
                  py: 1,
                  px: 1,
                  width: '30%',
                }}
              >
                <Autocomplete
                  fullWidth
                  options={
                    listTenant?.items
                      ? [
                          {
                            tenancyName: 'Default-Yootek',
                            name: 'Default-Yootek',
                            mobileConfig: '',
                            adminPageConfig: '',
                            permissions: '',
                            isActive: true,
                            id: 0,
                          },
                          ...listTenant.items,
                        ]
                      : []
                  }
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, e) =>
                    R.equals(option.id, e.id)
                  }
                  renderInput={(params) => (
                    <TextField label={t('Chọn Tenant')} {...params} />
                  )}
                  value={listTenant?.items.find(
                    (tenant: ITenantSettingApp) =>
                      tenant.id === tenantChoose?.id,
                  )}
                  onChange={(_, data) => {
                    if (data) {
                      setTenantChoose(data);
                    }
                  }}
                />
              </Box>
            </Stack>
          </StyledPageHeader>
          <Stack pb={1}>
            <Grid container spacing={2}>
              {((listImageChoose &&
                props.name &&
                listImageChoose[props.name]?.length < 6) ||
                !listImageChoose ||
                !listImageChoose[props.name]) && (
                <Grid width="auto" xs={4} item>
                  <Box
                    sx={{
                      borderRadius: 1,
                      border: '1px dashed grey',
                      height: '100%',
                      width: '100%',
                      display: 'table',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'table-cell',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        py: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          ref.current?.click();
                        }}
                        startIcon={<CollectionsOutlined />}
                      >
                        {t('Chọn hình ảnh')}
                        <input
                          type="file"
                          ref={ref}
                          accept="image/*"
                          style={{
                            display: 'none',
                          }}
                          onChange={(event) => {
                            if (event.target.files) {
                              NiceModal.show(ImageCropperModal, {
                                image: event.target.files?.[0],
                                onChange: (_file) => {
                                  if (
                                    listImageChoose &&
                                    listImageChoose[props.name]
                                  ) {
                                    const tmp = { ...listImageChoose };
                                    tmp[props.name] = [
                                      ...listImageChoose[props.name],
                                      _file,
                                    ];

                                    setListImageChoose(tmp);
                                  } else {
                                    const tmp: any = listImageChoose
                                      ? { ...listImageChoose }
                                      : {};
                                    tmp[props.name] = [_file];

                                    setListImageChoose(tmp);
                                  }
                                },
                              });
                            }
                          }}
                        />
                      </Button>
                      <Typography>Tối đa 6 ảnh</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              {listImageChoose &&
                props.name &&
                listImageChoose[props.name]?.map(
                  (file: File | string, index: number) => (
                    <Grid item xs={4} key={index}>
                      <Badge
                        color="error"
                        badgeContent="x"
                        onClick={() => {
                          const newFiles = listImageChoose[props.name].filter(
                            (_item: File | string, i: number) => i !== index,
                          );
                          const tmp = { ...listImageChoose };
                          tmp[props.name] = newFiles;
                          setListImageChoose(tmp);
                        }}
                        sx={{
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {typeof file === 'string' ||
                        typeof file.name === 'string' ||
                        (typeof file.type === 'string' &&
                          file.type.includes('image')) ? (
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            sx={{
                              backgroundColor: '#fafafa',
                            }}
                          >
                            <picture>
                              <img
                                loading="lazy"
                                src={
                                  typeof file === 'string'
                                    ? file
                                    : URL.createObjectURL(file)
                                }
                                alt="Img"
                                width={'100%'}
                                height={'100%'}
                                style={{
                                  objectFit: 'contain',
                                  backgroundPosition: 'center',
                                  borderRadius: 8,
                                }}
                              />
                            </picture>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#fafafa',
                              textAlign: 'center',
                            }}
                          >
                            <Typography>Lỗi</Typography>
                          </Box>
                        )}
                      </Badge>
                    </Grid>
                  ),
                )}
            </Grid>
          </Stack>
        </Fragment>
      );
    },
    [
      getListImage?.data?.id,
      listImageChoose,
      listTenant?.items,
      saveImgConfigMutation,
      t,
      tenantChoose,
    ],
  );

  return (
    <BaseTabsPage
      name="image-management"
      title={t('Quản lý hình ảnh')}
      tabs={[
        {
          label: 'Banner header của app',
          Component: renderContent({
            name: 'header',
          }),
        },
        {
          label: 'Banner quảng cáo',
          Component: renderContent({
            name: 'bannerAdvert',
          }),
        },
        {
          label: 'Ảnh đại diện',
          Component: renderContent({
            name: 'avatar',
          }),
        },
        {
          label: 'Banner shop house mua sắm',
          Component: renderContent({
            name: 'shopHouse',
          }),
        },
      ]}
    />
  );
}

export default Page;
