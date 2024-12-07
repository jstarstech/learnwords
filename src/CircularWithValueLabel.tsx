import Box from "@mui/material/Box";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { valueLabel: string }
) {
  const size = 30;
  const thickness = 3;
  const secColor = "#d1d1d1";

  const progressSx = {
    color: "#2e7d32",
    borderRadius: "50%",
    boxShadow: `inset 0 0 0 ${(thickness / 44) * size}px ${secColor}`,
  };

  const { valueLabel, ..._props } = props;

  return (
    <Box sx={{ mr: 2, position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        size={size}
        thickness={thickness}
        sx={progressSx}
        {..._props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {valueLabel}
        </Typography>
      </Box>
    </Box>
  );
}
