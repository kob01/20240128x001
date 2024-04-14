import React from 'react'

import NavigationGuide from './View.Navigation.Guide'
import NavigationContent from './View.Navigation.Content'

import { ImitationNavigation, withBindComponentPure } from './Imitation'

function App() {
  return <>
    <NavigationGuide />
    <NavigationContent />
  </>
}

const dependence = [
  { instance: ImitationNavigation, dependence: state => [ImitationNavigation.state.update.now] }
]

export default withBindComponentPure(App, dependence)