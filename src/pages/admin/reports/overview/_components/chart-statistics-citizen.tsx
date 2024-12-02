import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportService from '../_services/report.service';

const ChartStatisticsCitizen = () => {
  const { t } = useTranslation();

  const { data: GetAllCitizenStatistic } = useQuery({
    queryKey: ['GetAllCitizenStatistic'],
    queryFn: () => reportService.getAllCitizenStatistic(8, 2, 1),
  });

  const keyData = useMemo(
    () => GetAllCitizenStatistic && Object.keys(GetAllCitizenStatistic?.data),
    [GetAllCitizenStatistic],
  );

  const valueCountNew = useMemo(
    () =>
      GetAllCitizenStatistic &&
      Object.values(GetAllCitizenStatistic?.data)?.map(
        (item: any) => item.countNew,
      ),
    [GetAllCitizenStatistic],
  );

  const valueCountRejected = useMemo(
    () =>
      GetAllCitizenStatistic &&
      Object.values(GetAllCitizenStatistic?.data)?.map(
        (item: any) => item.countRejected,
      ),
    [GetAllCitizenStatistic],
  );

  const valueCountAccepted = useMemo(
    () =>
      GetAllCitizenStatistic &&
      Object.values(GetAllCitizenStatistic?.data)?.map(
        (item: any) => item.countAccepted,
      ),
    [GetAllCitizenStatistic],
  );

  const valueCountTotal = useMemo(
    () =>
      GetAllCitizenStatistic &&
      Object.values(GetAllCitizenStatistic?.data)?.map(
        (item: any) => item.countTotal,
      ),
    [GetAllCitizenStatistic],
  );

  return (
    <CardItemChart
      title={t('Thống kê cư dân sử dụng app')}
      legend={[
        t('Số cư dân chưa được xác minh'),
        t('Số cư dân bị từ chối'),
        t('Số cư đã được xác minh'),
        t('Tổng số cư dân đã đăng ký theo tháng'),
      ]}
      xAxis={[
        {
          type: 'category',
          data: keyData,
        },
      ]}
      yAxis={[
        {
          type: 'value',
        },
      ]}
      series={[
        {
          name: t('Số cư dân chưa được xác minh'),
          type: 'line',
          barGap: 0,
          data: valueCountNew,
          smooth: true,
        },
        {
          name: t('Số cư dân bị từ chối'),
          type: 'line',
          barGap: 0,
          data: valueCountRejected,
          smooth: true,
          color: 'red',
        },
        {
          name: t('Số cư đã được xác minh'),
          type: 'line',
          barGap: 0,
          data: valueCountAccepted,
          smooth: true,
          color: 'green',
        },
        {
          name: t('Tổng số cư dân đã đăng ký theo tháng'),
          type: 'line',
          barGap: 0,
          data: valueCountTotal,
          smooth: true,
        },
      ]}
    />
  );
};

export default ChartStatisticsCitizen;
