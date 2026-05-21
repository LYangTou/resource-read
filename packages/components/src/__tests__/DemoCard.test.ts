import { mount } from '@vue/test-utils';
import { DemoCard } from '../index';

describe('DemoCard', () => {
  it('renders title and slot content', () => {
    const wrapper = mount(DemoCard, {
      props: {
        title: '组件示例',
        tag: 'components',
      },
      slots: {
        default: '<button>Action</button>',
      },
    });

    expect(wrapper.text()).toContain('组件示例');
    expect(wrapper.text()).toContain('components');
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
