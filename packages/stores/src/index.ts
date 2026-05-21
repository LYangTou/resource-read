import { reactive } from 'vue';

export interface DemoItem {
  id: number;
  title: string;
  done: boolean;
}

export type StoreFactory<TStore extends object> = () => TStore;
export type StoreDefinition<TStore extends object> = () => TStore;

const storeRegistry = new Map<string, object>();

export function defineStore<TStore extends object>(id: string, factory: StoreFactory<TStore>): StoreDefinition<TStore> {
  return () => {
    const existingStore = storeRegistry.get(id);
    if (existingStore) {
      return existingStore as TStore;
    }

    const store = factory();
    storeRegistry.set(id, store);

    return store;
  };
}

export function clearStores() {
  storeRegistry.clear();
}

export const useDemoStore = defineStore('demo', () => {
  const items: DemoItem[] = [
    { id: 1, title: '创建 monorepo', done: true },
    { id: 2, title: '接入 Vue Router', done: true },
    { id: 3, title: '补充单元测试', done: true },
  ];

  const store = reactive({
    items,

    get doneCount() {
      return this.items.filter((item: DemoItem) => item.done).length;
    },

    get totalCount() {
      return this.items.length;
    },

    toggleItem(id: number) {
      const item = this.items.find((entry) => entry.id === id);
      if (item) {
        item.done = !item.done;
      }
    },

    addItem(title: string) {
      this.items.push({
        id: Date.now(),
        title,
        done: false,
      });
    },
  });

  return store;
});
