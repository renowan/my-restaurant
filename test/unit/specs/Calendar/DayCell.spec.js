import { mount } from '@vue/test-utils'
import DayCell from '@/pages/Calendar/DayCell'

describe('DayCell.vueのテスト', () => {
  it('21日、value = 1 > span.labelは存在する、内容は1', () => {
    const wrapper = mount(DayCell, {
      propsData: {
        day: {
          sclass: 'gray day-0',
          text: '21',
          rsvVaule: 1
        }
      }
    })
    const textDom = wrapper.find('.date-txt')
    const labelDom = wrapper.find('.label')
    // .date-txtの中身は21
    expect(textDom.text()).toEqual('21')
    // span.labelは存在する
    expect(wrapper.contains('span')).toBe(true)
    // labelの中身は1
    expect(labelDom.text()).toBe('1')
  })
  it('1日、value = 0 > spanは存在しない', () => {
    const wrapper = mount(DayCell, {
      propsData: {
        day: {
          sclass: 'day-1',
          text: '1',
          rsvVaule: 0
        }
      }
    })
    const textDom = wrapper.find('.date-txt')
    // .date-txtの中身は1
    expect(textDom.text()).toEqual('1')
    // span.labelは存在しない
    expect(wrapper.contains('span')).toBe(false)
  })
})
