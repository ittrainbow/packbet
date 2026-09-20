import { ReactNode, useRef, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from '@/icons'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import { usePageFadeClass } from '@/hooks'
import { Locale, i18n } from '@/locale'
import { selectAbout, selectUser } from '@/redux/selectors'
import { Button } from '@/ui'

const WEEK_BTN = 'shrink-0 text-lg text-ink !bg-ink/15 !border-ink/20'

const EXAMPLES = {
  ru: [
    { name: 'Владимир', correct: 31, total: 60, skipped: 0 },
    { name: 'Алексей', correct: 28, total: 55, skipped: 5 },
    { name: 'Кирилл', correct: 26, total: 50, skipped: 12 }
  ],
  ua: [
    { name: 'Володимир', correct: 31, total: 60, skipped: 0 },
    { name: 'Олексій', correct: 28, total: 55, skipped: 5 },
    { name: 'Кирило', correct: 26, total: 50, skipped: 12 }
  ],
  by: [
    { name: 'Уладзімір', correct: 31, total: 60, skipped: 0 },
    { name: 'Аляксей', correct: 28, total: 55, skipped: 5 },
    { name: 'Кірыл', correct: 26, total: 50, skipped: 12 }
  ]
}

const splitHeading = (text = '') => {
  const i = text.indexOf('?')
  if (i === -1) return { heading: text, body: '' }
  return { heading: text.slice(0, i + 1), body: text.slice(i + 1).trim() }
}

const glossaryItems = (text = '') =>
  text
    .replace(/\. (Под |Під |Пад )/g, '.\n$1')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-2">
    <h2 className="font-bold text-base">{title}</h2>
    {children}
  </section>
)

const Body = ({ children }: { children: ReactNode }) => (
  <p className="text-sm leading-5">{children}</p>
)

export const About = () => {
  const fadeClass = usePageFadeClass()
  const { locale } = useSelector(selectUser)
  const about = useSelector(selectAbout)
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const { buttonDetailsMsg, buttonCollapseMsg } = i18n(locale, 'buttons') as Locale
  const {
    aboutTitleMsg,
    aboutYesMsg,
    aboutNoMsg,
    aboutOverMsg,
    aboutUnderMsg,
    aboutLegendMsg,
    aboutRulesMsg,
    aboutTermsMsg,
    aboutColPlayer,
    aboutColCorrect,
    aboutColSkipped,
    aboutColAccuracy
  } = i18n(locale, 'about') as Locale

  const pack = about[locale] || about.ru || {}
  const intro = pack['0'] ?? ''
  const { heading: gistHeading } = splitHeading(pack['1'])
  const { heading: exampleHeading, body: exampleLead } = splitHeading(pack['6'])
  const legend = [
    { icon: <FaCheck />, text: aboutYesMsg },
    { icon: <FaBan />, text: aboutNoMsg },
    { icon: <FaArrowUp />, text: aboutOverMsg },
    { icon: <FaArrowDown />, text: aboutUnderMsg }
  ]
  const examples = EXAMPLES[locale]
  const terms = glossaryItems(pack['13'])

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] gap-3 box-border min-h-[calc(100vh-var(--tabbar-height)-env(safe-area-inset-bottom,0px))]',
        fadeClass
      )}
      ref={containerRef}
      id="container"
    >
      <span className="font-bold text-base leading-none">{aboutTitleMsg}</span>
      <div className="flex flex-col gap-6 grow">
        <p className="text-sm leading-5">{intro}</p>
        <Button onClick={() => setOpen((prev) => !prev)} text={open ? buttonCollapseMsg : buttonDetailsMsg} />

        {open ? (
          <>
            <Section title={gistHeading}>
              {pack['2'] ? <Body>{pack['2']}</Body> : null}
              {pack['3'] ? <Body>{pack['3']}</Body> : null}
            </Section>

            <Section title={aboutRulesMsg}>
              {pack['4'] ? <Body>{pack['4']}</Body> : null}
              {pack['5'] ? <Body>{pack['5']}</Body> : null}
              {pack['12'] ? <Body>{pack['12']}</Body> : null}
            </Section>

            <Section title={exampleHeading}>
              {exampleLead ? <Body>{exampleLead}</Body> : null}
              <div className="rounded-xl border border-ink/30 bg-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-ink-muted text-xs">
                      <th className="px-3 py-2 font-bold text-left">{aboutColPlayer}</th>
                      <th className="px-3 py-2 font-bold text-right">{aboutColCorrect}</th>
                      <th className="px-3 py-2 font-bold text-right">{aboutColSkipped}</th>
                      <th className="px-3 py-2 font-bold text-right">{aboutColAccuracy}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examples.map((row) => (
                      <tr key={row.name} className="border-t border-ink/15">
                        <td className="px-3 py-2">{row.name}</td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.correct}/{row.total}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">{row.skipped}</td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {((row.correct / row.total) * 100).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pack['10'] ? <Body>{pack['10']}</Body> : null}
              {pack['11'] ? <Body>{pack['11']}</Body> : null}
            </Section>

            <Section title={aboutLegendMsg}>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-ink/30 bg-white p-3">
                {legend.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 pointer-events-none">
                    <Button size="sm" className={WEEK_BTN} onClick={() => undefined} icon={icon} />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={aboutTermsMsg}>
              {terms.map((item) => (
                <Body key={item}>{item}</Body>
              ))}
            </Section>
          </>
        ) : null}

        <div className={clsx('flex justify-center items-end mt-auto text-ink-muted', open ? 'pt-2 pb-4' : 'pt-2')}>
          <a href="https://t.me/packersnews">
            Green 19 {`${String.fromCodePoint(0x00a9)} 2022-${new Date().getFullYear()}`}
          </a>
        </div>
      </div>
    </div>
  )
}
