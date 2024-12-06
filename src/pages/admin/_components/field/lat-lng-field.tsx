import { HelpTwoTone } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
  TextFieldProps,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import { ForwardRefRenderFunction, forwardRef } from 'react';

const DEFAULT_POSITION = {
  lat: 21.010638057480595,
  lng: 105.78869914143998,
};

type TLatLngFieldProps = {
  value?: string;
  onChange?: (v?: string) => void;
  placeholder?: string;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const LatLngField: ForwardRefRenderFunction<
  HTMLDivElement,
  TLatLngFieldProps
> = ({ onChange, value, ...props }, forwardedRef) => {
  return (
    <TextField
      ref={forwardedRef}
      value={value || ''}
      onChange={(e) => {
        onChange?.(e.target.value?.replace(/\s/g, '') || undefined);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              title="Xem vị trí trên bản đồ GoogleMap"
              placement="top-end"
            >
              <IconButton
                edge="end"
                size="small"
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${
                  value
                    ? value
                    : DEFAULT_POSITION.lat + ',' + DEFAULT_POSITION.lng
                }`}
              >
                {GoogleSvg}
              </IconButton>
            </Tooltip>
            <CustomWidthTooltip
              title={
                <div>
                  <Typography>
                    {`Lấy vĩ độ(latitude) và kinh độ(longitude) từ đường dẫn`}
                  </Typography>
                  <Typography>
                    {`GoogleMap: (...google.com/maps/.../@`}
                    <Typography color="greenyellow" component="span">
                      latitude,longitude
                    </Typography>
                    {`,...)`}
                  </Typography>
                  <Typography>--- hoặc ---</Typography>
                  <Typography>{`Di chuyển con trỏ tới vị trí trên bản đồ, và click phải chuột`}</Typography>
                  <Typography>{`sau đó chọn option đầu tiên`}</Typography>
                </div>
              }
              placement="top-end"
            >
              <IconButton edge="end" size="small" sx={{ ml: 1 }}>
                <HelpTwoTone />
              </IconButton>
            </CustomWidthTooltip>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    ['.MuiTypography-root']: {
      fontSize: 14,
    },
  },
});

const GoogleSvg = (
  <SvgIcon>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
      enableBackground="new 0 0 48 48"
      xmlSpace="preserve"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  </SvgIcon>
);

export default forwardRef(LatLngField);