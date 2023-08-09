import { useRef, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectApp, selectTools, selectUser } from '../redux/selectors'
import { Button, Switch } from '.'
import { toolsActions } from '../redux/slices'
import { LocaleType } from '../types'
import { fadeOut } from '../helpers'
import { i18n } from '../locale'

import { Input } from '@mui/material'

type ToolsPropsType = {
  fadeOutTools: boolean
}

export const Tools = ({ fadeOutTools }: ToolsPropsType) => {
  const dispatch = useDispatch()
  const { showOneWeek, showBuddies, standingsSearch } = useSelector(selectTools)
  const { mobile } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const toolsRef = useRef<HTMLDivElement>(null)

  // animate tools

  useEffect(() => {
    !fadeOutTools && fadeOut(toolsRef, 'tools')
  }, [fadeOutTools])

  // action handlers

  const handleSwitchShowOneWeek = () => {
    const value = !showOneWeek
    localStorage.setItem('packContestOneWeek', value.toString())
    dispatch(toolsActions.switchShowOneWeek())
  }

  const handleClearSearch = () => {
    dispatch(toolsActions.clearSearch())
  }

  const hancleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(toolsActions.setSearch(value))
  }

  const handleSwitchBuddies = () => {
    const value = !showBuddies
    dispatch(toolsActions.switchShowBuddies())
    localStorage.setItem('packContestFavList', value.toString())
  }

  // render styles and locales

  const msg = i18n(locale, 'standings') as LocaleType

  return (
    <div className="standings__tools animate-fade-in-up" ref={toolsRef}>
      <div className="standings__search">
        <Input
          onChange={hancleChangeSearch}
          value={standingsSearch}
          type="text"
          placeholder={msg.tableSearchMsg}
          sx={{ width: '100%', height: '43px' }}
        />
        <div>
          <Button onClick={handleClearSearch} minWidth={80} disabled={!standingsSearch}>
            {msg.tableClearBtn}
          </Button>
        </div>
      </div>
      <div className="standings__switchers" style={{ flexDirection: mobile ? 'column' : 'row' }}>
        <Switch
          onChange={handleSwitchShowOneWeek}
          checked={showOneWeek}
          messageOn={msg.tableOnlyWeekMsg}
          messageOff={msg.tableAllSeasonMsg}
          fullWidth={true}
        />
        <Switch
          onChange={handleSwitchBuddies}
          checked={showBuddies}
          messageOn={msg.tableBuddiesMsg}
          messageOff={msg.tableAllUsersMsg}
          fullWidth={true}
        />
      </div>
    </div>
  )
}
