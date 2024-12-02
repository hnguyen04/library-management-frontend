import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import DialogExtend from '@/components/dialog-extend';
import useLoading from '@/hooks/use-loading';
import useTranslation from '@/hooks/use-translation';
import permissionService from '@/services/permission/permission.service';
import { ITenant } from '@/services/tenants/tenant.model';
import tenantService from '@/services/tenants/tenant.service';

import BasicConfigTab from './basic-config-tab';
import MobileConfigTab from './mobile-config-tab';
import PermissionConfigTab from './permission-config-tab';
import WebConfigTab from './web-config-tab';

type TTenantConfigModalProps = {
  tenantId: number;
  refetchData?: () => void;
};

const TenantConfigModal = NiceModal.create((props: TTenantConfigModalProps) => {
  const modal = useModal();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedTab, setSelectedTab] = useState<
    'basic' | 'mobile' | 'web' | 'permissions'
  >('basic');

  const closeModal = useCallback(() => {
    modal.hide();
  }, [modal]);

  const getAllPermissionsQuery = useQuery({
    queryKey: ['getAllPermissions', props.tenantId],
    queryFn: () => permissionService.getAllPermissions(),
  });
  const listPermissions = useMemo(
    () => getAllPermissionsQuery.data?.items || [],
    [getAllPermissionsQuery.data],
  );

  const getTenantQuery = useQuery({
    enabled: !!props.tenantId && props.tenantId > 0,
    queryKey: ['system/tenants/getOne', props.tenantId],
    queryFn: () => tenantService.getTenantDetail(props.tenantId),
  });

  const updateTenantMutation = useMutation({
    mutationFn: (data: ITenant) =>
      selectedTab === 'basic'
        ? tenantService.updateBasicInfo({ ...data, id: props.tenantId })
        : selectedTab !== 'permissions'
          ? tenantService.updateTenantConfig({
              ...data,
              id: props.tenantId,
              permissions: listPermissions.filter(
                (p) => data.permissions?.includes(p.name),
              ),
            })
          : tenantService.updateTenantConfigWithPermissions({
              ...data,
              id: props.tenantId,
              permissions: listPermissions.filter(
                (p) => data.permissions?.includes(p.name),
              ),
            }),
    onError: () =>
      enqueueSnackbar(t('Đã có lỗi xảy ra khi cập nhật'), { variant: 'error' }),
    onSuccess: () => {
      props.refetchData?.();
      enqueueSnackbar(t('Cập nhật thành công'), { variant: 'success' });
      closeModal();
    },
  });

  const formSchema = yup.object().shape({
    id: yup.number().nullable(),
    tenancyName: yup.string().required(t('Trường này là bắt buộc')),
    name: yup.string().required(t('Trường này là bắt buộc')),
    isActive: yup.boolean().required(t('Trường này là bắt buộc')),
    mobileConfig: yup
      .object()
      .shape({
        socialConfig: yup.array().of(yup.string()),
        communityConfig: yup.array().of(yup.string()),
        typeConfig: yup.number(),
        mobileVersion: yup.string(),
        portalWebsite: yup.string().nullable(),
      })
      .optional(),
    adminPageConfig: yup
      .object()
      .shape({
        layoutTenantConfig: yup.object().shape({
          labelTenant: yup.string(),
          iconTenant: yup.mixed().nullable(),
          logoTenant: yup.mixed().nullable(),
          statisticsTbls: yup.array().of(yup.string()),
          statisticsCounters: yup.array().of(yup.string()),
        }),
      })
      .optional(),
    permissions: yup.array().of(yup.string()),
  });

  const formMethods = useForm({
    resolver: yupResolver(formSchema),
  });
  const { reset: resetForm, handleSubmit, formState } = formMethods;

  const onClickSubmit = useCallback(() => {
    handleSubmit((data: any) => {
      updateTenantMutation.mutate(data);
    })();
  }, [handleSubmit, updateTenantMutation]);

  useLoading({
    showConditionsSome: [
      getTenantQuery.isLoading,
      updateTenantMutation.isLoading,
      getAllPermissionsQuery.isLoading,
    ],
    hideConditionsEvery: [
      !getTenantQuery.isLoading,
      !updateTenantMutation.isLoading,
      !getAllPermissionsQuery.isLoading,
    ],
  });

  useEffect(() => {
    if (getTenantQuery.data) {
      resetForm(getTenantQuery.data);
    }
  }, [getTenantQuery.data, resetForm]);

  return getTenantQuery.data ? (
    <TabContext value={selectedTab}>
      <FormProvider {...formMethods}>
        <DialogExtend {...muiDialogV5(modal)} maxWidth="md">
          <DialogTitle>{t('Cấu hình tenant')}</DialogTitle>

          <DialogContent>
            <TabList onChange={(_e, value) => setSelectedTab(value)}>
              <Tab label={t('Thông tin cơ bản')} value="basic" />
              <Tab label={t('Cấu hình cho Mobile app')} value="mobile" />
              <Tab label={t('Cấu hình cho Web quản trị')} value="web" />
              <Tab label={t('Phân quyền')} value="permissions" />
            </TabList>

            <TabPanel value="basic">
              <BasicConfigTab />
            </TabPanel>
            <TabPanel value="mobile">
              <MobileConfigTab />
            </TabPanel>
            <TabPanel value="web">
              <WebConfigTab />
            </TabPanel>
            <TabPanel value="permissions">
              <PermissionConfigTab listPermissions={listPermissions} />
            </TabPanel>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={onClickSubmit}
              disabled={formState.isSubmitting || !formState.isValid}
            >
              {t('Lưu')}
            </Button>
            <Button color="inherit" onClick={closeModal}>
              {t('Hủy')}
            </Button>
          </DialogActions>
        </DialogExtend>
      </FormProvider>
    </TabContext>
  ) : (
    <>
      <CircularProgress />
    </>
  );
});

export default TenantConfigModal;
