import { Autocomplete, Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { TBaseInputProps } from '@/base/base-form-input';
import useLoading from '@/hooks/use-loading';
import useTranslation from '@/hooks/use-translation';
import bankingService from '@/services/common/banking.service';

const SelectBankInput = ({ onChange, value }: TBaseInputProps<string>) => {
  const { t } = useTranslation();

  const getBanksQuery = useQuery({
    queryKey: ['banks'],
    queryFn: () => bankingService.getBanks(),
    staleTime: Infinity,
  });

  const listBankOption = useMemo(
    () =>
      getBanksQuery.data?.map((x) => ({
        label: x.name,
        value: x.bin,
        logo: x.logo,
      })) || [],
    [getBanksQuery.data],
  );

  useLoading({
    showConditionsSome: [getBanksQuery.isFetching],
    hideConditionsEvery: [!getBanksQuery.isFetching],
  });

  return (
    <Autocomplete
      fullWidth
      loading={getBanksQuery.isLoading}
      options={listBankOption}
      isOptionEqualToValue={(option, e) => option.value === e.value}
      value={listBankOption?.find((x) => x.value === value)}
      onChange={(_e, data) => {
        if (!data) return;
        onChange(data?.value);
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {!!option.logo && (
            <img loading="lazy" width="64" src={option.logo} alt="" />
          )}
          {option.label} ({option.label})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          placeholder={t('Chọn ngân hàng')}
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: listBankOption?.find((x) => x.value === value)
              ?.logo ? (
              <img
                loading="lazy"
                width="64"
                src={listBankOption?.find((x) => x.value === value)?.logo}
                alt="logo"
              />
            ) : null,
          }}
        />
      )}
    />
  );
};

export default SelectBankInput;
