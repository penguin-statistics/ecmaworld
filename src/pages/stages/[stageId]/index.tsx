import { Alert } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Matrix } from '../../../models/matrix'
import { useI18nString } from '../../../utils/hooks/i18n/use-i18n-string'
import { useItem } from '../../../utils/hooks/use-items'
import { useMatrixByStage } from '../../../utils/hooks/use-matrix'

function ItemName(params: GridRenderCellParams<any, Matrix, any>) {
  const { data } = useItem(params.row.itemId)
  const t = useI18nString()

  return <Link to={'/items/' + params.row.itemId}>{t(data?.name)}</Link>
}

function StageMatrixData({ stageId }) {
  const matrix = useMatrixByStage(stageId)

  const columns: GridColDef<Matrix>[] = [
    {
      field: 'itemId',
      headerName: 'Item',
      width: 150,
      renderCell: (params) => (
        <Suspense
          fallback={<span style={{ opacity: 0.2 }}>{params.row.itemId}</span>}
        >
          <ItemName {...params} />
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
      <Alert variant="outlined">
        Got {matrix.data?.length} rows from Matrix by Stage
      </Alert>
      {matrix.data && (
        <DataGrid
          sx={{
            height: '80vh',
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'percentage', sort: 'desc' }],
            },
          }}
          rows={transformMatrixData(matrix.data)}
          columns={columns}
        />
      )}
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

function StageDetailPage() {
  const { stageId } = useParams()

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/stages">Stages</Link>
      <h1>Stage Detail Page</h1>
      <Suspense fallback={<div>Loading Data...</div>}>
        <StageMatrixData stageId={stageId} />
      </Suspense>
    </>
  )
}

export default StageDetailPage
