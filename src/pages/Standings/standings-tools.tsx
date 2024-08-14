import { Input, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Locale, i18n } from '../../locale'
import { selectTools, selectUser } from '../../redux/selectors'
import { toolsActions } from '../../redux/slices'
import { ChangeInput } from '../../types'
import { Button, SelectInput, Switch } from '../../ui'

export const StandingsTools = () => {
  const dispatch = useDispatch()
  const { showOneWeek, showBuddies, standingsSearch, showTools, seasonSelected } = useSelector(selectTools)
  const [showBuddiesLocal, setShowBuddiesLocal] = useState<boolean>(showBuddies)
  const { locale } = useSelector(selectUser)

  // action handlers

  const handleSwitchShowOneWeek = () => {
    const value = !showOneWeek
    localStorage.setItem('packContestOneWeek', value.toString())
    dispatch(toolsActions.switchShowOneWeek())
  }

  const handleClearSearch = () => {
    dispatch(toolsActions.clearSearch())
  }

  const handleChangeSearch = (e: ChangeInput) => {
    const { value } = e.target
    dispatch(toolsActions.setSearch(value))
  }

  const handleSwitchBuddies = () => {
    const value = !showBuddies
    setShowBuddiesLocal(value)
    dispatch(toolsActions.switchShowBuddies())
    localStorage.setItem('packContestFavList', value.toString())
  }

  const handleChangeSeason = (e: SelectChangeEvent<number | string>) => {
    const { value } = e.target
    dispatch(toolsActions.setChangeSeason(typeof value === 'string' ? Number(value) : value))
  }

  // render styles and locales

  const { tableSearchMsg, tableClearBtn, tableOnlyWeekMsg, tableAllSeasonMsg, tableBuddiesMsg, tableAllUsersMsg } =
    i18n(locale, 'standings') as Locale

  const tools = (
    <div className="grid border rounded-md p-1 mb-1 border-gray-400 gap-1">
      <div className="justify-center items-center flex flex-row gap-1">
        <Input
          onChange={handleChangeSearch}
          value={standingsSearch}
          type="text"
          placeholder={tableSearchMsg}
          sx={{ width: '100%', height: '36px' }}
        />
        <div>
          <Button onClick={handleClearSearch} disabled={!standingsSearch} className="h-[36px] px-1">
            {tableClearBtn}
          </Button>
        </div>
      </div>
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
      <SelectInput options={[2022, 2023, 2024]} onChange={handleChangeSeason} value={seasonSelected} />
    </div>
  )

  return showTools ? tools : null
}
