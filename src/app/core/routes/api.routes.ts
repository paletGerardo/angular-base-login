import { environment as ENV } from "../../../environments/environment.devs";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/login`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  TEMA_SOCIO: `${ ENV.URL_BASE }/temas/obtener-temas/cuit`,
  PRODUCTS: `${ ENV.URL_BASE }/productos/obtener-productos-por-cuit`,
  PRODUCTSDETAIL:`${ ENV.URL_BASE }/products/getDetailByProductId/`,
  PRODUCTO:`${ ENV.URL_BASE }/productos/obtener-producto/id`,
  COBERTURAS:`${ ENV.URL_BASE }/productos/coberturas`,
  DETALLE_PRODUCTO:`${ ENV.URL_BASE }/productos/obtener-detalle-producto/id-producto`,
  IMGAGEN_PRODUCTO_1:`${ ENV.URL_BASE }/productos/obtener-imagen/id-producto`,
  PRODUCTIMAGE:`${ ENV.URL_BASE }/products/getImageByProductId/`,

  //productos
  PRODUCTOS_FILTRO:`${ ENV.URL_BASE }/productos/busquedas/buscar-parametros`,


  //descargas
  DESCARGAR_COBERTURA:`${ ENV.URL_BASE }/descargas/cobertura/cuit`,
  DESCARGAR_CONDICIONES:`${ ENV.URL_BASE }/descargas/condiciones/cuit`,

}
