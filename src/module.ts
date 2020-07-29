import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { CompassAnemometer } from './CompassAnemometer';

export const plugin = new PanelPlugin<SimpleOptions>(CompassAnemometer).setPanelOptions(builder => {
  return builder;
});
