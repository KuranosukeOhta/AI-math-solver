import 'server-only'

import { headers } from 'next/headers'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import type { Locale } from '.'
import { i18n } from '.'

export const getLocaleOnServer = (): Locale => {
  try {
    // @ts-expect-error locales are readonly
    const locales: string[] = i18n.locales

    let languages: string[] | undefined = []

    // cookiesを使用せず、ヘッダーからのみ言語を検出
    try {
      // Negotiator expects plain object so we need to transform headers
      const negotiatorHeaders: Record<string, string> = {}
      headers().forEach((value, key) => (negotiatorHeaders[key] = value))
      // Use negotiator and intl-localematcher to get best locale
      languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    } catch (e) {
      console.error('Error detecting languages from headers:', e)
      languages = [i18n.defaultLocale]
    }

    if (!languages || !languages.length) {
      return i18n.defaultLocale as Locale
    }

    try {
      // match locale
      const matchedLocale = match(languages, locales, i18n.defaultLocale) as Locale
      return matchedLocale
    } catch (e) {
      console.error('Error matching locale:', e)
      return i18n.defaultLocale as Locale
    }
  } catch (e) {
    console.error('Error in getLocaleOnServer:', e)
    return i18n.defaultLocale as Locale
  }
}
