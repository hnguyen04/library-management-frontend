import { Card, Stack, Typography } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

type TCardItemChart = {
  title: string;
  legend: string[];
  xAxis: any[];
  yAxis?: any[];
  series: any[];
  paddingLeft?: number;
  widthBoolean?: boolean;
  button?: any;
  height?: number;
  left?: number;
  buttonExport?: any;
  buttonExportDetail?: any;
  setMonth?: any;
  setMonthSelect?: any;
};

const CardItemChart = (props: TCardItemChart) => {
  const {
    title,
    legend,
    xAxis,
    yAxis,
    series,
    paddingLeft,
    widthBoolean,
    button,
    height,
    left,
    buttonExport,
    setMonth,
    setMonthSelect,
  } = props;

  const onEvents = {
    click: (params: any) => {
      const monthCurrent = new Date().getMonth();
      const yearCurrent = new Date().getFullYear();
      const month = parseInt(params?.name?.match(/\d+/)[0]);
      let date;
      if (month <= monthCurrent + 1) {
        date = new Date(`${yearCurrent}-${month}-2`);
      } else {
        date = new Date(`${yearCurrent - 1}-${month}-2`);
      }
      setMonth && setMonth(date);
      setMonthSelect && setMonthSelect(month);
    },
  };

  return (
    <Card
      sx={{
        pt: 2,
        pl: paddingLeft,
        height: { xl: height ? 652 : 456, xs: height ? height : 456 },
      }}
    >
      <Stack
        direction="row"
        mx={5}
        justifyContent={button ? 'space-between' : 'center'}
        mt={button ? 2 : 0}
        mb={5}
        alignItems="center"
      >
        <Typography
          sx={{
            textAlign: 'center',
            mb: 1,
            fontWeight: 500,
            fontSize: button ? 25 : 20,
          }}
        >
          {title}
        </Typography>
        <Stack direction="row" alignItems="center">
          {/* {buttonExportDetail} */}
          {buttonExport}
          {button}
        </Stack>
      </Stack>
      <ReactEcharts
        onEvents={onEvents}
        key={Date.now()}
        theme="light"
        option={{
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            textStyle: {
              fontFamily: 'sans-serif',
            },
          },
          legend: {
            data: legend,
            textStyle: {
              fontFamily: 'sans-serif',
            },
            left: button ? left : 'center',
          },
          grid: {},
          xAxis: xAxis,
          yAxis: yAxis,
          series: series,
        }}
        style={{
          width: widthBoolean ? '106%' : '100%',
          height: '88%',
        }}
      />
    </Card>
  );
};

export default CardItemChart;
