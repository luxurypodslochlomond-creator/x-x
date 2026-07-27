import React from 'react';

// Swallows errors from non-essential background services so a failure
// in push/badge/sync can never take down the whole CB51 page.
class SilentBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('SilentBoundary caught (safe to ignore):', error);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default SilentBoundary;