import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale
{
    lang: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: Object;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationLoaderService
{
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    constructor(
        private _translateService: TranslateService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load translations
     *
     * @param {Locale} args
     */
    loadTranslations(...args: Locale[]): void
    {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            // eslint-disable-next-line no-underscore-dangle
            this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    }
}
