type Definitions = {
  metrics: { [key: string]: string };
};

export default {
  metrics: {
    casingPressure: 'Casing Pressure',
    flareTemp: 'Flare Temp',
    injValveOpen: 'Inj Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    waterTemp: 'Water Temp',
  },
} as Definitions;
