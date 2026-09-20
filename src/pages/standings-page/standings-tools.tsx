import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Locale, i18n } from '../../locale'
import { selectTools, selectUser } from '../../redux/selectors'
import { toolsActions } from '../../redux/slices'
import { Button, Input, SelectInput, Switch } from '../../ui'

export const StandingsTools = () => {
  const dispatch = useDispatch()
  const { showOneWeek, showBuddies, standingsSearch, showTools, seasonSelected } = useSelector(selectTools)
  const [showBuddiesLocal, setShowBuddiesLocal] = useState<boolean>(showBuddies)
  const { locale } = useSelector(selectUser)

  const handleSwitchShowOneWeek = () => {
    const value = !showOneWeek
    localStorage.setItem('packContestOneWeek', value.toString())
    dispatch(toolsActions.switchShowOneWeek())
  }

  const handleClearSearch = () => {
    dispatch(toolsActions.clearSearch())
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(toolsActions.setSearch(value))
  }

  const handleSwitchBuddies = () => {
    const value = !showBuddies
    setShowBuddiesLocal(value)
    dispatch(toolsActions.switchShowBuddies())
    localStorage.setItem('packContestFavList', value.toString())
  }

  const handleChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(toolsActions.setChangeSeason(Number(e.target.value)))
  }

  const { tableSearchMsg, tableClearBtn, tableOnlyWeekMsg, tableAllSeasonMsg, tableBuddiesMsg, tableAllUsersMsg } =
    i18n(locale, 'standings') as Locale

  const tools = (
    <div className="grid border rounded-xl px-2 py-1 mb-1 border-ink/20 bg-white gap-1">
      <div className="justify-center items-center flex flex-row gap-2">
        <Input onChange={handleChangeSearch} value={standingsSearch} type="text" placeholder={tableSearchMsg} />
        <div>
          <Button onClick={handleClearSearch} disabled={!standingsSearch} size="sm" className="px-1" text={tableClearBtn} />
        </div>
      </div>
      <Switch
        onChange={() => seasonSelected !== 2022 && handleSwitchShowOneWeek()}
        checked={showOneWeek && seasonSelected !== 2022}
        messageOn={tableOnlyWeekMsg}
        messageOff={tableAllSeasonMsg}
        fullWidth={true}
        disabled={seasonSelected === 2022}
      />
      <Switch
        onChange={handleSwitchBuddies}
        checked={showBuddiesLocal}
        messageOn={tableBuddiesMsg}
        messageOff={tableAllUsersMsg}
        fullWidth={true}
      />
      <SelectInput options={[2022, 2023, 2024, 2025, 2026]} onChange={handleChangeSeason} value={seasonSelected} />
    </div>
  )

  return showTools ? tools : null
}
