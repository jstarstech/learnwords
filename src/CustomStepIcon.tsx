import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import { styled } from "@mui/material/styles";

const CustomStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#2e7d32",
    ...(ownerState.active && {
      color: "#2e7d32",
    }),
  })
);

interface CustomStepIconProps {
  /**
   * Whether this step is active.
   * @default false
   */
  active?: boolean;
  className?: string;
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed?: boolean;
}

export default function CustomStepIcon(props: CustomStepIconProps) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Brightness1SharpIcon /> : <RadioButtonUncheckedSharpIcon />}
    </CustomStepIconRoot>
  );
}
