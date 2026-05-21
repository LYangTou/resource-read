import { useToggle } from './index';

describe('composables', () => {
  it('toggles owned boolean state', () => {
    const toggleResult = useToggle(false);

    expect(Array.isArray(toggleResult)).toBe(true);

    if (!Array.isArray(toggleResult)) {
      throw new Error('expected tuple return when initial value is not a ref');
    }

    const [value, toggle] = toggleResult;

    expect(value.value).toBe(false);

    toggle();
    expect(value.value).toBe(true);

    toggle(false);
    expect(value.value).toBe(false);
  });
});
