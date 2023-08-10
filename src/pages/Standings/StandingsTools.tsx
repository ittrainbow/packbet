import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectApp, selectTools, selectUser } from '../../redux/selectors'
import { ChangeInputType, FadeRefType, LocaleType } from '../../types'
import { Button, Switch } from '../../UI'
import { animateFadeOut } from '../../helpers'
import { toolsActions } from '../../redux/slices'
import { i18n } from '../../locale'

import { Input } from '@mui/material'

type ToolsPropsType = {
  fadeOutTools: boolean
  tableRef: FadeRefType
}

export const StandingsTools = ({ fadeOutTools, tableRef }: ToolsPropsType) => {
  const dispatch = useDispatch()
  const { showOneWeek, showBuddies, standingsSearch, showTools } = useSelector(selectTools)
  const { mobile, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const toolsRef = useRef<HTMLDivElement>(null)

  // animate tools

  useEffect(() => {
    !fadeOutTools && animateFadeOut(toolsRef)
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

  const hancleChangeSearch = (e: ChangeInputType) => {
    const { value } = e.target
    dispatch(toolsActions.setSearch(value))
  }

  const handleSwitchBuddies = () => {
    const value = !showBuddies
    showTools && animateFadeOut(tableRef)
    setTimeout(() => dispatch(toolsActions.switchShowBuddies()), duration)
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
          sx={{ width: '100%', height: '36px' }}
        />
        <div>
          <Button onClick={handleClearSearch} disabled={!standingsSearch} className={'standings__button'}>
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