export interface Producto {
  id_producto: string;
  codigo_producto: number;
  ramo: number;
  destino_alta: string;
  id_negocio: number;
  producto_descripcion: string;
  planes: Plan[];
  valida_titular: number;
  valida_beneficiario: number;
  medios_de_pago: MedioDePago[];
}

export interface Plan {
  codigo_plan: number,
  id_plan: number,
  rangos: Rango[];
  activeColor?: string,
  active?: boolean,
}

export interface Rango {
  codigo_etario: number,
  descripcion_rango_etario: number,
  precio: number,
  riesgos: Riesgo[];

}

export interface Riesgo {
  codigo_riesgo: number,
  descipcion_riesgo: string,
  suma_asegurada_riesgo: number,
}

export interface MedioDePago {
  id_medio_pago: number,
  descripcion_medio_pago: string

}
