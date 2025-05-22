'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 日本語の翻訳リソース
const resources = {
  ja: {
    translation: {
      'common.operation.send': '送信',
      'common.operation.lineBreak': '改行',
      'common.api.success': '成功しました',
      'app.chat.newChatDefaultName': '新しいチャット',
      'app.errorMessage.waitForResponse': '応答を待っています',
      'app.errorMessage.valueOfVarRequired': '必須項目を入力してください'
    }
  },
  en: {
    translation: {
      'common.operation.send': 'Send',
      'common.operation.lineBreak': 'Line Break',
      'common.api.success': 'Success',
      'app.chat.newChatDefaultName': 'New Chat',
      'app.errorMessage.waitForResponse': 'Waiting for response',
      'app.errorMessage.valueOfVarRequired': 'Required fields must be filled'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // デフォルト言語
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  })

export default i18n

export const setLocaleOnClient = (locale: string, force = false) => {
  if (force || i18n.language !== locale) {
    i18n.changeLanguage(locale)
  }
} 