import { SVGProps } from 'react'

export function PenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path
        d="M21 11V12C21 16.971 16.971 21 12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.707 4.70701L19.293 3.29301C18.902 2.90201 18.269 2.90201 17.879 3.29301L8.712 12.46V15.288H11.54L20.707 6.12101C21.098 5.73101 21.098 5.09801 20.707 4.70701V4.70701Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.91 7.91009L16.09 5.09009"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
