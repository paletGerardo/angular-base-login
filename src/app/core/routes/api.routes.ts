import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  AUTH: {
    LOGIN: `${ENV.url}/auth/login`,
    LOGOUT: `${ENV.url}/auth/logout`,
  }
}
