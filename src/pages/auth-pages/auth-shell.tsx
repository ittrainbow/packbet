import { ReactNode, RefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import { usePageFadeClass } from '@/hooks'
import { i18n, Locale } from '@/locale'
import { selectUser } from '@/redux/selectors'
import { userActions } from '@/redux/slices'
import { LocaleSwitch } from '@/ui'

type Props = {
  children: ReactNode
  containerRef: RefObject<HTMLDivElement>
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-1.049 2.927-3.273 5.25-6.084 6.57l.001-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

export const AuthGoogleMark = GoogleMark

export const AuthShell = ({ children, containerRef }: Props) => {
  const dispatch = useDispatch()
  const fadeClass = usePageFadeClass()
  const { locale } = useSelector(selectUser)
  const { packContestLead } = i18n(locale, 'auth') as Locale

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] box-border min-h-[calc(100vh-var(--tabbar-height)-env(safe-area-inset-bottom,0px))]',
        fadeClass
      )}
      ref={containerRef}
      id="container"
    >
      <div className="flex flex-col items-center text-center gap-1 pb-6">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-packers text-gold text-[1.75rem] font-bold leading-none">
          G
        </span>
        <div className="font-bold text-lg text-ink leading-none mt-2 grid gap-1">
          <span>Packers News</span>
          <span>Prediction Contest</span>
        </div>
        <span className="text-sm text-ink-muted">{packContestLead}</span>
      </div>
      <div className="w-full flex flex-col gap-3">{children}</div>
      <div className="mt-auto pt-8 flex justify-center">
        <LocaleSwitch value={locale} onChange={(next) => dispatch(userActions.setLocale(next))} />
      </div>
    </div>
  )
}
