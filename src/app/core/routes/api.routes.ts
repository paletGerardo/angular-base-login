import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/login`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  THEMES: `${ ENV.URL_BASE }/partners/themes/30687310434`
}
