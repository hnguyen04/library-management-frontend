import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportService from '../_services/report.service';

const ChartStatisticsCityVote = () => {
  const { t } = useTranslation();

  const { data: GetStatisticsCityVote } = useQuery({
    queryKey: ['GetStatisticsCityVote'],
    queryFn: () => reportService.getStatisticsCityVote(12, 2, 1),
  });

  const keyData = useMemo(
    () => GetStatisticsCityVote && Object.keys(GetStatisticsCityVote?.data),
    [GetStatisticsCityVote],
  );

  const valueCountVotes = useMemo(
    () =>
      GetStatisticsCityVote &&
      Object.values(GetStatisticsCityVote?.data)?.map(
        (item: any) => item.countVotes,
      ),
    [GetStatisticsCityVote],
  );

  const valueCountUserVotes = useMemo(
    () =>
      GetStatisticsCityVote &&
      Object.values(GetStatisticsCityVote?.data)?.map(
        (item: any) => item.countUserVotes,
      ),
    [GetStatisticsCityVote],
  );

  const valuePercentUserVotes = useMemo(
    () =>
      GetStatisticsCityVote &&
      Object.values(GetStatisticsCityVote?.data)?.map(
        (item: any) => item.percentUserVotes * 100,
      ),
    [GetStatisticsCityVote],
  );

  return (
    <CardItemChart
      title={t('Thống kê khảo sát')}
      legend={[
        t('Tổng số khảo sát'),
        t('Số người tham gia'),
        t('Tỷ lệ người tham gia'),
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
        {
          type: 'value',
          name: t('Phần trăm'),
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ]}
      series={[
        {
          name: t('Tổng số khảo sát'),
          type: 'bar',
          barGap: 0,
          data: valueCountVotes,
          color: 'green',
        },
        {
          name: t('Số người tham gia'),
          type: 'bar',
          barGap: 0,
          data: valueCountUserVotes,
        },
        {
          name: t('Tỷ lệ người tham gia'),
          yAxisIndex: 1,
          type: 'line',
          data: valuePercentUserVotes,
          smooth: true,
        },
      ]}
    />
  );
};

export default ChartStatisticsCityVote;
