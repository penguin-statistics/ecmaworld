import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import { Suspense } from 'react'
import { Link } from 'react-router-dom'

import { useI18nString } from 'utils/hooks/i18n/use-i18n-string'
import { useStageByZone } from 'utils/hooks/use-stages'
import { useZone, useZones } from 'utils/hooks/use-zones'

function ZoneStageList({ zoneId }) {
  const zone = useZone(zoneId)
  const stages = useStageByZone(zoneId)
  const t = useI18nString()
  return (
    <Accordion>
      <AccordionSummary>{t(zone.data?.name)}</AccordionSummary>
      <AccordionDetails>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {stages.data?.map((stage) => (
            <Link
              key={stage.arkStageId}
              to={'/result/stages/' + stage.arkStageId}
            >
              <small>
                <code>{stage.arkStageId}</code>
              </small>
              : {t(stage.code)}
            </Link>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

function StagesPage() {
  const zones = useZones()
  return (
    <>
      {zones.data?.map((el) => (
        <Suspense
          key={el.arkZoneId}
          fallback={
            <div style={{ opacity: 0.2 }}>
              Loading stages for {el.arkZoneId}...
            </div>
          }
        >
          <ZoneStageList zoneId={el.arkZoneId} />
        </Suspense>
      ))}
    </>
  )
}

export default StagesPage
