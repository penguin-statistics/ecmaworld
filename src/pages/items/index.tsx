import { Link } from 'react-router-dom'

import { useI18nString } from '../../utils/hooks/i18n/use-i18n-string'
import { useItems } from '../../utils/hooks/use-items'

function ItemsPage() {
  const items = useItems()
  const t = useI18nString()
  return (
    <>
      <Link to="/">Home</Link>
      <h1>Items Page</h1>
      <code>`/items`</code>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '8px',
        }}
      >
        {items.data?.map((el) => (
          <Link key={el.itemId} to={`/items/${el.itemId}`}>
            <code>{el.itemId}</code>: {t(el.name)}
          </Link>
        ))}
      </div>
    </>
  )
}

export default ItemsPage
