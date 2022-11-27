import { useGetInitQuery } from '@exusiai-dev/coredata/api/penguinV3Api'
import { RootState } from '@exusiai-dev/coredata/store'
import { Stage } from '@exusiai-dev/rest/v3/stages'
import { Zone } from '@exusiai-dev/rest/v3/zones'
import { Button } from '@mui/material'

import { memo } from 'react'
import { useSelector } from 'react-redux'

import { LanguageSettings } from './components/settings/LanguageSettings'
import { ServerSettings } from './components/settings/ServerSettings'

import './App.css'

const StageSelectorStageNavigator = ({ code }: { code: string }) => {
  return <Button variant="outlined">{code}</Button>
}

const StageSelectorZoneSegment = memo(
  ({ zone, stages }: { zone: Zone; stages: Stage[] }) => {
    const language = useSelector(
      (state: RootState) => state.preference.language,
    )

    return (
      <div>
        <h3>{zone.name[language]}</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {stages
            .filter((stage) => stage.zoneId === zone.pgZoneId)
            .map((stage) => (
              <StageSelectorStageNavigator
                key={stage.pgStageId}
                code={stage.code[language]}
              />
            ))}
        </div>
      </div>
    )
  },
)
StageSelectorZoneSegment.displayName = 'memo(StageSelectorZoneSegment)'

const StageSelector = () => {
  const { data, error, isLoading } = useGetInitQuery()

  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>A request error has occurred: {errMsg}</div>
        </div>
      )
    } else {
      return <div>An unexpected code error has {error.message}</div>
    }
  }
  if (isLoading) return <div>Loading...</div>

  return (
    <div
      style={{
        marginTop: '1rem',
        textAlign: 'left',
      }}
    >
      {data?.zones.map((zone) => (
        <StageSelectorZoneSegment
          zone={zone}
          stages={data?.stages.filter(
            (stage) => stage.zoneId === zone.pgZoneId,
          )}
        />
      ))}
    </div>
  )
}

const AppPreferences = () => {
  return (
    <div className="flex gap-2 justify-center">
      <ServerSettings />
      <LanguageSettings />
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <AppPreferences />
      <div className="card">
        <StageSelector />
      </div>
    </div>
  )
}

export default App
