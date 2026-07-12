import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  onReset?: () => void
}
interface State {
  hasError: boolean
}

// Keeps a single crashing screen/game from blanking the whole app.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log for debugging; the UI stays friendly.
    console.error('Skjermfeil fanget av ErrorBoundary:', error, info)
  }

  reset = () => {
    this.setState({ hasError: false })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ fontSize: 40 }}>🙈</div>
          <p style={{ fontWeight: 800 }}>Ups! Noe gikk galt her.</p>
          <p className="subtle" style={{ marginTop: 0 }}>
            Prøv igjen – resten av appen fungerer helt fint.
          </p>
          <button className="primary" onClick={this.reset}>
            🔁 Prøv på nytt
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
