import { Link } from 'react-router-dom'

import { useI18nString } from 'utils/hooks/i18n/use-i18n-string'
import { useItems } from 'utils/hooks/use-items'

function ItemsPage() {
  const items = useItems()
  const t = useI18nString()
  return (
    <ul
      style={{
        display: 'grid',
        // create a grid with 3 columns equal width
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px 8px',
      }}
    >
      {items.data?.map((el) => (
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Link
            style={{
              width: '100%',
            }}
            key={el.arkItemId}
            to={`/result/items/${el.arkItemId}`}
          >
            <code>{el.arkItemId}</code>
            <br />
            <span>{t(el.name)}</span>
          </Link>
        </div>
      ))}
    </ul>
  )
}

export default ItemsPage
