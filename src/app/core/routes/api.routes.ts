import { environment as ENV } from "../../../environments/environment";

export const ENDPOINTS_API = {
  LOGIN: `${ ENV.URL_BASE }/auth/login?grant_type=client_credentials`,
  LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
}
