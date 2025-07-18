import type { ComponentPropsWithRef } from 'react';

import { Button as MaterialButton } from '@mui/material';

type Props = ComponentPropsWithRef<typeof MaterialButton>;

export const Button = (props: Props) => {
  return <MaterialButton {...props} />;
};
