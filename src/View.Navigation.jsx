import React from 'react'

import NavigationGuide from './View.Navigation.Guide'
import NavigationContent from './View.Navigation.Content'

import { ImitationNavigation, withBindComponentPure } from './Imitation'

function App() {
  React.useEffect(() => ImitationNavigation.state.function.onLoad(), [])

  React.useEffect(() => () => ImitationNavigation.state.function.onUnload(), [])

  if (ImitationNavigation.state.store.load === false) return null

  return <>
    <NavigationGuide />
    <NavigationContent />
  </>
}

const dependence = [
  { instance: ImitationNavigation, dependence: state => [ImitationNavigation.state.update.now] }
]

export default withBindComponentPure(App, dependence)