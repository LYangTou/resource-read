import { beforeEach } from 'vitest';
import { clearStores, defineStore, useDemoStore } from './index';

describe('demo store', () => {
  beforeEach(() => {
    clearStores();
  });

  it('tracks item progress', () => {
    const store = useDemoStore();

    expect(store.totalCount).toBe(3);
    expect(store.doneCount).toBe(3);

    store.toggleItem(1);
    expect(store.doneCount).toBe(2);

    store.addItem('新增示例');
    expect(store.totalCount).toBe(4);
  });

  it('reuses the same store instance by id', () => {
    const useCounterStore = defineStore('counter', () => ({
      count: 1,
    }));

    expect(useCounterStore()).toBe(useCounterStore());
  });
});
