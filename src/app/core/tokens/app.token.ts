import { InjectionToken } from "@angular/core";

export interface AppConfig {
    apiUrl: string,
    name: string,
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const API_URL = new InjectionToken<string>('api.url');

export const LOCAL_STORAGE = new InjectionToken<Storage>('local.storage',
    {
        providedIn: 'root',
        factory: () => window.localStorage,
    }
)