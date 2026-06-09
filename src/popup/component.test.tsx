import React from 'react'
import { $$, $, expect } from '@wdio/globals'
import { render } from '@testing-library/react'

import Component from './component.js'

describe('Popup Component', () => {
  it('renders the extension header', async () => {
    render(<Component />)
    await expect($('h1.popup-name')).toHaveText('ShotGrid Rodeo FX')
  })

  it('renders a toggle for each feature', async () => {
    render(<Component />)
    await expect($$('.feature-item')).toBeElementsArrayOfSize(3)
  })

  it('renders all toggle switches', async () => {
    render(<Component />)
    await expect($$('[role="switch"]')).toBeElementsArrayOfSize(3)
  })
})
