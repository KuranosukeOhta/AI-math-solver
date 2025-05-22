'use client'

import { ReactNode } from 'react'
import { I18nextProvider as Provider } from 'react-i18next'
import i18n from './client'

export function I18nextProvider({ children }: { children: ReactNode }) {
    return (
        <Provider i18n={i18n}>
            {children}
        </Provider>
    )
} 