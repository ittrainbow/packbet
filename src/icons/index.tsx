import { FC, SVGProps } from 'react'

import { ReactComponent as FaArrowCircleDownSvg } from './fa-arrow-circle-down.svg'
import { ReactComponent as FaArrowCircleUpSvg } from './fa-arrow-circle-up.svg'
import { ReactComponent as FaArrowDownSvg } from './fa-arrow-down.svg'
import { ReactComponent as FaArrowUpSvg } from './fa-arrow-up.svg'
import { ReactComponent as FaBanSvg } from './fa-ban.svg'
import { ReactComponent as FaCheckSvg } from './fa-check.svg'
import { ReactComponent as FaPlusSvg } from './fa-plus.svg'
import { ReactComponent as FaStarSvg } from './fa-star.svg'
import { ReactComponent as FiEditSvg } from './fi-edit.svg'
import { ReactComponent as FiSlashSvg } from './fi-slash.svg'
import { ReactComponent as FiTrashSvg } from './fi-trash.svg'
import { ReactComponent as FlagBeSvg } from './flag-be.svg'
import { ReactComponent as FlagRuSvg } from './flag-ru.svg'
import { ReactComponent as FlagUaSvg } from './flag-ua.svg'

export * from './ball-icon'
export * from './calendar-icon'
export * from './chevron-icon'
export * from './gear-icon'
export * from './info-icon'
export * from './list-icon'
export * from './pen-icon'
export * from './user-icon'

type SvgIcon = FC<SVGProps<SVGSVGElement>>

const icon = (Svg: SvgIcon): SvgIcon => {
  const Icon = (props: SVGProps<SVGSVGElement>) => (
    <Svg width="1em" height="1em" aria-hidden focusable="false" {...props} />
  )
  return Icon
}

export const FaArrowDown = icon(FaArrowDownSvg)
export const FaArrowUp = icon(FaArrowUpSvg)
export const FaBan = icon(FaBanSvg)
export const FaCheck = icon(FaCheckSvg)
export const FaArrowCircleDown = icon(FaArrowCircleDownSvg)
export const FaArrowCircleUp = icon(FaArrowCircleUpSvg)
export const FaStar = icon(FaStarSvg)
export const FaPlus = icon(FaPlusSvg)
export const FiEdit = icon(FiEditSvg)
export const FiSlash = icon(FiSlashSvg)
export const FiTrash = icon(FiTrashSvg)

export const FlagRu = (props: SVGProps<SVGSVGElement>) => (
  <FlagRuSvg width={24} height={18} aria-hidden focusable="false" {...props} />
)

export const FlagUa = (props: SVGProps<SVGSVGElement>) => (
  <FlagUaSvg width={24} height={18} aria-hidden focusable="false" {...props} />
)

export const FlagBe = (props: SVGProps<SVGSVGElement>) => (
  <FlagBeSvg width={24} height={18} aria-hidden focusable="false" {...props} />
)
