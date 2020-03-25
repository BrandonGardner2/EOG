import CardHeader from "@material-ui/core/CardHeader";
import { withStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  title: {
    color: "white",
  },
});

// I noticed this shares the CardHeader name from material ui. Making it explicit this is a themed header.
const ThemedCardHeader = withStyles(styles)(CardHeader);

export default ThemedCardHeader;
