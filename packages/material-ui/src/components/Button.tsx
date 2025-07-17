import { Button as MaterialButton } from "@mui/material";
import type { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<typeof MaterialButton>;

export const Button = (props: Props) => {
  return <MaterialButton {...props} />;
};
