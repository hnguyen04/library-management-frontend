import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportService from '../_services/report.service';

const ChartFaqs = () => {
  const { t } = useTranslation();

  const { data: GetStatisticsChatOrganization } = useQuery({
    queryKey: ['GetStatisticsChatOrganization'],
    queryFn: () => reportService.getStatisticsChatOrganization(8, 2, 1),
  });

  const keyData = useMemo(
    () =>
      GetStatisticsChatOrganization &&
      Object.keys(GetStatisticsChatOrganization?.data),
    [GetStatisticsChatOrganization],
  );

  const valueChatReflect = useMemo(
    () =>
      GetStatisticsChatOrganization &&
      Object.values(GetStatisticsChatOrganization?.data)?.map(
        (item: any) => item.countChatReflects,
      ),
    [GetStatisticsChatOrganization],
  );

  const valueChatOrganizations = useMemo(
    () =>
      GetStatisticsChatOrganization &&
      Object.values(GetStatisticsChatOrganization?.data)?.map(
        (item: any) => item.countChatOrganizations,
      ),
    [GetStatisticsChatOrganization],
  );

  return (
    <CardItemChart
      title={t('Thống kê giao tiếp')}
      legend={[t('Tin nhắn công dân - phòng ban'), t('Tin nhắn phản ánh')]}
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
          name: t('Tin nhắn công dân - phòng ban'),
          type: 'bar',
          barGap: 0,
          data: valueChatOrganizations,
          smooth: true,
        },
        {
          name: t('Tin nhắn phản ánh'),
          type: 'bar',
          barGap: 0,
          data: valueChatReflect,
          smooth: true,
          color: 'green',
        },
      ]}
    />
  );
};

export default ChartFaqs;
