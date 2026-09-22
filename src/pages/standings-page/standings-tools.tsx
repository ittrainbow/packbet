import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CURRENT_SEASON } from '@/config'
import { i18n } from '@/locale'
import { selectTools, selectUser } from '@/redux/selectors'
import { toolsActions } from '@/redux/slices'
import { Button, Input, SelectInput, Switch } from '@/ui'

export function StandingsTools() {
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
    i18n(locale, 'standings')

  if (!showTools) return null

  const options = Array.from({ length: CURRENT_SEASON - 2021 }, (_, i) => 2022 + i)

  return (
    <div className="grid border rounded-xl px-2 py-1 mb-1 border-ink/20 bg-white gap-1">
      <div className="justify-center items-center flex flex-row gap-2">
        <Input onChange={handleChangeSearch} value={standingsSearch} type="text" placeholder={tableSearchMsg} />
        <div>
          <Button
            onClick={handleClearSearch}
            disabled={!standingsSearch}
            size="sm"
            className="px-1"
            text={tableClearBtn}
          />
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
      <SelectInput options={options} onChange={handleChangeSeason} value={seasonSelected} />
    </div>
  )
}
