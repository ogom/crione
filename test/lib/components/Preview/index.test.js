import React from 'react'
import { shallow } from 'enzyme'
import Preview from '../../../../lib/components/Preview'

describe('components', () => {
  describe('Preview', () => {
    let connection = jest.fn()
    const wrapper = shallow(<Preview connection={connection} />)
    it('should return author and comment', () => {
      expect(wrapper.find('.header').text()).toBe('No connection')
    })
  })
})
