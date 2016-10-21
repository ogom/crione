import React from 'react'
import { shallow } from 'enzyme'
import Preview from '../../../../lib/components/Preview'

describe('components', () => {
  describe('Preview', () => {
    let version = jest.fn()
    const wrapper = shallow(<Preview version={version} />)
    it('should return author and comment', () => {
      expect(wrapper.find('.header').text()).toBe('No connection')
    })
  })
})
