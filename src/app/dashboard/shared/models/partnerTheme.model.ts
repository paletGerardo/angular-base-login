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
  carousel_List: CarouselList[] = [];
  cuit_socio: string = '';
  id: string = '';
  pop_up_body: string = '';
  pop_up_footer: string = '';
  pop_up_image_url: string = '';
  pop_up_show: string = '';
  pop_up_title: string = '';
}
