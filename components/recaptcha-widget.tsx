'use client'

import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'

const ReCAPTCHALazy = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => (
    <div className="h-[78px] w-[304px] max-w-full bg-white/5 rounded animate-pulse" aria-hidden />
  ),
})

type RecaptchaWidgetProps = {
  theme?: 'dark' | 'light'
  sitekey: string
}

const RecaptchaWidget = forwardRef<ReCAPTCHA, RecaptchaWidgetProps>(function RecaptchaWidget(
  { theme = 'dark', sitekey },
  ref,
) {
  return <ReCAPTCHALazy ref={ref} theme={theme} sitekey={sitekey} />
})

export default RecaptchaWidget
