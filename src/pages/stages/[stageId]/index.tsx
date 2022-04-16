import { Alert } from '@mui/material'

import { Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Column } from 'react-table'

import { DataTable } from 'components/visualize/DataTable'
import {
  TransformedMatrix,
  transformMatrixData,
} from 'utils/dataset/transforms'
import { useI18nString } from 'utils/hooks/i18n/use-i18n-string'
import { useItem } from 'utils/hooks/use-items'
import { useMatrixByStage } from 'utils/hooks/use-matrix'

function ItemName({ matrix }: { matrix: TransformedMatrix }) {
  const { data } = useItem(matrix.itemId)
  const t = useI18nString()

  return <Link to={'/result/items/' + matrix.itemId}>{t(data?.name)}</Link>
}

function StageMatrixData({ stageId }) {
  const matrix = useMatrixByStage(stageId)
  const { t } = useTranslation(['dataset', 'pages'])

  const columns = useMemo<Column<TransformedMatrix>[]>(
    () => [
      {
        Header: 'Item',
        accessor: 'itemId',
        width: 230,
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <Suspense
              {...row.getRowProps()}
              fallback={
                <span style={{ opacity: 0.2 }}>{row.original.itemId}</span>
              }
            >
              <ItemName matrix={row.original} />
            </Suspense>
          )
        },
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
    ],
    [],
  )

  const data = useMemo(() => transformMatrixData(matrix.data ?? []), [matrix])

  return <>{matrix.data && <DataTable columns={columns} data={data} />}</>
}

function StageDetailPage() {
  const { stageId } = useParams()

  return (
    <>
      <Suspense fallback={<div>Loading Data...</div>}>
        <StageMatrixData stageId={stageId} />
      </Suspense>
    </>
  )
}

export default StageDetailPage
