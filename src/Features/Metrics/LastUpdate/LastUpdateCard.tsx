import React from "react";
import { ListItem, ListItemText, makeStyles, ListItemIcon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
// I made a definitions file just to have prettier display names.
// Typically I would expect some kind of display name from the API.
// but this can be used in absence assuming all possible values are known ahead of time.
import definitions from "../utils/definitions";
import { MetricData, updateActiveMetrics } from "../reducer";
import { getActiveMetrics } from "../selectors";

const useStyles = makeStyles({
  listItem: {
    boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.12)",
    borderRadius: "5px",
    margin: "4px 0",
  },
  listIcon: {
    minWidth: "auto",
    color: "red",

    "&:hover": {
      cursor: "pointer",
    },
  },
});

type OwnProps = {
  data: MetricData;
};

const LastUpdateCard = ({ data }: OwnProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeMetrics = useSelector(getActiveMetrics);

  const handleDelete = () => {
    const newActive = activeMetrics.filter(metric => metric !== data.metric);
    dispatch(updateActiveMetrics(newActive));
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={definitions.names[data.metric] || "Unknown Metric"}
        secondary={`Latest: ${data.value} ${data.unit}`}
        primaryTypographyProps={{ variant: "h6" }}
      />
      <ListItemIcon className={classes.listIcon} onClick={handleDelete}>
        <DeleteIcon />
      </ListItemIcon>
    </ListItem>
  );
};

export default LastUpdateCard;
