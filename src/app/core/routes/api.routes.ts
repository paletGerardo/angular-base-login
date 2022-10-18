import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/login`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  THEMES: `${ ENV.URL_BASE }/partners/themes`,
  PRODUCTS: `${ ENV.URL_BASE }/partners/statics/catalogos/productos`
}
