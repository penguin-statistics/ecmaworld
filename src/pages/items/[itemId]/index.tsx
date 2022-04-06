import { Alert, Button, Dialog } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Matrix } from '../../../models/matrix'
import { useI18nString } from '../../../utils/hooks/i18n/use-i18n-string'
import { useItem } from '../../../utils/hooks/use-items'
import { useMatrixByItem } from '../../../utils/hooks/use-matrix'
import { useStage } from '../../../utils/hooks/use-stages'

function StageName(params: GridRenderCellParams<any, Matrix, any>) {
  const { data } = useStage(params.row.stageId)
  const t = useI18nString()

  return <Link to={'/stages/' + params.row.stageId}>{t(data?.code)}</Link>
}

function StageSanity(params: GridRenderCellParams<any, Matrix, any>) {
  const { data } = useStage(params.row.stageId)

  return <>{data?.apCost}</>
}

function ItemData({ itemId }) {
  const item = useItem(itemId)
  const [open, setOpen] = useState(false)
  const t = useI18nString()

  return (
    <>
      <div>
        Current selected item: {t(item.data?.name)} ({item.data?.itemId})
      </div>
      <Button
        variant="outlined"
        sx={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
        onClick={() => setOpen(true)}
      >
        Show Item JSON
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <pre>
          <code>{JSON.stringify(item, null, 4)}</code>
        </pre>
      </Dialog>
    </>
  )
}

function transformMatrixData(matrix: Matrix[]) {
  return matrix.map((row) => {
    return {
      ...row,
      id: row.stageId + row.itemId,
      stageId: row.stageId,
      percentage: row.quantity / row.times,
    }
  })
}

function ItemMatrixData({ itemId }) {
  const item = useMatrixByItem(itemId)

  const columns: GridColDef<Matrix>[] = [
    {
      field: 'stageId',
      headerName: 'Stage',
      width: 150,
      renderCell: (params) => (
        <Suspense
          fallback={<span style={{ opacity: 0.2 }}>{params.row.stageId}</span>}
        >
          <StageName {...params} />
        </Suspense>
      ),
    },
    {
      field: 'apCost',
      headerName: 'AP Cost',
      width: 150,
      renderCell: (params) => (
        <Suspense
          fallback={<span style={{ opacity: 0.2 }}>{params.row.stageId}</span>}
        >
          <StageSanity {...params} />
        </Suspense>
      ),
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      width: 150,
      renderCell: ({ row }) =>
        ((row.quantity / row.times) * 100).toFixed(2) + '%',
    },
    {
      field: 'times',
      headerName: 'Times',
      width: 100,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
    },
  ]

  return (
    <>
      <Alert
        variant="outlined"
        sx={{
          marginBottom: '1rem',
        }}
      >
        Got {item.data?.length} rows from Matrix by Item
      </Alert>
      {item.data && (
        <DataGrid
          density="compact"
          sx={{
            height: '80vh',
          }}
          autoPageSize
          initialState={{
            sorting: {
              sortModel: [{ field: 'percentage', sort: 'desc' }],
            },
          }}
          rows={transformMatrixData(item.data)}
          columns={columns}
        />
      )}
      {/* <ul>
        {item.data?.map((row) => (
          <li key={row.stageId}>
            <Suspense
              fallback={<span style={{ opacity: 0.2 }}>{row.stageId}</span>}
            >
              <StageName stageId={row.stageId} />
            </Suspense>
            {': '}
            {row.quantity}/{row.times} (
            {((row.quantity / row.times) * 100).toFixed(2)}%)
          </li>
        ))}
      </ul> */}
    </>
  )
}

function ItemDetailPage() {
  const { itemId } = useParams()

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <h1>Item Detail Page</h1>
      <Suspense fallback={<div>Loading Data...</div>}>
        <ItemData itemId={itemId} />
        <ItemMatrixData itemId={itemId} />
      </Suspense>
    </>
  )
}

export default ItemDetailPage
