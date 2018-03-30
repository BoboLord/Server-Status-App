import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    csrfToken: string;
    baseURL = 'http://127.0.0.1:3000';
}
