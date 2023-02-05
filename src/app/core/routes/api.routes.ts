import { environment as ENV } from "../../../environments/environment.devs";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/login`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  TEMA_SOCIO: `${ ENV.URL_BASE }/temas/obtener-temas/cuit`,
  DETALLE_PRODUCTO:`${ ENV.URL_BASE }/productos/detalles/obtener-detalle`,
  PRODUCTIMAGE:`${ ENV.URL_BASE }/products/getImageByProductId/`,

  //productos
  PRODUCTOS_FILTRO:`${ ENV.URL_BASE }/productos/busquedas/buscar-parametros`,
  PRODUCTO:`${ ENV.URL_BASE }/productos/producto/obtener-producto/id`,
  PRODUCTS: `${ ENV.URL_BASE }/productos/producto/obtener-productos-por-cuit`,
  IMGAGEN_PRODUCTO_1:`${ ENV.URL_BASE }/productos/producto/obtener-imagen/id-producto`,
  COBERTURAS:`${ ENV.URL_BASE }/productos/coberturas`,


  //descargas
  DESCARGAR_COBERTURA:`${ ENV.URL_BASE }/descargas/cobertura/cuit`,
  DESCARGAR_CONDICIONES:`${ ENV.URL_BASE }/descargas/condiciones/cuit`,
  IMAGENES_CARRUSEL: `${ ENV.URL_BASE }/temas/carrusel/obtener-carrusel`,
  BARRA_NAVEGACION: `${ ENV.URL_BASE }/temas/barra-navegacion/obtener-barra-navegacion`,


}
