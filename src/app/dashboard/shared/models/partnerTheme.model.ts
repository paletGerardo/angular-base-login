class Colors {
  id: string = '';
  rgba_primary: string = '';
  rgba_primary_dark: string = '';
  rgba_primary_light: string = '';
  hexa_primary: string = '';
  rgba_secondary: string = '';
  rgba_secondary_dark: string = '';
  rgbaSecondary_light: string = '';
  hexa_secondary: string = '';
  partner_themes_id: string = '';
}

class CarouselList {
  id: string = '';
  nombre: string = '';
  url: string = '';
  estado: boolean = true;
  createdAt: string = '';
  updatedAt: string = '';
  partnerThemesId: string = '';
}

export class PartnerTheme {
  //color_list
  font_primary_url: string = '';
  logo_url: string = '';
  bg_image_url: string = '';
  //caroucel_list
  colors: Colors = new Colors;
  carousel_list: CarouselList[] = [];
  cuit_socio: string = '';
  id: string = '';
  pop_up_body: string = '';
  pop_up_footer: string = '';
  pop_up_image_url: string = '';
  pop_up_show: string = '';
  pop_up_title: string = '';
}

export interface TemaSocio {
  id: string,
  cuit_socio: string,
  nombre: string,
  url_logo: string,
  url_imagen_fondo: string,
  url_tipografia: string,
  color: Color,
  barra_navegacion: Navbar,
  boton: Boton;
  imagenes_carrusel: ImagenCarrusel[]
}

export interface Color {
  id: string,
  cuit_socio: string,
  primario: string,
  primario_rgba: string,
  primario_rgba_light: string,
  secundario: string,
  secundario_rgba: any,
  secundario_rgba_light: any,
  terciario: string,
  terciario_rgba: any
  terciario_rgba_light: any
}

export interface Navbar {
  id: string,
  cuit_socio: string,
  color_primario: string,
  color_primario_rgba: string,
  color_primario_rgba_light: string,
  color_secundario: string,
  color_secundario_rgba: any,
  color_secundario_rgba_light: any,
  url_logo: any
}

export interface Boton {
  id: string,
  cuit_socio: string,
  primario_rgba: string,
  primario_rgba_light: string,
  secundario_rgba: string,
  secundario_rgba_light: string,
  fondo_rgba: string,
  fondo_rgba_light: string,
}

export interface ImagenCarrusel {
  id: string,
  cuitSocio: string,
  nombre: string,
  url: string,
  estado: string,
  createdAt: string,
  updatedAt: string,
}
