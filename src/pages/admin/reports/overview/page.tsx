import {
  ConnectWithoutContactOutlined,
  GroupsOutlined,
  QuickreplyOutlined,
  SummarizeOutlined,
} from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import useTranslation from '@/hooks/use-translation';

import { AbpContext } from '@/services/abp/abp.context';
import CardItemRecord from '../_components/card-item-record';
import ChartFaqs from './_components/chart-faq';
import ChartFeedbackCitizen from './_components/chart-feedback-citizen';
import ChartStatisticsCitizen from './_components/chart-statistics-citizen';
import ChartStatisticsCityVote from './_components/chart-statistics-city-vote';
import ChartUserStatistics from './_components/chart-user-statistics';
import reportService from './_services/report.service';

const ReportOverViewPage = () => {
  const { t } = useTranslation();
 // Use abpState to avoid the unused variable error


  return (
    <></>
  );
};

export default ReportOverViewPage;
