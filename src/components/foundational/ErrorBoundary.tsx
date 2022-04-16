import { Component } from 'react'
import { WithChildren } from 'types'

export class ErrorBoundary extends Component<WithChildren<{}>> {
  state: { error: any }

  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: 'inline-block',
            padding: '2rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
          }}
        >
          <h3>Something went wrong.</h3>
          <code>{this.state.error.toString()}</code>
        </div>
      )
    }

    return this.props.children
  }
}
