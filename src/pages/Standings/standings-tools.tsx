import { Input } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LocaleType, i18n } from '../../locale'
import { selectApp, selectTools, selectUser } from '../../redux/selectors'
import { toolsActions } from '../../redux/slices'
import { ChangeInputType } from '../../types'
import { Button, Switch } from '../../ui'

export const StandingsTools = () => {
  const dispatch = useDispatch()
  const { showOneWeek, showBuddies, standingsSearch, showTools } = useSelector(selectTools)
  const [showBuddiesLocal, setShowBuddiesLocal] = useState<boolean>(showBuddies)
  const { locale } = useSelector(selectUser)
  const { mobile } = useSelector(selectApp)

  // action handlers

  const handleSwitchShowOneWeek = () => {
    const value = !showOneWeek
    localStorage.setItem('packContestOneWeek', value.toString())
    dispatch(toolsActions.switchShowOneWeek())
  }

  const handleClearSearch = () => {
    dispatch(toolsActions.clearSearch())
  }

  const handleChangeSearch = (e: ChangeInputType) => {
    const { value } = e.target
    dispatch(toolsActions.setSearch(value))
  }

  const handleSwitchBuddies = () => {
    const value = !showBuddies
    setShowBuddiesLocal(value)
    dispatch(toolsActions.switchShowBuddies())
    localStorage.setItem('packContestFavList', value.toString())
  }

  // render styles and locales

  const { tableSearchMsg, tableClearBtn, tableOnlyWeekMsg, tableAllSeasonMsg, tableBuddiesMsg, tableAllUsersMsg } =
    i18n(locale, 'standings') as LocaleType

  const tools = (
    <div className="standings__tools flexcol5">
      <div className="standings__search flexrow5">
        <Input
          onChange={handleChangeSearch}
          value={standingsSearch}
          type="text"
          placeholder={tableSearchMsg}
          sx={{ width: '100%', height: '36px' }}
        />
        <div>
          <Button onClick={handleClearSearch} disabled={!standingsSearch} className={'standings__button'}>
            {tableClearBtn}
          </Button>
        </div>
      </div>
      <div className="standings__switchers" style={{ flexDirection: mobile ? 'column' : 'row' }}>
        <Switch
          onChange={handleSwitchShowOneWeek}
          checked={showOneWeek}
          messageOn={tableOnlyWeekMsg}
          messageOff={tableAllSeasonMsg}
          fullWidth={true}
        />
        <Switch
          onChange={handleSwitchBuddies}
          checked={showBuddiesLocal}
          messageOn={tableBuddiesMsg}
          messageOff={tableAllUsersMsg}
          fullWidth={true}
        />
      </div>
    </div>
  )

  return showTools ? tools : null
}
