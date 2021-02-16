
import { EstacionesEffects } from './estaciones.effects';
import { EstacionEffects } from './estacion.effects';
import { EntradasPaginadaEffects } from './entradasPaginadas.effects';
import { EstacionesActiveEffects} from './estacionesActive.effects'


export const effectsArr: any[] = [EstacionesEffects,EstacionEffects, EntradasPaginadaEffects, EstacionesActiveEffects  ];


export * from './estaciones.effects';
export * from './estacion.effects';
export * from './entradasPaginadas.effects';
export * from './estacionesActive.effects';
