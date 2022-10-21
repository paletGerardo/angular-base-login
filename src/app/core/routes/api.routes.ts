import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/login`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  THEMES: `${ ENV.URL_BASE }/themes/getThemeBycuit/`,
  PRODUCTS: `${ ENV.URL_BASE }/products/getAllProductsByCuit/`
}
