import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import useTranslation from '@/hooks/use-translation';

import CardItemChart from '../../_components/card-item-chart';
import reportService from '../_services/report.service';

const ChartFeedbackCitizen = () => {
  const { t } = useTranslation();

  const { data: GetStatisticsCitizenReflect } = useQuery({
    queryKey: ['GetStatisticsCitizenReflect'],
    queryFn: () => reportService.getStatisticsCitizenReflect(12, 2, 1),
  });

  const { data: GetStatisticsCitizenReflectComplete } = useQuery({
    queryKey: ['GetStatisticsCitizenReflectComplete'],
    queryFn: () => reportService.getStatisticsCitizenReflect(12, 2, 2),
  });

  const valueGetComplete = useMemo(
    () =>
      GetStatisticsCitizenReflectComplete &&
      Object.values(GetStatisticsCitizenReflectComplete?.data),
    [GetStatisticsCitizenReflectComplete],
  );

  const keyData = useMemo(
    () =>
      GetStatisticsCitizenReflect &&
      Object.keys(GetStatisticsCitizenReflect?.data),
    [GetStatisticsCitizenReflect],
  );
  const valueData = useMemo(
    () =>
      GetStatisticsCitizenReflect &&
      Object.values(GetStatisticsCitizenReflect?.data),
    [GetStatisticsCitizenReflect],
  );

  return (
    <CardItemChart
      title={t('Phản ánh của cư dân')}
      legend={[t('Phản ánh của cư dân'), t('Phản ánh đã xử lý')]}
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
          name: t('Phản ánh của cư dân'),
          type: 'line',
          barWidth: '60%',
          data: valueData,
          smooth: true,
        },
        {
          name: t('Phản ánh đã xử lý'),
          type: 'line',
          barWidth: '60%',
          data: valueGetComplete,
          smooth: true,
          color: 'green',
        },
      ]}
    />
  );
};

export default ChartFeedbackCitizen;
