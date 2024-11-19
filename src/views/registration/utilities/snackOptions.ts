import { OptionsObject } from "notistack";

type Variant = "default" | "error" | "success" | "warning" | "info" | undefined;

export const snackOptions = (variant?: Variant): OptionsObject => ({
  variant: variant,
  anchorOrigin: { horizontal: "center", vertical: "bottom" },
  autoHideDuration: 5000,
  hideIconVariant: true,
});
