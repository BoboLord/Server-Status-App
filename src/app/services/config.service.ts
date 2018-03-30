import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    csrfToken: string;
    baseURL = 'https://api.obsidianserver.cf';
}
