export interface PartnerTheme {
  //color_list
  color_List: {
    color_primary: string;
    color_secondary: string;
    color_tertiary: string;
  };
  font_primary_url: string;
  logo_url: string;
  bg_image_url: string;
  //caroucel_list
  carousel_List: {
    id: number;
    carousel_name: string;
    url: string;
    estado: boolean;
    create_at: string;
    updated_ar: string;
    partner_theme_id: number;
  };
  cuit_socio: string;
  id: string;
  pop_up_body: string;
  pop_up_footer: string;
  pop_up_image_url: string;
  pop_up_show: string;
  pop_up_title: string;
}
