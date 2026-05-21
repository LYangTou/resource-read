import { mount } from '@vue/test-utils';
import App from './App.vue';
import { router } from './router';

describe('App', () => {
  it('renders navigation links', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('Resource Read');
    expect(wrapper.text()).toContain('Composables');
    expect(wrapper.text()).toContain('Request');
  });
});
