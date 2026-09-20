import { SVGProps } from 'react'

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M6.50999 13.82H11.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.86 8.38L6 15.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.71 15.01L8.86 8.38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 21H7C4.791 21 3 19.209 3 17V7C3 4.791 4.791 3 7 3H17C19.209 3 21 4.791 21 7V17C21 19.209 19.209 21 17 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17.75 11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17.161 11.579C17.9463 12.3643 17.9463 13.6376 17.161 14.423C16.3757 15.2083 15.1024 15.2083 14.317 14.423C13.5317 13.6376 13.5317 12.3643 14.317 11.579C15.1024 10.7937 16.3757 10.7937 17.161 11.579"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
