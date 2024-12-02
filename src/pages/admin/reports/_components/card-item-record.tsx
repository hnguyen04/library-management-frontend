import { ArrowCircleRightSharp } from '@mui/icons-material';
import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type TCardItemRecord = {
  total: number | undefined;
  content: string;
  title: string;
  icon: any;
  background: string;
  pathRouter: string;
};

const CardItemRecord = (props: TCardItemRecord) => {
  const { total, content, title, icon, background, pathRouter } = props;

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        paddingX: 0,
        boxShadow: 2,
        backgroundColor: { background },
        height: 140,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Stack px={1} py={1} color="white">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Typography fontSize={24} fontWeight={500}>
            {total}
          </Typography>
          {icon}
        </Stack>
        <Typography>{content}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate(pathRouter);
        }}
      >
        <Typography sx={{ lineHeight: 2, fontWeight: 400 }}>{title}</Typography>
        <ArrowCircleRightSharp sx={{ fontSize: 18, fontWeight: 400, ml: 1 }} />
      </Stack>
    </Card>
  );
};

export default CardItemRecord;
