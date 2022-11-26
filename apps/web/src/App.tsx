import { useGetInitQuery } from '@exusiai-dev/coredata/api/penguinV3Api'
import { changeLanguage, changeServer } from '@exusiai-dev/coredata/preferences'
import { RootState } from '@exusiai-dev/coredata/store'
import { Stage } from '@exusiai-dev/rest/v3/stages'
import { Zone } from '@exusiai-dev/rest/v3/zones'
import { Button } from '@mui/material'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { LanguageSettings } from './components/settings/LanguageSettings'

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
  const server = useSelector((state: RootState) => state.preference.server)
  const dispatch = useDispatch()
  return (
    <>
      <h1>{server}</h1>
      <LanguageSettings />
      <div className="card">
        <button
          onClick={() => {
            dispatch(changeServer('CN'))
          }}
        >
          server = CN
        </button>

        <button
          onClick={() => {
            dispatch(changeServer('US'))
          }}
        >
          server = US
        </button>

        <button
          onClick={() => {
            dispatch(changeLanguage('zh'))
          }}
        >
          lang = zh
        </button>

        <button
          onClick={() => {
            dispatch(changeLanguage('en'))
          }}
        >
          lang = en
        </button>
      </div>
    </>
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
