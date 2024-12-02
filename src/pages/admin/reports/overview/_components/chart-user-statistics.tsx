import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportService from '../_services/report.service';

const ChartUserStatistics = () => {
  const { t } = useTranslation();

  const { data: GetUserStatistics } = useQuery({
    queryKey: ['GetUserStatistics'],
    queryFn: () => reportService.getUserStatistics(12, 2),
  });

  const keyData = useMemo(
    () => GetUserStatistics && Object.keys(GetUserStatistics?.data),
    [GetUserStatistics],
  );

  const valueData = useMemo(
    () => GetUserStatistics && Object.values(GetUserStatistics?.data),
    [GetUserStatistics],
  );

  return (
    <CardItemChart
      title={t('Thống kê tài khoản người dùng')}
      legend={[t('Tổng số tài khoản người dùng')]}
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
          name: t('Tổng số tài khoản người dùng'),
          type: 'line',
          barWidth: '60%',
          data: valueData,
          smooth: true,
        },
      ]}
    />
  );
};

export default ChartUserStatistics;
