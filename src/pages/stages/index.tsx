import { Suspense } from 'react'
import { Link } from 'react-router-dom'

import { useI18nString } from '../../utils/hooks/i18n/use-i18n-string'
import { useStageByZone } from '../../utils/hooks/use-stages'
import { useZone, useZones } from '../../utils/hooks/use-zones'

function ZoneStageList({ zoneId }) {
  const zone = useZone(zoneId)
  const stages = useStageByZone(zoneId)
  const t = useI18nString()
  return (
    <>
      <h2>{t(zone.data?.zoneName)}</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {stages.data?.map((stage) => (
          <Link key={stage.stageId} to={'/stages/' + stage.stageId}>
            <small>
              <code>{stage.stageId}</code>
            </small>
            : {t(stage.code)}
          </Link>
        ))}
      </div>
    </>
  )
}

function StagesPage() {
  const zones = useZones()
  return (
    <>
      <Link to="/">Home</Link>
      <h1>Stages Page</h1>
      <code>`/stages`</code>
      {zones.data?.map((el) => (
        <Suspense
          key={el.zoneId}
          fallback={
            <div style={{ opacity: 0.2 }}>
              Loading stages for {el.zoneId}...
            </div>
          }
        >
          <ZoneStageList zoneId={el.zoneId} />
        </Suspense>
      ))}
    </>
  )
}

export default StagesPage
