import { Alert, Button, Dialog } from '@mui/material'

import { FC, Suspense, memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Column } from 'react-table'

import { TimeRange } from 'components/foundational/TimeRange'
import { DataTable } from 'components/visualize/DataTable/index'
import {
  ItemTransformedMatrix,
  transformMatrixData,
} from 'utils/dataset/transforms'
import { useI18nString } from 'utils/hooks/i18n/use-i18n-string'
import { useMatrixByItem } from 'utils/hooks/use-matrix'
import { useStage } from 'utils/hooks/use-stages'

function StageName({ stageId }: { stageId: string }) {
  const { data } = useStage(stageId)
  const t = useI18nString()

  return <Link to={'/result/stages/' + stageId}>{t(data?.code)}</Link>
}

function StageSanity({ stageId }: { stageId: string }) {
  const invalidEl = <span style={{ opacity: 0.2 }}>--</span>
  const { data } = useStage(stageId)
  if (!data) return invalidEl

  return <>{data.sanity}</>
}

const StageSanityPerItem: FC<{
  stageId: string
  percentage: number
}> = memo(({ stageId, percentage }) => {
  const invalidEl = <span style={{ opacity: 0.2 }}>--</span>
  const { data } = useStage(stageId)
  if (!data) return invalidEl

  const value = data.sanity / percentage
  if (Number.isNaN(value) || !Number.isFinite(value)) return invalidEl

  return <>{value.toFixed(2)}</>
})
StageSanityPerItem.displayName = 'StageSanityPerItem'

function ItemMatrixData({ itemId }) {
  const matrix = useMatrixByItem(itemId)
  const { t } = useTranslation(['dataset', 'pages'])

  const columns = useMemo<Column<ItemTransformedMatrix>[]>(
    () => [
      {
        id: 'stage',
        accessor: 'stageId',
        Header: t('dataset:table.header.stage.title'),
        width: 170,
        disableSortBy: true,
        Cell: ({ row }) => (
          <Suspense
            fallback={
              <span style={{ opacity: 0.2 }}>{row.original.stageId}</span>
            }
          >
            <StageName stageId={row.original.stageId} />
          </Suspense>
        ),
      },
      {
        accessor: 'quantity',
        Header: t('dataset:table.header.quantity.title'),
        headerTooltip: t('dataset:table.header.quantity.description'),
        width: 70,
      },
      {
        accessor: 'times',
        Header: t('dataset:table.header.times.title'),
        headerTooltip: t('dataset:table.header.times.description'),
        width: 70,
      },
      {
        accessor: 'percentage',
        Header: t('dataset:table.header.percentage.title'),
        headerTooltip: t('dataset:table.header.percentage.description'),
        width: 100,
        Cell: ({ row }) => (
          <>{(row.original.percentage * 100).toFixed(2) + '%'}</>
        ),
      },
      {
        id: 'sanity',
        accessor: 'stageId',
        Header: t('dataset:table.header.sanity.title'),
        headerTooltip: t('dataset:table.header.sanity.description'),
        width: 100,
        Cell: ({ row }) => <StageSanity stageId={row.original.stageId} />,
      },
      {
        id: 'unitSanity',
        accessor: 'stageId',
        Header: t('dataset:table.header.unitSanity.title'),
        headerTooltip: t('dataset:table.header.unitSanity.description'),
        width: 100,
        Cell: ({ row }) => (
          <StageSanityPerItem
            stageId={row.original.stageId}
            percentage={row.original.percentage}
          />
        ),
      },
      {
        accessor: 'start',
        Header: t('dataset:table.header.timeRange.title'),
        headerTooltip: t('dataset:table.header.timeRange.description'),
        width: 180,
        disableSortBy: true,
        Cell: ({ row }) => (
          <TimeRange start={row.original.start} end={row.original.end} />
        ),
      },
    ],
    [],
  )

  const data = useMemo(() => transformMatrixData(matrix.data ?? []), [matrix])

  return <>{matrix.data && <DataTable columns={columns} data={data} />}</>
}

function ItemDetailPage() {
  const { itemId } = useParams()

  return (
    <>
      <Suspense fallback={<div>Loading Data...</div>}>
        <ItemMatrixData itemId={itemId} />
      </Suspense>
    </>
  )
}

export default ItemDetailPage
