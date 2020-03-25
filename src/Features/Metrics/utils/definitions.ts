type Definitions = {
  names: { [key: string]: string };
  colors: { [key: string]: string };
};

export default {
  names: {
    casingPressure: "Casing Pressure",
    flareTemp: "Flare Temp",
    injValveOpen: "Inj Valve Open",
    oilTemp: "Oil Temp",
    tubingPressure: "Tubing Pressure",
    waterTemp: "Water Temp",
  },
  colors: {
    casingPressure: "#5DA5DA",
    flareTemp: "#4D4D4D",
    injValveOpen: "#F17CB0",
    oilTemp: "#DECF3F",
    tubingPressure: "#60BD68",
    waterTemp: "#B276B2",
  },
} as Definitions;
