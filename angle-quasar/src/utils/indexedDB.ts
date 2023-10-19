interface $Window extends Window {
  mozIndexedDB?: IDBFactory;
  webkitIndexedDB?: IDBFactory;
  msIndexedDB?: IDBFactory;
}
type StoreOptions = {
  autoIncrement: boolean;
  keyPath?: string;
};

type indexOptions = {
  indexName: string;
  indexKey: string;
  options?: IDBIndexParameters;
};
type DBResponse = {
  code: number;
  success: boolean;
  msg: string;
};

type DataConfig<T = any> = {
  name: string;
  data: T;
};
interface OpenDBResponse extends DBResponse {
  data: IDBDatabase | null;
}
interface GetDBResponse<T = any> extends DBResponse {
  data: DataConfig<T> | null;
}
const $Window: $Window = window;

class IndexedDB {
  indexedDB: IDBFactory | null;
  constructor() {
    this.indexedDB = null;
    this.initIndexedDB();
  }

  initIndexedDB() {
    // In the following line, you should include the prefixes of implementations you want to test.
    // 兼容浏览器
    this.indexedDB =
      $Window.indexedDB ||
      $Window.mozIndexedDB ||
      $Window.webkitIndexedDB ||
      $Window.msIndexedDB;
  }

  createDB(dbName: string, version: number) {
    version = version || 2;
    if (!this.indexedDB) {
      return;
    }
    // Let us open our database
    return this.indexedDB.open(dbName, version);
  }
  /**
   * @description 打开/创建数据库
   * @param {object} dbName 数据库的名字
   * @param {string} storeName 仓库名称
   * @param {string} version 数据库的版本
   * @param {string} keyPath 主键键值，不传就自动创建主键
   * @param {Array} index 索引数组
   * @return {object} 该函数会返回一个数据库实例
   */
  openDB(
    dbName: string,
    version: number,
    storeName: string,
    keyPath?: string,
    index?: indexOptions[] | undefined
  ): Promise<OpenDBResponse> {
    return new Promise((resolve, reject) => {
      if (!this.indexedDB) {
        resolve({
          code: -1,
          success: false,
          data: null,
          msg: '浏览器不兼容indexedDB!',
        });
        return;
      }
      let db: IDBDatabase;
      const request = this.indexedDB.open(dbName, version);
      // 操作成功
      request.onsuccess = function (event) {
        // 数据库对象
        db = (event.target as IDBOpenDBRequest)?.result;
        resolve({ code: 0, success: true, data: db, msg: '数据库打开成功!' });
      };
      // 操作失败
      request.onerror = function () {
        resolve({
          code: -1,
          success: false,
          data: null,
          msg: '数据库打开失败!',
        });
      };
      // 创建表和索引
      request.onupgradeneeded = function (event) {
        // 数据库创建或升级的时候会触发
        // 数据库对象
        db = (event.target as IDBOpenDBRequest)?.result;
        if (!db) {
          resolve({
            code: -1,
            success: false,
            data: null,
            msg: '获取数据库对象失败!',
          });
          return;
        }
        const storeOptions: StoreOptions = {
          autoIncrement: true,
        };
        if (keyPath && keyPath !== '') {
          storeOptions.autoIncrement = false;
          storeOptions.keyPath = keyPath;
        }
        // 创建表
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, storeOptions);
          // 创建索引
          // indexName索引列名称
          // indexKey索引键值
          if (index && index.length > 0) {
            index.forEach((item) => {
              if (
                !item.indexName ||
                !item.indexKey ||
                item.options?.unique === undefined
              ) {
                reject(
                  "索引格式错误，请参照格式{indexName:'indexName',indexKey:'indexKey',{unique: false}}"
                );
              }
              store.createIndex(item.indexName, item.indexKey, item.options);
            });
          }
        }
      };
    });
  }
  /**
   * @description 新增数据
   * @param {object} db 数据库实例
   * @param {string} storeName 仓库名称
   * @param {object} dataConfig 添加的数据集合
   **/
  addData(
    db: IDBDatabase,
    storeName: string,
    dataConfig: DataConfig
  ): Promise<OpenDBResponse> {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('数据库不存在或没有初始化');
      }
      if (!dataConfig || !dataConfig.data) {
        reject("data是必传项,参照格式{[keyPath]:'key',data:'data'}");
      }
      const req = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName) // 仓库对象
        .add(dataConfig);
      // 操作成功
      req.onsuccess = function () {
        resolve({ code: 0, success: true, data: null, msg: '数据写入成功!' });
      };
      // 操作失败
      req.onerror = function () {
        const data = {
          code: -1,
          success: false,
          data: null,
          msg: '数据写入失败!',
        };
        resolve(data);
      };
    });
  }
  /**
   * @description 更新数据
   * @param {object} db 数据库实例
   * @param {string} storeName 仓库名称
   * @param {object} dataConfig 更新的数据集合
   */
  updateData(
    db: IDBDatabase,
    storeName: string,
    dataConfig: DataConfig
  ): Promise<OpenDBResponse> {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('数据库不存在或没有初始化');
      }
      if (!dataConfig || !dataConfig.data) {
        reject("data是必传项,参照格式{[keyPath]:'key',data:'data'}");
      }
      const req = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .put(dataConfig);
      // 操作成功
      req.onsuccess = function () {
        resolve({ code: 0, success: true, data: null, msg: '数据更新成功!' });
      };
      // 操作失败
      req.onerror = function () {
        const data = {
          code: -1,
          success: false,
          data: null,
          msg: '数据更新失败!',
        };
        resolve(data);
      };
    });
  }
  /**
   * @description 查询数据
   * @param {object} db 数据库实例
   * @param {string} storeName 仓库名称
   * @param {string} key 数据主键
   **/
  getData<T>(
    db: IDBDatabase,
    storeName: string,
    key: string
  ): Promise<GetDBResponse<T>> {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('数据库不存在或没有初始化');
      }
      const req = db
        .transaction([storeName], 'readonly')
        .objectStore(storeName) // 仓库对象
        .get(key);

      // 操作成功
      req.onsuccess = function (e) {
        resolve({
          code: 0,
          success: true,
          data: (e.target as IDBRequest<DataConfig>).result,
          msg: '数据获取成功!',
        });
      };
      // 操作失败
      req.onerror = function () {
        resolve({
          code: -1,
          success: false,
          data: null,
          msg: '数据获取失败!',
        });
      };
    });
  }
  /**
   * 删除数据
   * @param {object} db 数据库实例
   * @param {string} storeName 仓库名称
   * @param {string} key 数据主键
   **/
  deleteData(
    db: IDBDatabase,
    storeName: string,
    key: string
  ): Promise<OpenDBResponse> {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('数据库不存在或没有初始化');
      }
      const req = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName) // 仓库对象
        .delete(key);
      // 操作成功
      req.onsuccess = function (e) {
        resolve({
          code: 0,
          success: true,
          data: (e.target as IDBOpenDBRequest)?.result,
          msg: '数据删除成功!',
        });
      };
      // 操作失败
      req.onerror = function () {
        resolve({
          code: -1,
          success: false,
          data: null,
          msg: '数据删除失败!',
        });
      };
    });
  }
  deleteDB(dbName: string) {
    if (!this.indexedDB) return;
    const request = this.indexedDB?.deleteDatabase(dbName);
    request.onsuccess = function () {
      console.log(`数据库 ${dbName} 删除成功`);
    };
    request.onerror = function (event) {
      console.error(
        `数据库 ${dbName} 删除失败：`,
        (event.target as IDBOpenDBRequest)?.error
      );
    };
  }
}
export default new IndexedDB();
