if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$10 = {
    __name: "Search",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "search-block-index" }, [
          vue.createElementVNode("navigator", {
            "hover-class": "none",
            url: "/indexpkg/search/search",
            class: "search-area-index"
          }, [
            vue.createCommentVNode(' <uni-icons class="sea-icon" type="search" size="20"></uni-icons> '),
            vue.createVNode(_component_van_icon, {
              name: "search",
              color: "#323232",
              class: "sea-icon",
              size: "32rpx"
            }),
            vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: "请输入"
            }),
            vue.createElementVNode("button", { class: "btn-search" }, "搜索")
          ])
        ]);
      };
    }
  };
  const Search = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-428b4be6"], ["__file", "D:/github/app-unis/pages/index/components/Search.vue"]]);
  const _sfc_main$$ = {
    __name: "CustomHeader",
    props: {
      scroll: {
        type: Boolean
      }
    },
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "header",
          {
            class: "index-header",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            !__props.scroll ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: "index-header-img",
              src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
            })) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "search-box"
            }, [
              vue.createVNode(Search)
            ]))
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const CustomHeader = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-0def32ac"], ["__file", "D:/github/app-unis/pages/index/components/CustomHeader.vue"]]);
  var isVue2 = false;
  function set$1(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia2) => activePinia = pinia2;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia2.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      pinia2.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia2) {
    try {
      saveAs(new Blob([JSON.stringify(pinia2.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia2) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia2.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia2) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia2);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia2);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia2._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia2];
          stores = stores.concat(Array.from(pinia2._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia2._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia2 = vue.markRaw({
      install(app) {
        setActivePinia(pinia2);
        {
          pinia2._a = app;
          app.provide(piniaSymbol, pinia2);
          app.config.globalProperties.$pinia = pinia2;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia2);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia2.use(devtoolsPlugin);
    }
    return pinia2;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia2, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia2.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia2.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia2.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia2);
          const store2 = pinia2._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia2, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia2._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia2.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia2.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia2.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia2._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia2);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia2,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia2.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia2._s.set($id, store);
    const setupStore = pinia2._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set$1(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia2.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia2.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set$1(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia2.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set$1(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia2);
              return getter.call(store, store);
            })
          ) : getter;
          set$1(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia2._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia2, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia2 = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia2 || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia2)
        setActivePinia(pinia2);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia2 = activePinia;
      if (!pinia2._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia2);
        } else {
          createOptionsStore(id, options, pinia2);
        }
        {
          useStore._pinia = pinia2;
        }
      }
      const store = pinia2._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia2, true) : createOptionsStore(hotId, assign({}, options), pinia2, true);
        hot._hotUpdate(newStore);
        delete pinia2.state.value[hotId];
        pinia2._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const useUserStore = defineStore("userinfo", () => {
    const userInfo = vue.ref("");
    const setUserInfo = (data) => {
      userInfo.value = data;
    };
    const clearUserInfo = () => {
      userInfo.value = null;
    };
    return {
      userInfo,
      setUserInfo,
      clearUserInfo
    };
  }, {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        }
      }
    }
  });
  let baseUrl = "http://localhost:3000/api/uni";
  const httpInterceptor = {
    invoke(args) {
      var _a;
      args.url = baseUrl + args.url;
      args.timeout = 1e4;
      args.header = {
        ...args.header,
        "source-client": "miniapp"
      };
      const userStore = useUserStore();
      const token = (_a = userStore.userInfo) == null ? void 0 : _a.token;
      if (token) {
        args.header.Authorization = token;
      }
    }
  };
  uni.addInterceptor("request", httpInterceptor);
  uni.addInterceptor("uploadFile", httpInterceptor);
  const http = (options) => {
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => {
          resolve(res.data);
        }
      });
    });
  };
  const getUserInfoAPI = (id) => {
    return http({
      url: "/user",
      data: {
        user_id: id
      }
    });
  };
  const verifyPasswordAPI = (password) => {
    return http({
      url: "/verify",
      method: "POST",
      data: {
        pwd: password
      }
    });
  };
  const getCartListAPI = (id) => {
    return http({
      url: "/cart",
      data: {
        user_id: id
      }
    });
  };
  const addCartAPI = ({ count, checked, sku_id, goods_id }) => {
    return http({
      url: "/cart",
      method: "POST",
      data: {
        count,
        sku_id,
        checked,
        goods_id
      }
    });
  };
  const delCartAPI = (id) => {
    return http({
      url: "/cart",
      method: "DELETE",
      data: {
        id
      }
    });
  };
  const updateCartAPI = (list) => {
    return http({
      url: "/cart",
      method: "PUT",
      data: {
        list
      }
    });
  };
  const useCartStore = defineStore("cart", () => {
    const userStore = useUserStore();
    const userCardStore = useUserCardStore();
    const cartList = vue.ref([]);
    const itemValues = vue.computed(() => cartList.value.flat().reduce((acc, curr) => [...acc, ...curr.value], []));
    const selectedItems = vue.computed(() => itemValues.value.filter((i) => i.selected).reduce((a, b) => {
      if (!a[b.goods_id]) {
        a[b.goods_id] = [];
      }
      a[b.goods_id].push(b);
      return a;
    }, []).filter((v) => true));
    const allChecked = vue.computed(() => cartList.value.every((i) => i[0].value.every((subI) => subI.selected)));
    const onAllChange = (val) => {
      cartList.value.forEach((item) => item[0].value.forEach((subItem) => subItem.selected = val));
      updateCart(itemValues.value);
    };
    const allRetailPrice = vue.computed(() => itemValues.value.filter((i) => i.selected).reduce((acc, curr) => acc + curr.sku_item.retail_price * curr.count, 0));
    const allPrice = vue.computed(() => itemValues.value.filter((i) => i.selected).reduce((acc, curr) => acc + curr.sku_item.price * curr.count, 0));
    const activeFee = vue.computed(() => allPrice.value - allRetailPrice.value);
    const reNum = vue.computed(() => {
      let item = userCardStore.optimalTicket(allRetailPrice.value);
      let num = void 0;
      if (item) {
        num = (item.ticket_price / selectedItems.value.length).toFixed(2);
      }
      return num || 0;
    });
    const addCart = async (obj) => {
      let item = cartList.value.find((item2) => item2.item_id == obj.item_id);
      if (item) {
        obj.count += item.count;
        await updateCartAPI([{ id: item.item_id, count: obj.count, sku_id: item.sku_id, selected: item.selected }]);
      } else {
        await addCartAPI(obj);
      }
      getCartList(userStore.userInfo.id);
    };
    const getCartList = async () => {
      const res = await getCartListAPI(userStore.userInfo.id);
      cartList.value = res;
    };
    const delCartItem = async (id) => {
      uni.showLoading({ mask: true });
      const res = await delCartAPI(id);
      if (res)
        uni.hideLoading();
      getCartList(userStore.userInfo.id);
    };
    const updateCart = async (cartItem) => {
      uni.showLoading({ mask: true });
      const res = await updateCartAPI(cartItem);
      if (res)
        uni.hideLoading();
      getCartList();
    };
    return {
      cartList,
      allChecked,
      allPrice,
      addCart,
      getCartList,
      updateCart,
      onAllChange,
      delCartItem,
      selectedItems,
      itemValues,
      allRetailPrice,
      reNum,
      activeFee
    };
  });
  const useUserCardStore = defineStore("user-card", () => {
    const cartStore = useCartStore();
    const userTicketList = vue.ref([]);
    const userBalance = vue.ref("");
    const userCard = vue.ref([]);
    const getUserCardInfo = async (id) => {
      const res = await getUserInfoAPI(id);
      userBalance.value = res.balance;
      userTicketList.value = res.tickets;
      userCard.value = res.card;
      if (userTicketList.value.length)
        userTicketList.value.forEach((item) => item.selected = false);
    };
    const defaultSelectedTicket = (price) => {
      if (!userTicketList.value.length)
        return;
      let item = userTicketList.value.filter((i) => i.ticket_condition <= price).reduce((a, b) => {
        if (b.ticket_price > a.ticket_price) {
          a.ticket_id = b.ticket_id;
          a.ticket_price = b.ticket_price;
        }
        return a;
      }, { ticket_id: 0, ticket_price: 0 });
      const sItem = userTicketList.value.find((i) => i.ticket_id == item.ticket_id);
      return sItem;
    };
    const optimalTicket = (price, type = "else") => {
      const item = defaultSelectedTicket(price);
      if (type == "price") {
        if (!item)
          return 0;
        return item.ticket_price;
      } else if (type == "selected") {
        item ? item.selected = true : "";
      } else {
        return item;
      }
    };
    const tapSelected = (val) => {
      userTicketList.value.forEach((item) => {
        item.selected = false;
        if (item.ticket_id === val.ticket_id)
          item.selected = true;
      });
    };
    const unUseTicket = () => {
      userTicketList.value.forEach((item) => item.selected = false);
    };
    const selectedTicket = vue.computed(() => userTicketList.value.find((i) => i.selected));
    const effectiveTickets = vue.computed(() => {
      return userTicketList.value.filter((item) => item.ticket_condition < cartStore.allRetailPrice);
    });
    const uselessTickets = vue.computed(() => {
      return userTicketList.value.filter((item) => item.ticket_condition > cartStore.allRetailPrice);
    });
    return {
      userBalance,
      userTicketList,
      userCard,
      getUserCardInfo,
      selectedTicket,
      optimalTicket,
      effectiveTickets,
      uselessTickets,
      tapSelected,
      unUseTicket
    };
  });
  const _sfc_main$_ = {
    __name: "GoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    setup(__props) {
      const props = __props;
      const userCardStore = useUserCardStore();
      useUserStore();
      const retailPrice = vue.computed(() => {
        return props.goodsItem.retail_price - userCardStore.optimalTicket(props.goodsItem.retail_price, "price");
      });
      const toGoodsDetail = () => {
        uni.navigateTo({
          url: `/indexpkg/goods/goods?id=${props.goodsItem.goods_id}`
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "goods-block flex-c",
          onClick: toGoodsDetail
        }, [
          vue.createElementVNode("view", { class: "top-img" }, [
            vue.createElementVNode("image", {
              class: "top-image",
              src: __props.goodsItem.goods_img || "https://yanxuan-item.nosdn.127.net/b61a592db6544fb87710bfa6b2a226f7.png?type=webp&imageView&quality=65&thumbnail=330x330"
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "btm-text" }, [
            vue.createElementVNode("view", { class: "produce" }, [
              vue.createCommentVNode(' <slot name="img"></slot> '),
              vue.createElementVNode("image", {
                class: "produce-image",
                src: "https://yanxuan.nosdn.127.net/static-union/16698631101bcf18.png"
              }),
              vue.createTextVNode(
                " " + vue.toDisplayString(__props.goodsItem.goods_name),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "goods-rank" }, [
              vue.createElementVNode("text", { class: "rank-text" }, "休闲零食肉类零食热销榜第2名")
            ]),
            vue.createElementVNode("view", { class: "goods-price" }, [
              vue.withDirectives(vue.createElementVNode(
                "text",
                { class: "retail-price" },
                "到手￥",
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, vue.unref(retailPrice) != __props.goodsItem.retail_price]
              ]),
              vue.createElementVNode("text", { class: "hot-price" }, [
                vue.createElementVNode(
                  "text",
                  { class: "int" },
                  vue.toDisplayString(vue.unref(retailPrice) || __props.goodsItem.retail_price),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "text",
                { class: "real-price" },
                "￥" + vue.toDisplayString(__props.goodsItem.goods_price),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
        ]);
      };
    }
  };
  const GoodsItem = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-4b020d49"], ["__file", "D:/github/app-unis/components/GoodsItem/GoodsItem.vue"]]);
  const _sfc_main$Z = {
    __name: "IndexNav",
    setup(__props) {
      const moveRpx = vue.ref(0);
      const onNavScroll = (e) => {
        const width = Math.floor(e.detail.scrollWidth / 2);
        Math.ceil(moveRpx.value = e.detail.scrollLeft * moveLineWidth / width);
      };
      let moveLineWidth = 0;
      vue.onMounted(() => {
        const { pixelRatio, screenWidth } = uni.getSystemInfoSync();
        moveLineWidth = Math.floor(screenWidth * 40 / 375 / 2);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "index-nav" }, [
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-x": "true",
              class: "scroll-cate",
              onScroll: onNavScroll,
              "show-scrollbar": "false"
            },
            [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(10, (i) => {
                  return vue.createElementVNode("view", {
                    class: "cate-item flex-c",
                    key: i
                  }, [
                    vue.createElementVNode("view", { class: "top-item flex-c-a" }, [
                      vue.createElementVNode("image", {
                        class: "index-image",
                        src: "https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png"
                      }),
                      vue.createElementVNode("view", { class: "item-text" }, " 居家日用 ")
                    ]),
                    vue.createElementVNode("view", { class: "btm-item flex-c-a" }, [
                      vue.createElementVNode("image", {
                        class: "index-image",
                        src: "https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png"
                      }),
                      vue.createElementVNode("view", { class: "item-text" }, " 居家日用 ")
                    ])
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ],
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode("view", { class: "scroll-line flex-a" }, [
            vue.createElementVNode("view", { class: "line" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "move-line",
                  style: vue.normalizeStyle({ left: moveRpx.value + "px" })
                },
                null,
                4
                /* STYLE */
              )
            ])
          ])
        ]);
      };
    }
  };
  const IndexNav = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-bf52ae38"], ["__file", "D:/github/app-unis/pages/index/components/IndexNav.vue"]]);
  const getHomeListAPI = ({ page, pageSize }) => {
    return http({
      url: "/home",
      data: {
        page,
        pageSize
      }
    });
  };
  const _sfc_main$Y = {
    __name: "index",
    setup(__props) {
      const swiperImgList = [
        {
          id: 1,
          img_url: "https://yanxuan-item.nosdn.127.net/e54a19cb355aa22cb8d6b914dd8aa6a9.jpg?type=webp&imageView&quality=65&thumbnail=330x330"
        },
        {
          id: 2,
          img_url: "https://yanxuan-item.nosdn.127.net/10bccd52a8a49022cac8506c210be677.jpg?type=webp&imageView&quality=65&thumbnail=330x330"
        },
        {
          id: 3,
          img_url: "https://yanxuan-item.nosdn.127.net/8dc0bd2d7e58ace9465aa0cc28998721.png?type=webp&imageView&quality=65&thumbnail=330x330"
        },
        {
          id: 4,
          img_url: "https://yanxuan-item.nosdn.127.net/c56dd747c5fd8481ceae603f54286d41.jpg?type=webp&imageView&quality=65&thumbnail=330x330"
        }
      ];
      const current = vue.ref(1);
      const swiperChange = (e) => {
        current.value = e.detail.current + 1;
      };
      const onClickImg = (item, index) => {
        uni.previewImage({
          urls: swiperImgList.map((item2) => item2.img_url),
          count: item.img_url,
          current: index
        });
      };
      vue.ref("");
      const scroll = vue.ref(false);
      const handleScroll = (e) => {
        e.detail.scrollTop > 30 ? scroll.value = true : scroll.value = false;
      };
      const leftList = vue.ref([]);
      const rightList = vue.ref([]);
      const indexData = vue.ref({
        page: 1,
        pageSize: 12
      });
      const getHomeList = async () => {
        const res = await getHomeListAPI(indexData.value);
        formatAppLog("log", "at pages/index/index.vue:145", res);
        leftList.value = res.leftData;
        rightList.value = res.rightData;
      };
      let flag = vue.ref(true);
      const onLoadMore = async () => {
        if (flag.value) {
          flag.value = false;
          indexData.value.page++;
          const res = await getHomeListAPI(indexData.value);
          if (res.length == 0)
            return;
          leftList.value = [...leftList.value, ...res.leftData];
          rightList.value = [...rightList.value, ...res.rightData];
          flag.value = true;
        }
      };
      vue.onMounted(() => {
        getHomeList();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(CustomHeader, { scroll: scroll.value }, null, 8, ["scroll"]),
            vue.createElementVNode(
              "scroll-view",
              {
                "scroll-y": "true",
                class: "scroll-box",
                onScroll: handleScroll,
                onScrolltolower: onLoadMore
              },
              [
                vue.createVNode(Search),
                vue.createCommentVNode(" 导航栏 "),
                vue.createVNode(IndexNav),
                vue.createCommentVNode(" 内容栏 "),
                vue.createElementVNode("view", { class: "content" }, [
                  vue.createElementVNode("scroll-view", {
                    "scroll-x": "true",
                    class: "scroll-list"
                  }, [
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢"),
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢"),
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢"),
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢"),
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢"),
                    vue.createElementVNode("view", { class: "items" }, "猜你喜欢")
                  ]),
                  vue.createElementVNode("view", { class: "content-block flex-c" }, [
                    vue.createElementVNode("view", { class: "block-top flex" }, [
                      vue.createElementVNode("view", { class: "top-left" }, [
                        vue.createElementVNode(
                          "swiper",
                          {
                            class: "swiper-a",
                            onChange: swiperChange,
                            duration: "3",
                            autoplay: "true"
                          },
                          [
                            (vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(swiperImgList, (item, index) => {
                                return vue.createElementVNode("swiper-item", {
                                  class: "swiper-item-a",
                                  key: item.id
                                }, [
                                  vue.createElementVNode("image", {
                                    src: item.img_url,
                                    onClick: ($event) => onClickImg(item, index)
                                  }, null, 8, ["src", "onClick"])
                                ]);
                              }),
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          ],
                          32
                          /* HYDRATE_EVENTS */
                        ),
                        vue.createElementVNode("view", { class: "dot" }, [
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(current.value),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("text", null, "/"),
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(swiperImgList.length),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "top-right flex-c" }, [
                        vue.createElementVNode("view", { class: "everyday" }, [
                          vue.createElementVNode("view", { class: "title" }, [
                            vue.createElementVNode("text", { class: "title-text" }, "每日抄底")
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "new-goods" }, [
                          vue.createElementVNode("view", { class: "title flex-a" }, [
                            vue.createElementVNode("text", { class: "title-text" }, "新品首发"),
                            vue.createElementVNode("view", { class: "new-every" }, " 每日上新 ")
                          ])
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "body-content flex" }, [
                      vue.createCommentVNode(" 左侧list "),
                      vue.createElementVNode("view", { class: "body-list left-list" }, [
                        vue.createElementVNode("view", { class: "rank flex" }, [
                          (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(4, (i) => {
                              return vue.createElementVNode("view", {
                                class: "rank-item flex-c-a",
                                key: i
                              }, [
                                vue.createElementVNode("view", { class: "r-item-title flex-c-a" }, [
                                  vue.createElementVNode("text", { class: "title-weight" }, "严选榜单"),
                                  vue.createElementVNode("text", { class: "title-s" }, "大家都在买")
                                ]),
                                vue.createElementVNode("image", {
                                  class: "r-item-img",
                                  src: "https://yanxuan-item.nosdn.127.net/879d6919fa093140c38336eec736e4b1.png?type=webp&imageView&quality=65&thumbnail=330x330",
                                  mode: "widthFix"
                                })
                              ]);
                            }),
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ]),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(leftList.value, (item) => {
                            return vue.openBlock(), vue.createBlock(GoodsItem, {
                              key: item.goods_id,
                              goodsItem: item
                            }, {
                              footer: vue.withCtx(() => [
                                vue.createElementVNode("view", { class: "everyday-time flex-a" }, [
                                  vue.createElementVNode("text", { class: "every-date" }, "每日抄底"),
                                  vue.createElementVNode("text", { class: "end-time" }, "距结束13小时")
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["goodsItem"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createCommentVNode(" 右侧list "),
                      vue.createElementVNode("view", { class: "body-list" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(rightList.value, (item) => {
                            return vue.openBlock(), vue.createBlock(GoodsItem, {
                              key: item.goods_id,
                              class: "goods-item",
                              goodsItem: item
                            }, {
                              footer: vue.withCtx(() => [
                                vue.createElementVNode("view", { class: "everyday-time flex-a" }, [
                                  vue.createElementVNode("text", { class: "every-date" }, "每日抄底"),
                                  vue.createElementVNode("text", { class: "end-time" }, "距结束13小时")
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["goodsItem"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ])
                ])
              ],
              32
              /* HYDRATE_EVENTS */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__file", "D:/github/app-unis/pages/index/index.vue"]]);
  const getCateListAPI = () => {
    return http({
      url: "/category"
    });
  };
  const _sfc_main$X = {
    __name: "cate",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const categoryList = vue.ref([]);
      const getCategoryList = async () => {
        const res = await getCateListAPI();
        categoryList.value = res;
      };
      const currentList = vue.ref({});
      const activeIndex = vue.ref(0);
      const onChangeList = (val, index) => {
        activeIndex.value = index;
        currentList.value = val;
      };
      const toSubcate = (item) => {
        const name = currentList.value.category_name;
        uni.navigateTo({
          url: `/catepkg/subCate/subCate?id=${item.parentId}&parent_id=${item.firParentId}&goods_id=${item.id}&title=${name}`
        });
      };
      vue.onMounted(() => {
        getCategoryList();
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        return vue.openBlock(), vue.createElementBlock("view", { class: "category-block flex-c" }, [
          vue.createElementVNode(
            "header",
            {
              class: "custom-header",
              style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
            },
            [
              vue.createElementVNode("view", { class: "search flex-a" }, [
                vue.createVNode(_component_uni_icons, {
                  class: "search-icon",
                  type: "search",
                  size: "20"
                }),
                vue.createElementVNode("input", {
                  type: "text",
                  placeholder: "毛巾"
                })
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "cate-body flex" }, [
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "aside-scroll flex"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(categoryList.value, (i, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "scroll-item flex",
                    key: i.category_id,
                    onClick: ($event) => onChangeList(i, index)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["item-text", { border: activeIndex.value == index }])
                      },
                      vue.toDisplayString(i.category_name),
                      3
                      /* TEXT, CLASS */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", { class: "body-right" }, [
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "right-item" },
                [
                  vue.createElementVNode("view", { class: "banner" }, [
                    vue.createElementVNode("image", {
                      class: "banner-image",
                      src: "https://yanxuan.nosdn.127.net/hxm/oly-picture/08ee4f03c9cc67cc7dbdad343043abcb.jpg?type=webp&imageView&quality=75&thumbnail=750x0"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "banner-list flex" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(6, (i) => {
                        return vue.createElementVNode("view", {
                          class: "item-img-text flex-c-a",
                          key: i
                        }, [
                          vue.createElementVNode("image", {
                            class: "item-image",
                            src: "https://yanxuan.nosdn.127.net/static-union/1686641811181b03.jpg?quality=75&type=webp&imageView"
                          }),
                          vue.createElementVNode("text", null, "无限回购")
                        ]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, activeIndex.value == 0]
              ]),
              vue.createElementVNode("view", { class: "right-item" }, [
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "right-item-scroll"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(currentList.value.children, (item) => {
                      return vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        {
                          key: item.id
                        },
                        [
                          vue.createElementVNode(
                            "view",
                            { class: "title-item" },
                            vue.toDisplayString(item.name),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "flex-bd flex" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item.children, (subItem) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "right-bd-item flex-c-a",
                                  key: subItem.id,
                                  onClick: ($event) => toSubcate(subItem)
                                }, [
                                  vue.createElementVNode("image", {
                                    class: "right-bd-image",
                                    src: subItem.imgUrl
                                  }, null, 8, ["src"]),
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(subItem.name),
                                    1
                                    /* TEXT */
                                  )
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesCateCate = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__file", "D:/github/app-unis/pages/cate/cate.vue"]]);
  function mitt(n) {
    return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
      var i = n.get(t);
      i ? i.push(e) : n.set(t, [e]);
    }, off: function(t, e) {
      var i = n.get(t);
      i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
    }, emit: function(t, e) {
      var i = n.get(t);
      i && i.slice().map(function(n2) {
        n2(e);
      }), (i = n.get("*")) && i.slice().map(function(n2) {
        n2(t, e);
      });
    } };
  }
  const mitter = mitt();
  function Set$1(originalSet) {
    const subSets = [];
    const numberOfCombinations = 2 ** originalSet.length;
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
      const subSet = [];
      for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
        if (combinationIndex & 1 << setElementIndex) {
          subSet.push(originalSet[setElementIndex]);
        }
      }
      subSets.push(subSet);
    }
    return subSets;
  }
  const _sfc_main$W = {
    __name: "GoodsPopop",
    emits: ["update:show"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const cartStore = useCartStore();
      const isCart = vue.ref(true);
      const num = vue.ref(1);
      let pathMap = {};
      const selectName = vue.ref("");
      vue.watchEffect(() => {
        if (props.goods) {
          pathMap = getEffectiveList(props.goods.sku);
          initDisabledStatus(props.goods.sku_list, pathMap);
          if (isCart.value)
            initSelectitem();
          selectName.value = getSelectedArr(props.goods.sku_list).join("");
        }
      });
      const initSelectitem = () => {
        let items = cartStore.cartList.find((item) => item.item_id == props.goods.item_id);
        if (items) {
          num.value = items.count;
          for (let key in props.goods.sku_list) {
            props.goods.sku_list[key].value.forEach((item) => {
              if (item.name == items.spec[key].value) {
                item.selected = true;
              }
            });
          }
          getSelectedSku();
        }
      };
      mitter.on("popup", (data) => {
        isCart.value = data.isCart;
      });
      const onSubmitSku = async (type) => {
        if (Object.values(selectSku).length === 0) {
          uni.showToast({
            icon: "error",
            title: "请选择规格"
          });
          return;
        }
        switch (type) {
          case "add":
            let obj = { count: num.value, checked: true, sku_id: selectSku.id, goods_id: selectSku.goods_id };
            cartStore.addCart(obj);
            break;
          case "confirm":
            let item = { count: num.value, selected: true, sku_id: selectSku.id, item_id: props.goods.item_id };
            cartStore.updateCart(item);
            break;
        }
        onClose();
      };
      const onClose = () => {
        mitter.emit("selectName", selectName.value);
        emits("update:show", false);
      };
      const changeValue = (e) => {
        num.value = e.detail;
      };
      const sign = "★";
      const getEffectiveList = (skus) => {
        skus == null ? void 0 : skus.forEach((item) => {
          if (item.stock > 0) {
            let spec = item.spec.map((i) => i.value);
            let powerSet = Set$1(spec);
            powerSet == null ? void 0 : powerSet.forEach((set2) => {
              const key = set2.join(sign);
              if (!pathMap[key]) {
                pathMap[key] = [];
              }
              pathMap[key].push(item.id);
            });
          }
        });
        return pathMap;
      };
      let selectSku = {};
      const onSelectSku = (item, list) => {
        if (item.disabled)
          return;
        if (item.selected) {
          item.selected = false;
        } else {
          list == null ? void 0 : list.forEach((i) => i.selected = false);
          item.selected = true;
        }
        updateDisabledStatus(props.goods.sku_list, pathMap);
        getSelectedSku();
      };
      const getSelectedSku = () => {
        var _a;
        const selectArr = getSelectedArr(props.goods.sku_list).filter((i) => i);
        if (selectArr.length === ((_a = props.goods.sku_list) == null ? void 0 : _a.length)) {
          const skuId = pathMap[selectArr.join(sign)][0];
          selectSku = props.goods.sku.find((item) => item.id === skuId);
        } else {
          selectSku = {};
        }
      };
      vue.computed(() => {
        return Object.values(selectSku).length ? selectSku : { pic: props.goods.goods_img, price: props.goods.goods_price };
      });
      const getSelectedArr = (skuList) => {
        let selectedArr = [];
        skuList == null ? void 0 : skuList.forEach((item, index) => {
          const selectedVal = item.value.find((i) => i.selected);
          if (selectedVal) {
            selectedArr[index] = selectedVal.name;
          } else {
            selectedArr[index] = void 0;
          }
        });
        return selectedArr;
      };
      const initDisabledStatus = (specs, pathMap2) => {
        if (specs && pathMap2.length > 0) {
          specs == null ? void 0 : specs.forEach((item) => {
            item.disabled = !pathMap2[item.name];
          });
        }
      };
      const updateDisabledStatus = (skuList, pathMap2) => {
        skuList == null ? void 0 : skuList.forEach((item, index) => {
          var _a;
          const selectArr = getSelectedArr(skuList);
          (_a = item.value) == null ? void 0 : _a.forEach((i) => {
            if (!i.selected) {
              selectArr[index] = i.name;
              const key = selectArr.filter((val) => val).join(sign);
              i.disabled = !pathMap2[key];
            }
          });
        });
      };
      return (_ctx, _cache) => {
        const _component_van_stepper = vue.resolveComponent("van-stepper");
        const _component_van_popup = vue.resolveComponent("van-popup");
        return vue.openBlock(), vue.createElementBlock("view", { class: "popup" }, [
          vue.createVNode(_component_van_popup, {
            show: props.show,
            position: "bottom",
            onClose,
            closeable: ""
          }, {
            default: vue.withCtx(() => {
              var _a, _b, _c, _d, _e;
              return [
                vue.createElementVNode("view", { class: "popup-content flex-c" }, [
                  vue.createElementVNode("view", { class: "popup-top-item-block" }, [
                    vue.createElementVNode("view", { class: "popup-top-item flex" }, [
                      vue.createElementVNode("view", { class: "top-item-img" }, [
                        vue.createElementVNode("image", {
                          class: "top-item-image",
                          src: ((_a = vue.unref(selectSku)) == null ? void 0 : _a.pic) || ((_b = props.goods) == null ? void 0 : _b.goods_img)
                        }, null, 8, ["src"])
                      ]),
                      vue.createElementVNode("view", { class: "top-item-pro flex-c" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "promotion" },
                          vue.toDisplayString((_c = props.goods) == null ? void 0 : _c.service),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "red-price" },
                          "价格:￥" + vue.toDisplayString(((_d = vue.unref(selectSku)) == null ? void 0 : _d.price) || props.goods.goods_price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          null,
                          "已选择:" + vue.toDisplayString(selectName.value ? selectName.value : "请选择规格"),
                          1
                          /* TEXT */
                        ),
                        vue.createCommentVNode(" <text v-else>请选择规格</text> "),
                        vue.createCommentVNode(" <text>预计09月25日发货</text> ")
                      ])
                    ])
                  ]),
                  vue.createElementVNode("scroll-view", {
                    "scroll-y": "true",
                    class: "scroll-popup"
                  }, [
                    vue.createElementVNode("view", { class: "popup-body flex-c" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList((_e = props.goods) == null ? void 0 : _e.sku_list, (item) => {
                          return vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            {
                              key: item.name
                            },
                            [
                              vue.createElementVNode(
                                "view",
                                { class: "top" },
                                vue.toDisplayString(item.name),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "body-item-block flex" }, [
                                (vue.openBlock(true), vue.createElementBlock(
                                  vue.Fragment,
                                  null,
                                  vue.renderList(item.value, (subItem, index) => {
                                    return vue.openBlock(), vue.createElementBlock("view", {
                                      class: vue.normalizeClass(["body-item", { border_active: subItem.selected, disabled: subItem.disabled }]),
                                      key: index,
                                      onClick: ($event) => onSelectSku(subItem, item.value)
                                    }, vue.toDisplayString(subItem.name), 11, ["onClick"]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      vue.createElementVNode("view", { class: "body-num flex-c" }, [
                        vue.createElementVNode("text", { class: "num-block" }, "数量"),
                        vue.createVNode(_component_van_stepper, {
                          value: num.value,
                          onChange: changeValue
                        }, null, 8, ["value"])
                      ])
                    ])
                  ]),
                  isCart.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "btn-submit",
                    onClick: _cache[0] || (_cache[0] = ($event) => onSubmitSku("confirm"))
                  }, " 确定 ")) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "goods-btn flex"
                  }, [
                    vue.createElementVNode("button", {
                      class: "add-cart common-btns",
                      onClick: _cache[1] || (_cache[1] = ($event) => onSubmitSku("add"))
                    }, "加入购物车"),
                    vue.createElementVNode("button", {
                      class: "buy-goods common-btns",
                      onClick: _cache[2] || (_cache[2] = ($event) => onSubmitSku("buy"))
                    }, "立即购买")
                  ]))
                ])
              ];
            }),
            _: 1
            /* STABLE */
          }, 8, ["show"])
        ]);
      };
    }
  };
  const GoodsPopup = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-64fcb64e"], ["__file", "D:/github/app-unis/components/GoodsPopop/GoodsPopop.vue"]]);
  const getGoodsInfoAPI = (id) => {
    return http({
      url: "/goods",
      method: "GET",
      data: {
        id
      }
    });
  };
  const getBrandGoodsAPI = (id) => {
    return http({
      url: "/brand/goods",
      data: {
        brand_id: id
      }
    });
  };
  const getSkuListAPI = (id) => {
    return http({
      url: "/sku",
      data: {
        goods_id: id
      }
    });
  };
  const _sfc_main$V = {
    __name: "CartItem",
    setup(__props) {
      const props = __props;
      useUserCardStore();
      const cartStore = useCartStore();
      vue.ref(1);
      const retailPrice = vue.computed(() => {
        if (props.cartItem.selected) {
          return props.cartItem.sku_item.retail_price - cartStore.reNum;
        }
        return props.cartItem.sku_item.retail_price;
      });
      const skuList = vue.ref([]);
      const isShow = vue.ref(false);
      const openPopup = async () => {
        const res = await getSkuListAPI(props.cartItem.goods_id);
        skuList.value = res.data;
        Object.assign(skuList.value, { item_id: props.cartItem.item_id });
        isShow.value = true;
      };
      const changeNumber = () => {
        cartStore.cartList.forEach((item) => {
          item.stepperFlag = false;
        });
        props.cartItem.stepperFlag = true;
      };
      const goodsSpec = vue.computed(() => {
        var _a;
        return (_a = props.cartItem) == null ? void 0 : _a.spec.map((item) => item.value).join(" ");
      });
      const onDelCartItem = async () => {
        cartStore.delCartItem(props.cartItem.item_id);
      };
      const onCloseSwipe = () => {
      };
      const changeValue = (e) => {
        props.cartItem.count = e.detail;
        cartStore.updateCart(props.cartItem);
      };
      const onChangeCheck = (e) => {
        props.cartItem.selected = e.detail;
        cartStore.updateCart(props.cartItem);
      };
      return (_ctx, _cache) => {
        const _component_van_checkbox = vue.resolveComponent("van-checkbox");
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_stepper = vue.resolveComponent("van-stepper");
        const _component_van_swipe_cell = vue.resolveComponent("van-swipe-cell");
        const _component_GoodsPopop = resolveEasycom(vue.resolveDynamicComponent("GoodsPopop"), GoodsPopup);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(_component_van_swipe_cell, {
              "right-width": 65,
              "async-close": "",
              onClose: onCloseSwipe
            }, {
              default: vue.withCtx(() => {
                var _a, _b, _c, _d, _e, _f;
                return [
                  vue.createElementVNode("view", { class: "cart-item" }, [
                    vue.createElementVNode("view", { class: "cart-item-left" }, [
                      vue.createVNode(_component_van_checkbox, {
                        value: props.cartItem.selected,
                        onChange: onChangeCheck,
                        "checked-color": "#f81e31"
                      }, null, 8, ["value"]),
                      vue.createElementVNode("image", {
                        class: "cart-item-img",
                        src: (_a = props.cartItem) == null ? void 0 : _a.sku_item.pic
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode("view", { class: "cart-item-pro" }, [
                      vue.createElementVNode("view", { class: "item-pro-top" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "_red" },
                          vue.toDisplayString((_b = props.cartItem) == null ? void 0 : _b.sku_item.service),
                          1
                          /* TEXT */
                        ),
                        vue.createTextVNode(
                          vue.toDisplayString((_c = props.cartItem) == null ? void 0 : _c.sku_item.title),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "item-choose",
                        onClick: openPopup
                      }, [
                        vue.createTextVNode(
                          vue.toDisplayString(vue.unref(goodsSpec)),
                          1
                          /* TEXT */
                        ),
                        vue.createVNode(_component_van_icon, {
                          class: "arrow-down",
                          name: "arrow-down",
                          size: "20rpx"
                        })
                      ]),
                      vue.createElementVNode("view", { class: "item-end" }, [
                        vue.createTextVNode(" 距优惠结束 "),
                        vue.createElementVNode("view", { class: "time" }, " 13:13:13 ")
                      ]),
                      vue.createElementVNode("view", { class: "item-price" }, [
                        vue.createElementVNode("text", { class: "small" }, "￥"),
                        vue.createTextVNode(
                          vue.toDisplayString((_d = props.cartItem) == null ? void 0 : _d.sku_item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("text", { class: "red-small" }, "优惠后"),
                        vue.createElementVNode(
                          "text",
                          { class: "num-small" },
                          "￥" + vue.toDisplayString(vue.unref(retailPrice)),
                          1
                          /* TEXT */
                        )
                      ]),
                      props.cartItem.stepperFlag ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "item-add"
                      }, [
                        vue.createVNode(_component_van_stepper, {
                          value: (_e = props.cartItem) == null ? void 0 : _e.count,
                          onChange: changeValue
                        }, null, 8, ["value"])
                      ])) : (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: "item-add-1",
                          onClick: changeNumber
                        },
                        " x" + vue.toDisplayString((_f = props.cartItem) == null ? void 0 : _f.count),
                        1
                        /* TEXT */
                      ))
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    slot: "right",
                    class: "btn-del flex-a",
                    onClick: onDelCartItem
                  }, "删除")
                ];
              }),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_GoodsPopop, {
              show: isShow.value,
              "onUpdate:show": _cache[0] || (_cache[0] = ($event) => isShow.value = $event),
              goods: skuList.value
            }, null, 8, ["show", "goods"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const CartItem = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-b707d0d0"], ["__file", "D:/github/app-unis/pages/cart/components/CartItem.vue"]]);
  const _sfc_main$U = {};
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_GoodsItem = resolveEasycom(vue.resolveDynamicComponent("GoodsItem"), GoodsItem);
    return vue.openBlock(), vue.createElementBlock("view", { class: "love-block" }, [
      vue.renderSlot(_ctx.$slots, "title", {}, void 0, true),
      vue.createElementVNode("view", { class: "love-list" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(6, (o) => {
            return vue.createElementVNode("view", {
              class: "love-list-item",
              key: o
            }, [
              vue.createVNode(_component_GoodsItem)
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const LoveList = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$6], ["__scopeId", "data-v-fc6f4b39"], ["__file", "D:/github/app-unis/components/LoveList/LoveList.vue"]]);
  const _sfc_main$T = {};
  function _sfc_render$5(_ctx, _cache) {
    const _component_van_icon = vue.resolveComponent("van-icon");
    return vue.openBlock(), vue.createElementBlock("view", { class: "change-block" }, [
      vue.createElementVNode("view", { class: "change-top flex-a" }, [
        vue.createElementVNode("view", { class: "title" }, " 全场换购 "),
        vue.createElementVNode("div", { class: "change-box flex" }, [
          vue.createElementVNode("view", { class: "change" }, " 已满0.01元，可选择10间商品换购 "),
          vue.createElementVNode("view", { class: "get-change" }, [
            vue.createTextVNode(" 去换购 "),
            vue.createVNode(_component_van_icon, {
              name: "arrow",
              size: "24rpx"
            })
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-x": "true",
        class: "scroll-change"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(6, (i) => {
            return vue.createElementVNode("view", {
              class: "change-item-block",
              key: i
            }, [
              vue.createElementVNode("view", { class: "change-item flex" }, [
                vue.createElementVNode("view", { class: "item-left-img" }, [
                  vue.createElementVNode("image", {
                    src: "https://yanxuan-item.nosdn.127.net/0ff394ce91519769c5bbf28174a37f64.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
                    class: "item-left-image"
                  })
                ]),
                vue.createElementVNode("view", { class: "item-right-detail flex-c" }, [
                  vue.createElementVNode("view", { class: "item-title" }, " 江南特产,原味西湖藕粉便宜出售 "),
                  vue.createElementVNode("view", { class: "item-pro" }, " 原味藕粉,20克*5袋 "),
                  vue.createElementVNode("view", { class: "item-price" }, [
                    vue.createElementVNode("text", { class: "_red" }, "换购价￥"),
                    vue.createElementVNode("text", { class: "price-num" }, "20.8"),
                    vue.createElementVNode("text", { class: "price-line" }, "￥28")
                  ]),
                  vue.createElementVNode("view", { class: "cart-icon flex-a" }, [
                    vue.createVNode(_component_van_icon, {
                      name: "shopping-cart-o",
                      size: "44rpx",
                      color: "#c43043"
                    })
                  ])
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const ChangeItem = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$5], ["__scopeId", "data-v-929d190a"], ["__file", "D:/github/app-unis/pages/cart/components/ChangeItem.vue"]]);
  const getRegionAPI = () => {
    return http({
      url: "/region"
    });
  };
  const getAddressAPI = () => {
    return http({
      url: "/address"
    });
  };
  const delAddressAPI = (id) => {
    return http({
      url: "/address",
      method: "DELETE",
      data: {
        addres_id: id
      }
    });
  };
  const updateAddressListAPI = (val, id) => {
    return http({
      url: "/address/selected",
      method: "PUT",
      data: {
        id,
        selected: val
      }
    });
  };
  const updateAddressItemAPI = (id) => {
    return http({
      url: "/address",
      method: "PUT",
      data: {
        id
      }
    });
  };
  const useAddressStore = defineStore("address", () => {
    const addressList = vue.ref("");
    const selectedAddress = vue.computed(() => addressList.value.find((item) => item.is_selected == 1));
    const storeAddress = vue.computed(() => addressList.value.find((item) => item.selected));
    const getAddresList = async () => {
      const res = await getAddressAPI();
      addressList.value = res;
    };
    const updateAddress = async (obj) => {
      await updateAddressItemAPI(obj);
      getAddresList();
    };
    const delAddress = async (id) => {
      await delAddressAPI(id);
      getAddresList();
    };
    const onSelectedAddress = async (val, id) => {
      uni.showLoading({ mask: true });
      const res = await updateAddressListAPI(val, id);
      getAddresList();
      if (res)
        uni.hideLoading();
    };
    const tapAddress = (id, val = false, type = "tap") => {
      addressList.value.forEach((item2) => item2.selected = false);
      const item = addressList.value.find((i) => i.addres_id == id);
      type == "tap" ? item.selected = true : item.selected = val;
    };
    return {
      addressList,
      getAddresList,
      delAddress,
      updateAddress,
      selectedAddress,
      onSelectedAddress,
      tapAddress,
      storeAddress
    };
  });
  const _sfc_main$S = {
    __name: "CartHeader",
    setup(__props) {
      const addressStore = useAddressStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const showAddress = vue.ref(false);
      const onChangeItem = (e, item) => {
        addressStore.onSelectedAddress(e.detail, item.addres_id);
      };
      const onShowAddress = (type = "open") => {
        type == "close" ? showAddress.value = false : showAddress.value = true;
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_checkbox = vue.resolveComponent("van-checkbox");
        const _component_van_action_sheet = vue.resolveComponent("van-action-sheet");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "view",
              {
                class: "cart-header fff",
                style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
              },
              [
                vue.createElementVNode("view", { class: "title" }, " 购物车 "),
                vue.createElementVNode("view", {
                  class: "location flex",
                  onClick: onShowAddress
                }, [
                  vue.createVNode(_component_van_icon, {
                    name: "location-o",
                    size: "24rpx"
                  }),
                  vue.createElementVNode(
                    "text",
                    { class: "address-text" },
                    vue.toDisplayString(vue.unref(addressStore).selectedAddress.address.split(" ").join("")),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_van_icon, {
                    name: "arrow",
                    size: "24rpx"
                  })
                ])
              ],
              4
              /* STYLE */
            ),
            vue.createVNode(_component_van_action_sheet, {
              show: showAddress.value,
              title: "配送至",
              onClose: _cache[0] || (_cache[0] = ($event) => onShowAddress("close")),
              round: false
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "address-block"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vue.unref(addressStore).addressList, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "address-item",
                        key: item.addres_id
                      }, [
                        vue.createVNode(_component_van_checkbox, {
                          onChange: ($event) => onChangeItem($event, item),
                          value: item.is_selected
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.address.split(" ").join("")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onChange", "value"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["show"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const CartHeader = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-51195c95"], ["__file", "D:/github/app-unis/pages/cart/components/CartHeader.vue"]]);
  const _sfc_main$R = {
    __name: "cart",
    setup(__props) {
      const userStore = useUserStore();
      const cartStore = useCartStore();
      const userCardStore = useUserCardStore();
      vue.ref(0);
      const onChangeSection = (e, items) => {
        items.forEach((item) => item.selected = e.detail);
        cartStore.updateCart(items);
      };
      const toLogin = () => {
        uni.redirectTo({
          url: "/indexpkg/login/login"
        });
      };
      const onAllChange = (e) => {
        cartStore.onAllChange(e.detail);
      };
      const onClickButton = () => {
        if (!cartStore.selectedItems.length)
          return uni.showToast({ title: "请选择商品结算", icon: "error" });
        userCardStore.optimalTicket(cartStore.allRetailPrice, "selected");
        uni.navigateTo({
          url: "/profilePackge/create-order/create-order"
        });
      };
      const submitPrice = vue.computed(() => {
        return cartStore.allRetailPrice - userCardStore.optimalTicket(cartStore.allRetailPrice, "price");
      });
      return (_ctx, _cache) => {
        const _component_van_checkbox = vue.resolveComponent("van-checkbox");
        const _component_van_submit_bar = vue.resolveComponent("van-submit-bar");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(CartHeader),
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "cart-block flex-c"
            }, [
              vue.createElementVNode("view", { class: "cart-body flex-c" }, [
                !vue.unref(userStore).userInfo ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "not-login-block flex-c-a"
                }, [
                  vue.createElementVNode("image", {
                    class: ".no-login-image",
                    src: "https://yanxuan.nosdn.127.net/3a6c77d8463d8675f4a0a0c80dbe4391.png"
                  }),
                  vue.createElementVNode("text", null, "未登录"),
                  vue.createElementVNode("view", { class: "login-btn-block" }, [
                    vue.createElementVNode("button", {
                      class: "login-btn",
                      onClick: toLogin
                    }, "去登录")
                  ])
                ])) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("view", { class: "scroll-cart" }, [
                      !vue.unref(cartStore).cartList.length ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "no-cart-item flex-c-a"
                      }, [
                        vue.createElementVNode("image", {
                          class: "no-cart-image",
                          src: "https://yanxuan.nosdn.127.net/3a6c77d8463d8675f4a0a0c80dbe4391.png",
                          mode: ""
                        }),
                        vue.createElementVNode("text", { class: "no-cart-text" }, "去添加点什么吧")
                      ])) : (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "cart-list-block flex-c"
                      }, [
                        vue.createCommentVNode(" 全场换购板块 "),
                        vue.createVNode(ChangeItem),
                        vue.createCommentVNode(" 购物车商品板块 "),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(vue.unref(cartStore).cartList, (item, index) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "cart-item-block",
                              key: index
                            }, [
                              vue.createElementVNode("view", { class: "cart-block-title flex-a" }, [
                                vue.createElementVNode("view", { class: "title-left flex-a" }, [
                                  vue.createVNode(_component_van_checkbox, {
                                    value: item[0].value.every((i) => i.selected),
                                    onChange: ($event) => onChangeSection($event, item[0].value),
                                    "checked-color": "#db1b2d"
                                  }, null, 8, ["value", "onChange"]),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "title-left-text" },
                                    vue.toDisplayString(item[0].cart_fee),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createElementVNode("view", { class: "cart-title-right" }, " 以下商品以免邮 ")
                              ]),
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(item[0].value, (subItem) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    key: subItem.item_id
                                  }, [
                                    vue.createVNode(CartItem, { cartItem: subItem }, null, 8, ["cartItem"])
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])),
                      vue.createElementVNode("view", { class: "love-block-cart" }, [
                        vue.createVNode(LoveList, null, {
                          title: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "love-title" }, " 猜你喜欢 ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "end-pay" }, [
                      vue.createVNode(_component_van_submit_bar, {
                        price: vue.unref(submitPrice) * 100,
                        "button-text": "去结算",
                        onSubmit: onClickButton
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_van_checkbox, {
                            value: vue.unref(cartStore).allChecked,
                            onChange: onAllChange,
                            "checked-color": "#db1b2d"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("全选")
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["price"])
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesCartCart = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__file", "D:/github/app-unis/pages/cart/cart.vue"]]);
  const _sfc_main$Q = {
    __name: "PasswordPopup",
    props: ["show", "is_verify"],
    emits: ["update:show", "update:is_verify"],
    setup(__props, { emit: emits }) {
      const password = vue.ref([]);
      const focus = vue.ref(true);
      vue.watchEffect(() => {
        if (password.value.length == 6) {
          verifyPassword();
        }
      });
      const verifyPassword = async () => {
        uni.showLoading({ mask: true });
        const res = await verifyPasswordAPI(password.value.join(""));
        if (res)
          uni.hideLoading();
        if (res.code == 200) {
          onCancel();
          emits("update:is_verify", true);
        } else {
          uni.showToast({
            title: "密码错误",
            icon: "error"
          });
          password.value = [];
        }
      };
      const onCancel = () => {
        password.value = [];
        emits("update:show", false);
      };
      const onTapInputItem = () => {
        focus.value = true;
      };
      const onValueChange = (val) => {
        if (password.value.length >= 6)
          return;
        password.value.push(val);
      };
      const onDeleteVal = () => {
        password.value.pop();
      };
      const onCloseBoard = () => {
        focus.value = false;
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_popup = vue.resolveComponent("van-popup");
        return vue.openBlock(), vue.createBlock(_component_van_popup, {
          show: __props.show,
          position: "bottom",
          "custom-style": "height: 50%;",
          onClose: onCancel
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "box flex-c" }, [
              vue.createElementVNode("view", { class: "password-block flex-c" }, [
                vue.createElementVNode("view", { class: "popup-top flex-a" }, [
                  vue.createElementVNode("view", {
                    class: "cancel-left",
                    onClick: onCancel
                  }, " 取消 "),
                  vue.createElementVNode("view", { class: "forget-right" }, " 忘记密码? ")
                ]),
                vue.createElementVNode("view", { class: "popup-bd flex-c" }, [
                  vue.createElementVNode("view", { class: "title" }, " 输入支付密码 "),
                  vue.createElementVNode("view", { class: "input-block flex" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(6, (i) => {
                        return vue.createElementVNode("view", {
                          class: "input-item flex-a",
                          key: i,
                          onClick: onTapInputItem
                        }, [
                          vue.createElementVNode(
                            "view",
                            { class: "item-value" },
                            vue.toDisplayString(password.value[i - 1]),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])
                ])
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "keyboard flex-c" },
                [
                  vue.createElementVNode("view", {
                    class: "close flex",
                    onClick: onCloseBoard
                  }, [
                    vue.createVNode(_component_van_icon, {
                      name: "arrow-down",
                      size: "24rpx"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "item-block flex" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(9, (i) => {
                        return vue.createElementVNode("view", {
                          class: "key-item",
                          key: i,
                          onClick: ($event) => onValueChange(i)
                        }, vue.toDisplayString(i), 9, ["onClick"]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    )),
                    vue.createElementVNode("view", { class: "key-item none" }),
                    vue.createElementVNode("view", {
                      class: "key-item zero",
                      onClick: _cache[0] || (_cache[0] = ($event) => onValueChange(0))
                    }, " 0 "),
                    vue.createElementVNode("view", {
                      class: "key-item delete",
                      onClick: onDeleteVal
                    }, [
                      vue.createVNode(_component_van_icon, {
                        name: "cross",
                        size: "24rpx"
                      })
                    ])
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, focus.value]
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show"]);
      };
    }
  };
  const PasswordPopup = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-7d66990b"], ["__file", "D:/github/app-unis/components/PasswordPopup/PasswordPopup.vue"]]);
  const _sfc_main$P = {
    __name: "ProfileHeader",
    setup(__props) {
      const props = __props;
      const userStore = useUserStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const toLogin = () => {
        uni.navigateTo({
          url: "/indexpkg/login/login"
        });
      };
      const toUserInfo = () => {
        let url = "";
        !userStore.userInfo ? url = "/indexpkg/login/login" : url = "/subpkg/userinfo/userinfo";
        uni.navigateTo({
          url
        });
      };
      return (_ctx, _cache) => {
        var _a, _b;
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("header", { class: "header" }, [
              vue.createElementVNode("view", { class: "profile-login flex" }, [
                vue.createElementVNode("view", {
                  class: "avator",
                  onClick: toUserInfo
                }, [
                  ((_a = vue.unref(userStore).userInfo) == null ? void 0 : _a.avator) ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "avator-image",
                    src: vue.unref(userStore).userInfo.avator
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                    key: 1,
                    class: "avator-image",
                    src: "https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png"
                  }))
                ]),
                !vue.unref(userStore).userInfo ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "profile-info flex-c"
                }, [
                  vue.createElementVNode("text", null, "未登录"),
                  vue.createElementVNode("view", { onClick: toLogin }, "点击登录账号")
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "profile-info flex-c"
                }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(vue.unref(userStore).userInfo.nickname),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(userStore).userInfo.sign),
                    1
                    /* TEXT */
                  )
                ]))
              ])
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              {
                class: "fixed-header flex-a",
                style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px", paddingBottom: vue.unref(safeAreaInsets).top + "px" })
              },
              [
                vue.unref(userStore).userInfo ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode("image", {
                      src: (_b = vue.unref(userStore).userInfo) == null ? void 0 : _b.avator,
                      class: "fixed-image",
                      onClick: toUserInfo
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(vue.unref(userStore).userInfo.nickname),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("image", {
                      src: "https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png",
                      class: "fixed-image",
                      onClick: toLogin
                    }),
                    vue.createElementVNode("text", null, "未登录")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ],
              4
              /* STYLE */
            ), [
              [vue.vShow, props.flag]
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const ProfileHeader = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-c2b36890"], ["__file", "D:/github/app-unis/pages/profile/components/ProfileHeader.vue"]]);
  const useProfileHook = () => {
    const quoteList = vue.ref([
      { id: 1, name: "礼品卡", is_dollar: false, path: "/profilePackge/card/card" },
      { id: 2, name: "余额", is_dollar: true, path: "/profilePackge/balance/balance" },
      { id: 3, name: "红包", is_dollar: false, path: "/profilePackge/redPacket/redPacket" },
      { id: 4, name: "优惠券", is_dollar: false, path: "/profilePackge/redPacket/redPacket" }
    ]);
    const orderList = vue.ref([
      { id: 1, name: "全部订单", icon: "orders-o" },
      { id: 2, name: "待付款", icon: "paid" },
      { id: 3, name: "待发货", icon: "pending-payment" },
      { id: 4, name: "已发货", icon: "logistics" },
      { id: 4, name: "待评价", icon: "records-o" }
    ]);
    const serviceList = vue.ref([
      { id: 1, name: "地址管理", icon: "location-o", path: "/profilePackge/Address/Address" },
      { id: 2, name: "账号安全", icon: "shield-o", path: "/profilePackge/ProfileSafe/ProfileSafe" },
      { id: 3, name: "账号关联", icon: "link-o", path: "/profilePackge/Address/Address" },
      { id: 4, name: "我的手机号", icon: "phone-o", path: "/profilePackge/Address/Address" },
      { id: 5, name: "加好友交流", icon: "friends-o", path: "/profilePackge/Address/Address" },
      { id: 6, name: "积分乐园", icon: "award-o", path: "/profilePackge/integral/integral" }
    ]);
    return {
      quoteList,
      orderList,
      serviceList
    };
  };
  const _sfc_main$O = {
    __name: "profile",
    setup(__props) {
      const { quoteList, orderList, serviceList } = useProfileHook();
      useUserStore();
      const isShow = vue.ref(false);
      const onMyScroll = (e) => {
        e.detail.scrollTop > 200 ? isShow.value = true : isShow.value = false;
      };
      const a = vue.ref(false);
      const as = () => {
        a.value = true;
      };
      const toOrder = (index) => {
        uni.navigateTo({
          url: `/profilePackge/order/order?index=${index}`
        });
      };
      const toPages = (val) => {
        uni.navigateTo({
          url: val
        });
      };
      const onTapQuoteList = (path) => {
        uni.navigateTo({
          url: path
        });
      };
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_uni_card = vue.resolveComponent("uni-card");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "scroll-view",
              {
                "scroll-y": "true",
                onScroll: onMyScroll,
                class: "profile-block flex-c",
                "enable-flex": ""
              },
              [
                vue.createVNode(ProfileHeader, { flag: isShow.value }, null, 8, ["flag"]),
                vue.createElementVNode("view", { class: "profile-bd" }, [
                  vue.createElementVNode("view", { class: "profile-ticket-block flex" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(vue.unref(quoteList), (i, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "ticket-item flex-c-a",
                          key: index,
                          onClick: ($event) => onTapQuoteList(i.path)
                        }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["item-num", { price: i.is_dollar }])
                            },
                            " 0 ",
                            2
                            /* CLASS */
                          ),
                          vue.createElementVNode(
                            "view",
                            { class: "item-name" },
                            vue.toDisplayString(i.name),
                            1
                            /* TEXT */
                          )
                        ], 8, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  vue.createCommentVNode(" 订单付款栏 "),
                  vue.createElementVNode("view", { class: "order-card fff" }, [
                    vue.createVNode(_component_uni_card, {
                      "is-full": true,
                      "is-shadow": true
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "order-block flex" }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(vue.unref(orderList), (item, index) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                class: "order-item flex-c-a",
                                key: index,
                                onClick: ($event) => toOrder(index)
                              }, [
                                vue.createElementVNode("view", { class: "order-item-icon" }, [
                                  vue.createVNode(_component_van_icon, {
                                    name: item.icon,
                                    size: "60rpx"
                                  }, null, 8, ["name"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "order-item-text" },
                                  vue.toDisplayString(item.name),
                                  1
                                  /* TEXT */
                                )
                              ], 8, ["onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  vue.createCommentVNode(" 我的服务栏 "),
                  vue.createElementVNode("view", {
                    style: { "margin-top": "15px" },
                    class: "fuwu-card flex-c card"
                  }, [
                    vue.createElementVNode("view", { class: "fuwu-title" }, " 我的服务 "),
                    vue.createElementVNode("view", { class: "fuwu-block flex" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(vue.unref(serviceList), (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "fuwu-item flex-c-a",
                            onClick: ($event) => toPages(item.path),
                            key: item.icon
                          }, [
                            vue.createVNode(_component_van_icon, {
                              name: item.icon,
                              color: "#f98a68",
                              size: "42rpx"
                            }, null, 8, ["name"]),
                            vue.createElementVNode(
                              "view",
                              { class: "fuwu-item-text" },
                              vue.toDisplayString(item.name),
                              1
                              /* TEXT */
                            )
                          ], 8, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  vue.createCommentVNode(" 新品首发板块 "),
                  vue.createElementVNode("view", { class: "new-product card" }, [
                    vue.createElementVNode("view", { class: "new-block flex" }, [
                      (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(5, (j) => {
                          return vue.createElementVNode("view", {
                            onClick: as,
                            class: "new-block-item flex-c-a",
                            key: j
                          }, [
                            vue.createElementVNode("view", { class: "new-item-img" }, [
                              vue.createElementVNode("image", {
                                class: ".new-item-image",
                                src: "https://yanxuan.nosdn.127.net/static-union/16644541382b06e4.png"
                              })
                            ]),
                            vue.createElementVNode("view", { class: "new-item-text" }, " 新品首发 ")
                          ]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ])
                ]),
                vue.createCommentVNode(" 猜你喜欢板块 "),
                vue.createVNode(LoveList, null, {
                  title: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "love-title" }, " 猜你喜欢 ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ],
              32
              /* HYDRATE_EVENTS */
            ),
            vue.createVNode(PasswordPopup, {
              show: a.value,
              "onUpdate:show": _cache[0] || (_cache[0] = ($event) => a.value = $event)
            }, null, 8, ["show"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__file", "D:/github/app-unis/pages/profile/profile.vue"]]);
  const _sfc_main$N = {
    __name: "AddressItem",
    props: ["list"],
    setup(__props) {
      const props = __props;
      const addressStore = useAddressStore();
      const show = vue.ref(false);
      const phoneNumber = vue.computed(() => {
        return props.list.contact.substring(0, 4) + "****" + props.list.contact.substring(8);
      });
      const onDelAddres = () => {
        show.value = true;
      };
      const onCloseSwipe = (e) => {
        const { instance } = e.detail;
        instance.close();
      };
      const onTapItem = () => {
        addressStore.tapAddress(props.list.addres_id);
      };
      const handelLongpress = () => {
        formatAppLog("log", "at profilePackge/Address/components/AddressItem.vue:65", 1111);
      };
      const toEdit = () => {
        uni.navigateTo({
          url: `/subpkg/add-edit/add-edit?type=2&id=${props.list.addres_id}`
        });
      };
      const onClose = (e) => {
        if (e.detail == "confirm")
          ;
        show.value = false;
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_cell_group = vue.resolveComponent("van-cell-group");
        const _component_van_swipe_cell = vue.resolveComponent("van-swipe-cell");
        const _component_van_dialog = vue.resolveComponent("van-dialog");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(_component_van_swipe_cell, {
              class: "adress-item-block",
              "right-width": 65,
              "async-close": true,
              onClose: onCloseSwipe
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_van_cell_group, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "adress-item flex-a",
                        onClick: onTapItem,
                        onLongpress: handelLongpress
                      },
                      [
                        vue.createElementVNode("view", { class: "adress-item-left flex-c" }, [
                          vue.createElementVNode("view", { class: "item-left-top flex-a" }, [
                            props.list.is_default == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "small-view default"
                            }, " 默认 ")) : vue.createCommentVNode("v-if", true),
                            vue.createElementVNode(
                              "view",
                              { class: "small-view" },
                              vue.toDisplayString(props.list.tag),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "adress-area" },
                              vue.toDisplayString(props.list.address),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "item-left-adress" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "adress-detail" },
                              vue.toDisplayString(__props.list.detail_adrs),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "item-left-people flex-a" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "name" },
                              vue.toDisplayString(__props.list.name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              { class: "phone-number" },
                              vue.toDisplayString(vue.unref(phoneNumber)),
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "adress-item-right" }, [
                          vue.createVNode(_component_van_icon, {
                            name: "edit",
                            size: "42rpx",
                            onClick: _cache[0] || (_cache[0] = ($event) => toEdit())
                          })
                        ])
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createElementVNode("view", {
                  slot: "right",
                  class: "btn-del flex-a",
                  onClick: onDelAddres
                }, "删除")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_van_dialog, {
              "use-slot": "",
              title: "确认删除",
              show: show.value,
              "show-cancel-button": "",
              onClose
            }, null, 8, ["show"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const AddressItem = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-397f6a41"], ["__file", "D:/github/app-unis/profilePackge/Address/components/AddressItem.vue"]]);
  const middle = () => {
    return new Promise((resolve) => {
      const { safeAreaInsets, statusBarHeight } = uni.getSystemInfoSync();
      const menu = uni.getMenuButtonBoundingClientRect();
      let navBatHeight = (menu.top - statusBarHeight) * 2 + menu.height;
      resolve(navBatHeight);
    });
  };
  const _sfc_main$M = {
    __name: "CustomHeader",
    props: {
      title: {
        type: String,
        default: ""
      },
      middle: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      const props = __props;
      const toBack = () => {
        uni.navigateBack();
      };
      let navBatHeight = vue.ref(0);
      middle().then((data) => navBatHeight.value = data);
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "common-header flex",
            style: vue.normalizeStyle({ lineHeight: vue.unref(navBatHeight) + "px" })
          },
          [
            vue.createElementVNode("view", {
              class: "left-icon",
              onClick: toBack
            }, [
              vue.createVNode(_component_van_icon, { name: "arrow-left" })
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["common-header-title", { middle: props.middle }])
              },
              vue.toDisplayString(__props.title),
              3
              /* TEXT, CLASS */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-528cb9dc"], ["__file", "D:/github/app-unis/components/CustomHeader/CustomHeader.vue"]]);
  const useMiddle = (className) => {
    return new Promise((resolve, reject) => {
      let top = 0;
      let height = 0;
      let rect = uni.getMenuButtonBoundingClientRect();
      let query = wx.createSelectorQuery();
      query.select(className).boundingClientRect();
      query.exec((res) => {
        height = res[0].height;
        top = rect.top + rect.height / 2 - height / 2;
        resolve({
          height,
          top
        });
      });
    });
  };
  const _sfc_main$L = {
    __name: "Address",
    setup(__props) {
      const addressStore = useAddressStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const toAdd = () => {
        uni.navigateTo({
          url: "/subpkg/add-edit/add-edit?type=1"
        });
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "address-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(__easycom_0, { title: "收货地址" }),
            vue.createElementVNode("view", { class: "adress-body" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(addressStore).addressList, (item) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: item.addres_id,
                    class: "addres-item-block"
                  }, [
                    vue.createVNode(AddressItem, { list: item }, null, 8, ["list"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "footer flex",
                style: vue.normalizeStyle({ bottom: vue.unref(safeAreaInsets).bottom + "px" })
              },
              [
                vue.createElementVNode("view", { class: "btn-comm btn-from" }, [
                  vue.createVNode(_component_van_icon, {
                    name: "wechat",
                    color: "#06bb07",
                    size: "36rpx"
                  }),
                  vue.createElementVNode("text", null, "微信导入")
                ]),
                vue.createElementVNode("view", {
                  class: "btn-comm btn-add",
                  onClick: toAdd
                }, " 新增收货地址 ")
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeAddressAddress = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__file", "D:/github/app-unis/profilePackge/Address/Address.vue"]]);
  const _sfc_main$K = {
    __name: "header",
    props: {
      title: {
        type: String,
        default: ""
      },
      middle: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      const props = __props;
      const toBack = () => {
        uni.navigateBack();
      };
      let navBatHeight = vue.ref(0);
      middle().then((data) => navBatHeight.value = data);
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "common-header flex",
            style: vue.normalizeStyle({ lineHeight: vue.unref(navBatHeight) + "px" })
          },
          [
            vue.createElementVNode("view", {
              class: "left-icon",
              onClick: toBack
            }, [
              vue.createVNode(_component_van_icon, { name: "arrow-left" })
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["title", { middle: props.middle }])
              },
              vue.toDisplayString(__props.title),
              3
              /* TEXT, CLASS */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const Header = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-400e0b6c"], ["__file", "D:/github/app-unis/profilePackge/card/header.vue"]]);
  const _sfc_main$J = {
    __name: "PayPopup",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: Boolean,
        default: false
      },
      price: {
        type: String,
        default: "0"
      },
      id: {
        type: Number,
        default: 0
      }
    },
    emits: ["update:show"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const userCardStore = useUserCardStore();
      const is_enough = vue.computed(() => userCardStore.userBalance.num >= (props == null ? void 0 : props.price));
      const onClose = () => {
        emits("update:show", false);
      };
      const confirmPay = () => {
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_button = vue.resolveComponent("van-button");
        const _component_van_popup = vue.resolveComponent("van-popup");
        return vue.openBlock(), vue.createBlock(_component_van_popup, {
          show: __props.show,
          closeable: "",
          position: "bottom",
          "custom-style": "height: 40%",
          onClose,
          "close-on-click-overlay": false
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "pay-box flex-c" }, [
              vue.createElementVNode("view", { class: "title" }, " 在线支付 "),
              vue.createElementVNode(
                "view",
                { class: "all-pay-price" },
                " ￥" + vue.toDisplayString(__props.price),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "pay-mode flex" }, [
                vue.createVNode(_component_van_icon, {
                  name: "alipay",
                  color: "rgb(23,120,255)",
                  size: "50rpx"
                }),
                vue.createElementVNode("view", { class: "pay-item flex-a" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    "余额支付(" + vue.toDisplayString(vue.unref(userCardStore).userBalance.num) + ")",
                    1
                    /* TEXT */
                  ),
                  vue.withDirectives(vue.createElementVNode(
                    "text",
                    { class: "error" },
                    "*余额不足，请先去充值",
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, !vue.unref(is_enough)]
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "pay" }, [
                vue.createVNode(_component_van_button, {
                  type: "primary",
                  onClick: confirmPay,
                  block: "",
                  disabled: !vue.unref(is_enough)
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("确认支付")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled"])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show"]);
      };
    }
  };
  const PayPopup = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-ebc6e811"], ["__file", "D:/github/app-unis/profilePackge/components/PayPopup.vue"]]);
  const createOrderAPI = (cart, addres, fee, num) => {
    return http({
      url: "/order",
      method: "PUT",
      data: {
        cart,
        addres,
        fee,
        num
      }
    });
  };
  const getOrderItemAPI = (id) => {
    return http({
      url: "/order",
      data: {
        id
      }
    });
  };
  const getOrderListAPI = () => {
    return http({
      url: "/orders"
    });
  };
  const updateOrderItemAPI = (type, id) => {
    return http({
      url: "/order",
      method: "POST",
      data: {
        type,
        id
      }
    });
  };
  const useOrderStore = defineStore("order", () => {
    const orderList = vue.ref([]);
    const orderItem = vue.ref("");
    const getOrderList = async () => {
      const res = await getOrderListAPI();
      orderList.value = res.data;
      let nowTime = /* @__PURE__ */ new Date();
      orderList.value.forEach((item) => {
        let effectiveTime = new Date(item.effective_time);
        if (nowTime < effectiveTime) {
          item.remainTime = effectiveTime - nowTime;
        } else {
          item.remainTime = 0;
        }
      });
    };
    const getOrderItem = async (id) => {
      const res = await getOrderItemAPI(id);
      orderItem.value = res.list;
      let nowTime = /* @__PURE__ */ new Date();
      orderItem.value.remainTime = new Date(orderItem.value.effective_time) - nowTime;
    };
    const updateItem = async (type, id) => {
      uni.showLoading({
        mask: true
      });
      const res = await updateOrderItemAPI(type, id);
      if (res)
        uni.hideLoading();
    };
    const createOrderItem = async (cart, addres, fee, num) => {
      const res = await createOrderAPI(cart, addres, fee, num);
      const id = res.data.id;
      getOrderItem(id);
      return true;
    };
    return {
      orderList,
      orderItem,
      getOrderItem,
      getOrderList,
      updateItem,
      createOrderItem
    };
  });
  const _sfc_main$I = {
    __name: "OrderItem",
    props: ["item"],
    setup(__props) {
      const props = __props;
      const orderStore = useOrderStore();
      const onFinish = () => {
        orderStore.updateItem(-1, props.item.order_id);
      };
      const toDetail = () => {
        orderStore.getOrderItem(props.item.order_id);
        uni.navigateTo({
          url: `/profilePackge/OrderDetail/OrderDetail`
        });
      };
      const show = vue.ref(false);
      const onPay = () => {
        show.value = true;
      };
      return (_ctx, _cache) => {
        var _a, _b, _c, _d, _e;
        const _component_van_count_down = vue.resolveComponent("van-count-down");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", {
              class: "order-item-block flex-c fff",
              onClick: toDetail
            }, [
              vue.createElementVNode(
                "view",
                { class: "order-item-top" },
                " 订单编号：" + vue.toDisplayString((_a = __props.item) == null ? void 0 : _a.order_id),
                1
                /* TEXT */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList((_b = __props.item) == null ? void 0 : _b.children, (i, index) => {
                  var _a2, _b2;
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "order-item flex",
                    key: index
                  }, [
                    vue.createElementVNode("image", {
                      class: "order-image",
                      src: i.pic
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "goods-name-sku flex-c" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "goods-name" },
                        vue.toDisplayString(i.goods_name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "goods-sku" },
                        vue.toDisplayString(i.spec),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "packge flex-c" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "packge-name" },
                        "包裹" + vue.toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "order-status" },
                        vue.toDisplayString(((_a2 = __props.item) == null ? void 0 : _a2.order_status) == 0 ? "待付款" : ((_b2 = __props.item) == null ? void 0 : _b2.order_status) == 1 ? "已付款" : "已取消"),
                        1
                        /* TEXT */
                      )
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "should-pay flex-a" },
                [
                  vue.createElementVNode("view", { class: "left flex" }, [
                    vue.createElementVNode("text", null, "应付:"),
                    vue.createElementVNode(
                      "text",
                      { class: "pay-price" },
                      "￥" + vue.toDisplayString((_c = __props.item) == null ? void 0 : _c.pay_price),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "right flex" }, [
                    vue.createElementVNode("view", { class: "btn-order cancel-order" }, " 取消订单 "),
                    vue.createElementVNode("view", {
                      class: "btn-order flex-a pay-order",
                      onClick: onPay
                    }, [
                      vue.createTextVNode(" 付款 "),
                      vue.createVNode(_component_van_count_down, {
                        onFinish,
                        time: (_d = __props.item) == null ? void 0 : _d.remainTime,
                        format: "mm:ss"
                      }, null, 8, ["time"])
                    ])
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, ((_e = __props.item) == null ? void 0 : _e.order_status) == 0]
              ])
            ]),
            vue.createVNode(PayPopup, {
              show: show.value,
              "onUpdate:show": _cache[0] || (_cache[0] = ($event) => show.value = $event),
              price: __props.item.pay_price
            }, null, 8, ["show", "price"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const OrderItem = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-0fb0ede9"], ["__file", "D:/github/app-unis/profilePackge/order/components/OrderItem.vue"]]);
  const _sfc_main$H = {
    __name: "order",
    setup(__props) {
      const orderStore = useOrderStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const orderTabs = vue.ref([
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "已发货" },
        { name: "待评价" }
      ]);
      const activeIndex = vue.ref(0);
      const onTapTab = (val) => {
        activeIndex.value = val;
      };
      const List = vue.computed(() => {
        let i = activeIndex.value;
        if (i == 0) {
          return orderStore.orderList;
        } else if (i == 1) {
          return orderStore.orderList.filter((item) => item.order_status == 0);
        } else if (i == 2) {
          return orderStore.orderList.filter((item) => item.order_status == 1);
        } else if (i == 3) {
          return orderStore.orderList.filter((item) => item.order_status == 2);
        } else if (i == 4) {
          return orderStore.orderList.filter((item) => item.order_status == 3);
        }
      });
      onLoad((option) => {
        activeIndex.value = option.index;
        orderStore.getOrderList();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "order-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createElementVNode("view", { class: "order-header flex-c" }, [
              vue.createVNode(Header, { title: "我的订单" }),
              vue.createElementVNode("view", { class: "header-tab flex fff" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(orderTabs.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "tab-item-block flex-a",
                      key: index
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["tab-item", { active: index == activeIndex.value }]),
                        onClick: ($event) => onTapTab(index)
                      }, vue.toDisplayString(item.name), 11, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("view", { class: "order-body flex-c" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(List), (item) => {
                  return vue.openBlock(), vue.createBlock(OrderItem, {
                    key: item.order_id,
                    item
                  }, null, 8, ["item"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeOrderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__file", "D:/github/app-unis/profilePackge/order/order.vue"]]);
  const _sfc_main$G = {
    __name: "add-edit",
    setup(__props) {
      useAddressStore();
      const top = vue.ref(0);
      const type = vue.ref("1");
      const formData = vue.ref({
        name: "",
        contact: "",
        adress: ""
      });
      const cascaderVal = vue.ref(0);
      const options = vue.ref([]);
      const show = vue.ref(false);
      const ids = vue.ref([]);
      const checked = vue.ref(false);
      const toBack = () => {
        uni.navigateBack();
      };
      const onCloseOpen = (type2 = "close") => {
        type2 == "open" ? show.value = true : show.value = false;
      };
      const fieldValue = vue.ref("");
      const onFinish = (e) => {
        const { selectedOptions, value } = e.detail;
        selectedOptions.forEach((item) => ids.value.push(item.value));
        fieldValue.value = selectedOptions.map((option) => option.text || option.name).join(" ");
        cascaderVal.value = value;
        if (e.type === "finish") {
          show.value = false;
        }
      };
      const submitTap = () => {
        for (let key in formData.value) {
          if (formData.value[key] == "" || ids.value.length == 0) {
            uni.showToast({
              icon: "error",
              title: "请填写完整信息"
            });
            return;
          }
        }
        formatAppLog("log", "at profilePackge/add-edit/add-edit.vue:153", formData.value);
        formatAppLog("log", "at profilePackge/add-edit/add-edit.vue:154", ids.value);
        if (type.value == "1") {
          addAddressAPI();
        } else {
          updateAddressAPI(formData.value, ids.value, checked.value);
        }
      };
      const getRegionList = async () => {
        const res = await getRegionAPI();
        options.value = res;
      };
      onLoad((option) => {
        type.value = option.type;
        useMiddle(".edit-add-title").then((data) => top.value = data.top);
        getRegionList();
      });
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        const _component_van_switch = vue.resolveComponent("van-switch");
        const _component_van_cascader = vue.resolveComponent("van-cascader");
        const _component_van_popup = vue.resolveComponent("van-popup");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "view",
              {
                class: "add-edit-header",
                style: vue.normalizeStyle({ paddingTop: top.value + "px" })
              },
              [
                vue.createVNode(_component_van_icon, {
                  name: "arrow-left",
                  size: "36rpx",
                  class: "header-left",
                  onClick: toBack
                }),
                vue.createElementVNode(
                  "view",
                  { class: "edit-add-title" },
                  vue.toDisplayString(type.value == "1" ? "新增地址" : "编辑地址"),
                  1
                  /* TEXT */
                )
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "add-edit-bd" }, [
              vue.createElementVNode("view", { class: "receiver-detail" }, [
                vue.createElementVNode(
                  "form",
                  {
                    ref: "form",
                    modelValue: "formData"
                  },
                  [
                    vue.createElementVNode("view", { class: "form-item" }, [
                      vue.createElementVNode("view", { class: "item-lable" }, " 收货人 "),
                      vue.createElementVNode("view", { class: "item-input" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            type: "text",
                            placeholder: "请填写收货人姓名",
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.name = $event)
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vModelText, formData.value.name]
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "form-item" }, [
                      vue.createElementVNode("view", { class: "item-lable" }, " 联系方式 "),
                      vue.createElementVNode("view", { class: "item-input" }, [
                        vue.createElementVNode("view", { class: "select-phone" }, [
                          vue.createElementVNode("text", null, "+86"),
                          vue.createVNode(_component_uni_icons, {
                            type: "bottom",
                            size: "12",
                            color: "#696969"
                          })
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            type: "text",
                            placeholder: "请填写收货人姓名",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.contact = $event)
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vModelText, formData.value.contact]
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "form-item" }, [
                      vue.createElementVNode("view", { class: "item-lable" }, " 所在地区 "),
                      vue.createElementVNode("view", {
                        class: "item-input",
                        onClick: _cache[2] || (_cache[2] = ($event) => onCloseOpen("open"))
                      }, [
                        fieldValue.value ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          { key: 0 },
                          vue.toDisplayString(fieldValue.value),
                          1
                          /* TEXT */
                        )) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "省份城市区县"))
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "form-item" }, [
                      vue.createElementVNode("view", { class: "item-lable" }, " 详细地址 "),
                      vue.createElementVNode("view", { class: "item-input" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            type: "text",
                            placeholder: "请填写收货人姓名",
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.adress = $event)
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vModelText, formData.value.adress]
                        ])
                      ])
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                )
              ]),
              vue.createElementVNode("view", { class: "adress-lable" }, [
                vue.createElementVNode("view", { class: "lable-block" }, [
                  vue.createElementVNode("view", { class: "lable" }, " 标签 "),
                  vue.createElementVNode("view", { class: "lable-item-block" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(3, (i) => {
                        return vue.createElementVNode("view", {
                          class: "lable-item",
                          key: i
                        }, " 学校 ");
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    )),
                    vue.createElementVNode("view", { class: "lable-item plus" }, " + ")
                  ])
                ]),
                vue.createElementVNode("view", { class: "smart-adress" }, [
                  vue.createElementVNode("view", { class: "smart-title" }, " 智能识别地址: "),
                  vue.createElementVNode("view", { class: "smart-item-block" }, " 粘贴整段文字如:北京市大兴区科创十一街京东集团总部,吴祖扬,15588480581 ")
                ]),
                vue.createElementVNode("view", { class: "set-default" }, [
                  vue.createElementVNode("view", { class: "default-text" }, [
                    vue.createElementVNode("view", { class: "big-text" }, " 设置默认地址 "),
                    vue.createElementVNode("view", { class: "alert-text" }, " 提醒:每次下单会默认推荐使用该地址 ")
                  ]),
                  vue.createElementVNode("view", { class: "default-btn flex-a" }, [
                    vue.createVNode(_component_van_switch, {
                      checked: checked.value,
                      size: "24px"
                    }, null, 8, ["checked"])
                  ])
                ])
              ]),
              vue.createElementVNode("view", {
                class: "submit-block",
                onClick: submitTap
              }, [
                vue.createElementVNode("button", { class: "btn-submit" }, "确定")
              ]),
              vue.createVNode(_component_van_popup, {
                show: show.value,
                position: "bottom"
              }, {
                default: vue.withCtx(() => [
                  show.value ? (vue.openBlock(), vue.createBlock(_component_van_cascader, {
                    key: 0,
                    swipeable: "",
                    value: cascaderVal.value,
                    title: "地址",
                    options: options.value,
                    "active-color": "#ee0a24",
                    onClose: onCloseOpen,
                    onFinish
                  }, null, 8, ["value", "options"])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["show"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const ProfilePackgeAddEditAddEdit = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__file", "D:/github/app-unis/profilePackge/add-edit/add-edit.vue"]]);
  const _sfc_main$F = {};
  function _sfc_render$4(_ctx, _cache) {
    const _component_van_field = vue.resolveComponent("van-field");
    const _component_van_radio = vue.resolveComponent("van-radio");
    const _component_van_radio_group = vue.resolveComponent("van-radio-group");
    const _component_van_cell_group = vue.resolveComponent("van-cell-group");
    return vue.openBlock(), vue.createBlock(_component_van_cell_group, null, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_van_field, {
          value: "1233",
          label: "账号",
          readonly: ""
        }),
        vue.createVNode(_component_van_field, {
          value: "hhh",
          label: "用户名"
        }),
        vue.createVNode(_component_van_field, {
          value: "hhh",
          label: "个性签名"
        }),
        vue.createElementVNode("view", { class: "info-item flex" }, [
          vue.createElementVNode("view", { class: "item-left" }, " 性别 "),
          vue.createElementVNode("view", { class: "item-right" }, [
            vue.createVNode(_component_van_radio_group, {
              value: "{{ radio }}",
              onChange: _ctx.onChange,
              direction: "horizontal"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_van_radio, { name: "1" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("男")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_van_radio, { name: "2" }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("女")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["onChange"])
          ])
        ]),
        vue.createElementVNode("view", { class: "info-item flex" }, [
          vue.createElementVNode("view", { class: "item-left" }, " 生日 "),
          vue.createElementVNode("view", { class: "item-right" }, [
            vue.createCommentVNode(' <van-datetime-picker\r\n			  type="date"\r\n			  :value="11"\r\n			  @input="onInput"\r\n			/> '),
            (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "placeholder"
            }, "请选择日期"))
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    });
  }
  const InfoItem = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$4], ["__scopeId", "data-v-56ddc984"], ["__file", "D:/github/app-unis/profilePackge/userinfo/components/InfoItem.vue"]]);
  const _sfc_main$E = {
    __name: "userinfo",
    setup(__props) {
      const { userInfo, clearUserInfo } = useUserStore();
      const toBack = () => {
        uni.navigateBack();
      };
      const top = vue.ref(0);
      const onClear = () => {
        clearUserInfo();
        uni.navigateBack();
      };
      const changeAvator = () => {
        uni.chooseImage({
          count: 1,
          sourceType: "album",
          success: (res) => {
            const path = res.tempFiles[0].path;
            uni.uploadFile({
              url: "http://localhost:3000/api/uni/upload",
              // header: {
              // 	"content-type": 'multipart/form-data'
              // },
              filePath: path,
              name: "file",
              formData: {
                id: userInfo.u_id
              },
              success: (result) => {
                if (result.statusCode === 200) {
                  const data = JSON.parse(result.data);
                  userInfo.avator = data.avator;
                  uni.showToast({
                    icon: "success",
                    title: "更换成功"
                  });
                }
              }
            });
          }
        });
      };
      const onSubmit = () => {
        uni.request({
          url: "http://localhost:3000/api/uni/userinfo",
          data: userInfo,
          method: "POST",
          success: (res) => {
            if (res.statusCode === 200) {
              uni.showToast({
                icon: "success",
                title: "更新成功"
              });
            }
          }
        });
      };
      onLoad(() => {
        useMiddle(".u-top").then((data) => top.value = data.top);
      });
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "user-header" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "u-top",
                  style: vue.normalizeStyle({ paddingTop: top.value + "px" })
                },
                [
                  vue.createVNode(_component_van_icon, {
                    name: "arrow-left",
                    size: "40rpx",
                    class: "u-left",
                    onClick: toBack
                  }),
                  vue.createElementVNode("text", { class: "u-title" }, "个人中心")
                ],
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "u-avator" }, [
                vue.createElementVNode("image", {
                  class: "u-avator-image",
                  src: vue.unref(userInfo).avator
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", {
                class: "u-change",
                onClick: changeAvator
              }, " 点击修改头像 ")
            ]),
            vue.createElementVNode("view", { class: "u-body" }, [
              vue.createElementVNode("view", { class: "detail-bd" }, [
                vue.createVNode(InfoItem),
                vue.createElementVNode("view", { class: "storge-block" }, [
                  vue.createElementVNode("button", {
                    onClick: vue.withModifiers(onSubmit, ["prevent"]),
                    class: "submit-btn"
                  }, "保存", 8, ["onClick"])
                ]),
                vue.createElementVNode("view", { class: "out-btn" }, [
                  vue.createElementVNode("button", {
                    onClick: vue.withModifiers(onClear, ["prevent"]),
                    class: "submit-btn"
                  }, "退出登录", 8, ["onClick"])
                ])
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const ProfilePackgeUserinfoUserinfo = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "D:/github/app-unis/profilePackge/userinfo/userinfo.vue"]]);
  let queue = [];
  const defaultOptions$1 = {
    show: false,
    title: "",
    width: null,
    theme: "default",
    message: "",
    zIndex: 100,
    overlay: true,
    selector: "#van-dialog",
    className: "",
    asyncClose: false,
    beforeClose: null,
    transition: "scale",
    customStyle: "",
    messageAlign: "",
    overlayStyle: "",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
    confirmButtonOpenType: ""
  };
  let currentOptions$1 = Object.assign({}, defaultOptions$1);
  function getContext$1() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  }
  const Dialog = (options) => {
    options = Object.assign(Object.assign({}, currentOptions$1), options);
    return new Promise((resolve, reject) => {
      const context = (typeof options.context === "function" ? options.context() : options.context) || getContext$1();
      const dialog = context.selectComponent(options.selector);
      delete options.context;
      delete options.selector;
      if (dialog) {
        dialog.setData(Object.assign({ callback: (action, instance) => {
          action === "confirm" ? resolve(instance) : reject(instance);
        } }, options));
        wx.nextTick(() => {
          dialog.setData({ show: true });
        });
        queue.push(dialog);
      } else {
        formatAppLog("warn", "at wxcomponents/vant/dialog/dialog.js:49", "未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
      }
    });
  };
  Dialog.alert = (options) => Dialog(options);
  Dialog.confirm = (options) => Dialog(Object.assign({ showCancelButton: true }, options));
  Dialog.close = () => {
    queue.forEach((dialog) => {
      dialog.close();
    });
    queue = [];
  };
  Dialog.stopLoading = () => {
    queue.forEach((dialog) => {
      dialog.stopLoading();
    });
  };
  Dialog.currentOptions = currentOptions$1;
  Dialog.defaultOptions = defaultOptions$1;
  Dialog.setDefaultOptions = (options) => {
    currentOptions$1 = Object.assign(Object.assign({}, currentOptions$1), options);
    Dialog.currentOptions = currentOptions$1;
  };
  Dialog.resetDefaultOptions = () => {
    currentOptions$1 = Object.assign({}, defaultOptions$1);
    Dialog.currentOptions = currentOptions$1;
  };
  Dialog.resetDefaultOptions();
  const _sfc_main$D = {
    __name: "PackgeItem",
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(props.item, (subItem) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "pakge-block flex-c",
              key: subItem.item_id
            }, [
              vue.createElementVNode("view", { class: "pakge-top flex-a" }, [
                vue.createElementVNode(
                  "text",
                  { class: "pakge-name" },
                  "包裹" + vue.toDisplayString(props.index + 1),
                  1
                  /* TEXT */
                ),
                vue.renderSlot(_ctx.$slots, "title", {}, () => [
                  vue.createElementVNode("text", { class: "pakge-time" }, "支付后预计48小时内发货")
                ], true)
              ]),
              vue.createElementVNode("view", { class: "pakge-item flex" }, [
                vue.createElementVNode("image", {
                  src: subItem.sku_item.pic,
                  class: "pakge-item-left"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "pakge-item-right flex-c" }, [
                  vue.createElementVNode("view", { class: "item-name-service flex" }, [
                    vue.createElementVNode("view", { class: "item-text" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-service" },
                        vue.toDisplayString(subItem.sku_item.service),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "item-name" },
                        vue.toDisplayString(subItem.sku_item.title),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "item-count" },
                      " x" + vue.toDisplayString(subItem.count),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "item-guige" },
                    vue.toDisplayString(subItem.spec.map((i) => i.value).join(" ")),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "item-price" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "real-price" },
                      "￥" + vue.toDisplayString(subItem.sku_item.price),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "discount-price" },
                      "￥" + vue.toDisplayString(subItem.sku_item.retail_price),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "pakge-btm" })
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        );
      };
    }
  };
  const PackgeItem = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-cab5a2dc"], ["__file", "D:/github/app-unis/profilePackge/create-order/components/PackgeItem.vue"]]);
  const _sfc_main$C = {
    __name: "Discount",
    props: ["li_checked", "h_checked"],
    setup(__props) {
      const userCardStore = useUserCardStore();
      const cartStore = useCartStore();
      const fee = vue.ref(0);
      return (_ctx, _cache) => {
        var _a;
        return vue.openBlock(), vue.createElementBlock("view", { class: "fee-youhui-block" }, [
          vue.createElementVNode("view", { class: "common-item flex-a goods-price" }, [
            vue.createElementVNode("view", { class: "name-left" }, " 商品金额 "),
            vue.createElementVNode(
              "view",
              { class: "number-right" },
              " ￥" + vue.toDisplayString(vue.unref(cartStore).allPrice),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "common-item flex-a driver-fee" }, [
            vue.createElementVNode("view", { class: "name-left" }, " 邮费 "),
            vue.createElementVNode(
              "view",
              { class: "number-right" },
              " 预估￥" + vue.toDisplayString(fee.value),
              1
              /* TEXT */
            )
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "common-item flex-a driver-fee" },
            [
              vue.createElementVNode("view", { class: "name-left" }, " 红包抵扣 "),
              vue.createElementVNode(
                "view",
                { class: "number-right" },
                " -￥" + vue.toDisplayString((_a = vue.unref(userCardStore).selectedTicket) == null ? void 0 : _a.ticket_price),
                1
                /* TEXT */
              )
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, vue.unref(userCardStore).selectedTicket]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "common-item flex-a driver-fee" },
            [
              vue.createElementVNode("view", { class: "name-left" }, " 礼品卡 "),
              vue.createElementVNode(
                "view",
                { class: "number-right" },
                " -￥" + vue.toDisplayString(vue.unref(userCardStore).userCard[0].card_num),
                1
                /* TEXT */
              )
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, __props.li_checked]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "common-item flex-a driver-fee" },
            [
              vue.createElementVNode("view", { class: "name-left" }, " 提货卡 "),
              vue.createElementVNode(
                "view",
                { class: "number-right" },
                " -￥" + vue.toDisplayString(vue.unref(userCardStore).userCard[1].card_num),
                1
                /* TEXT */
              )
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, __props.h_checked]
          ]),
          vue.createElementVNode("view", { class: "common-item flex-a active-youhui" }, [
            vue.createElementVNode("view", { class: "name-left" }, " 活动优惠 "),
            vue.createElementVNode(
              "view",
              { class: "number-right red-price" },
              " -￥" + vue.toDisplayString(vue.unref(cartStore).activeFee),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  };
  const Discount = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-fd33a610"], ["__file", "D:/github/app-unis/profilePackge/create-order/components/Discount.vue"]]);
  const _sfc_main$B = {
    __name: "CreateHeader",
    setup(__props) {
      const addressStore = useAddressStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const address = vue.computed(() => addressStore.storeAddress || addressStore.selectedAddress);
      const toAddres = () => {
        uni.navigateTo({
          url: "/subpkg/Address/Address"
        });
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "create-order-header flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(__easycom_0, {
              title: "填写订单",
              middle: true
            }),
            vue.createElementVNode("view", { class: "header-split" }),
            vue.createElementVNode("view", { class: "addres-block flex" }, [
              !vue.unref(addressStore).addressList.length ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", { class: "ad-item-block flex-a" }, [
                    vue.createElementVNode("view", { class: "ad-item-left flex" }, [
                      vue.createVNode(_component_van_icon, {
                        name: "location",
                        siez: "60rpx",
                        color: "#ea6768"
                      }),
                      vue.createElementVNode("text", { class: "item-left-text" }, "填写地址")
                    ]),
                    vue.createVNode(_component_van_icon, {
                      name: "arrow",
                      siez: "24rpx"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "ad-item-block flex-a" }, [
                    vue.createElementVNode("view", { class: "ad-item-left flex" }, [
                      vue.createVNode(_component_van_icon, {
                        name: "wechat",
                        siez: "60rpx",
                        color: "#5dbe6f"
                      }),
                      vue.createElementVNode("text", { class: "item-left-text" }, "导入微信地址")
                    ]),
                    vue.createVNode(_component_van_icon, {
                      name: "arrow",
                      siez: "24rpx"
                    })
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "adress-item flex-a",
                onClick: toAddres
              }, [
                vue.createElementVNode("view", { class: "adress-item-left flex-c" }, [
                  vue.createElementVNode("view", { class: "item-left-top flex-a" }, [
                    vue.unref(address).is_default == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "small-view default"
                    }, " 默认 ")) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "view",
                      { class: "small-view" },
                      vue.toDisplayString(vue.unref(address).tag),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "adress-area" },
                      vue.toDisplayString(vue.unref(address).address),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "item-left-adress" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "adress-detail" },
                      vue.toDisplayString(vue.unref(address).detail_adrs),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "item-left-people flex-a" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(vue.unref(address).name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "phone-number" },
                      vue.toDisplayString(vue.unref(address).contact),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "adress-item-right" }, [
                  vue.createVNode(_component_van_icon, {
                    name: "arrow",
                    size: "32rpx",
                    color: "#bababa"
                  })
                ])
              ]))
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const CreateHeader = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-d13cfc4c"], ["__file", "D:/github/app-unis/profilePackge/create-order/components/CreateHeader.vue"]]);
  const _sfc_main$A = {
    __name: "CreateQuote",
    props: ["li_checked", "h_checked"],
    emits: ["update:li_checked", "update:h_checked"],
    setup(__props, { emit: emits }) {
      const userCardStore = useUserCardStore();
      const toTicketQuote = (type) => {
        uni.navigateTo({
          url: "/subpkg/choose-ticket/choose-ticket"
        });
      };
      const onChange = (e, type = "h") => {
        if (type == "li") {
          emits("update:li_checked", e.detail);
        } else {
          emits("update:h_checked", e.detail);
        }
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_checkbox = vue.resolveComponent("van-checkbox");
        return vue.openBlock(), vue.createElementBlock("view", { class: "quote-packet-block" }, [
          vue.createElementVNode("view", { class: "common-block flex-a" }, [
            vue.createElementVNode("view", { class: "left-block" }, " 优惠券：暂无可用 "),
            vue.createElementVNode("view", { class: "right-block" }, [
              vue.createElementVNode("text", { class: "quote-count" }, "0张"),
              vue.createVNode(_component_van_icon, {
                name: "arrow",
                size: "32rpx",
                color: "#6b6b6b"
              })
            ])
          ]),
          vue.createElementVNode("view", {
            class: "common-block flex-a",
            onClick: _cache[0] || (_cache[0] = ($event) => toTicketQuote())
          }, [
            !vue.unref(userCardStore).selectedTicket ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "left-block"
            }, " 红包：暂无可用 ")) : (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "left-block"
              },
              " 红包：" + vue.toDisplayString(vue.unref(userCardStore).selectedTicket.ticket_name || " "),
              1
              /* TEXT */
            )),
            vue.createElementVNode("view", { class: "right-block" }, [
              vue.createVNode(_component_van_icon, {
                name: "arrow",
                size: "32rpx",
                color: "#6b6b6b"
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "common-block flex-a" }, [
            vue.createElementVNode("view", { class: "left-block" }, [
              vue.createVNode(_component_van_checkbox, {
                shape: "square",
                class: "left-zero-checked",
                value: __props.h_checked,
                onChange: _cache[1] || (_cache[1] = ($event) => onChange($event)),
                disabled: vue.unref(userCardStore).userCard[1].card_num == 0 ? true : false
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    "提货卡可用余额：￥" + vue.toDisplayString(vue.unref(userCardStore).userCard[1].card_num),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["value", "disabled"])
            ]),
            vue.createElementVNode("view", { class: "right-block" }, [
              vue.createVNode(_component_van_icon, {
                name: "arrow",
                size: "32rpx",
                color: "#6b6b6b"
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "common-block flex-a" }, [
            vue.createElementVNode("view", { class: "left-block" }, [
              vue.createVNode(_component_van_checkbox, {
                shape: "square",
                class: vue.normalizeClass({ leftZeroChecked: true }),
                value: __props.li_checked,
                onChange: _cache[2] || (_cache[2] = ($event) => onChange($event, "li")),
                disabled: vue.unref(userCardStore).userCard[0].card_num == 0 ? true : false
              }, {
                default: vue.withCtx(() => {
                  var _a;
                  return [
                    vue.createTextVNode(
                      "礼品卡余额：￥" + vue.toDisplayString((_a = vue.unref(userCardStore).userCard[0]) == null ? void 0 : _a.card_num),
                      1
                      /* TEXT */
                    )
                  ];
                }),
                _: 1
                /* STABLE */
              }, 8, ["value", "disabled"])
            ]),
            vue.createElementVNode("view", { class: "right-block" }, [
              vue.createVNode(_component_van_icon, {
                name: "arrow",
                size: "32rpx",
                color: "#6b6b6b"
              })
            ])
          ]),
          vue.createCommentVNode(' <view class="common-block flex-a">\r\n			<view class="left-block">\r\n				<van-checkbox class="left-zero-checked" shape="square" :value="ba_checked" @change="onChange()">余额：￥0</van-checkbox>\r\n			</view>\r\n		</view> ')
        ]);
      };
    }
  };
  const CreateQuote = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-1ae794bb"], ["__file", "D:/github/app-unis/profilePackge/create-order/components/CreateQuote.vue"]]);
  const _sfc_main$z = {
    __name: "create-order",
    setup(__props) {
      const userStore = useUserStore();
      useOrderStore();
      const addressStore = useAddressStore();
      const cartStore = useCartStore();
      const userCardStore = useUserCardStore();
      const li_checked = vue.ref(false);
      const h_checked = vue.ref(false);
      const payNum = vue.computed(() => {
        let li_num = 0, h_num = 0;
        if (li_checked.value)
          li_num = userCardStore.userCard[0].card_num;
        if (h_checked.value)
          h_num = userCardStore.userCard[1].card_num;
        if (userCardStore.selectedTicket) {
          return cartStore.allRetailPrice - li_num - h_num - userCardStore.selectedTicket.ticket_price;
        } else {
          return cartStore.allRetailPrice - li_num - h_num;
        }
      });
      const is_verify = vue.ref(false);
      const hasPayPassword = () => {
        if (!userStore.userInfo.has_payword) {
          if (li_checked.value) {
            return new Promise((resolve, reject) => {
              Dialog.confirm({
                title: "使用礼品卡必须启用支付密码",
                message: "弹窗内容",
                confirmButtonText: "前往设置"
              }).then(() => {
                formatAppLog("log", "at profilePackge/create-order/create-order.vue:75", 111);
              }).catch(() => {
                resolve(false);
              });
            });
          }
        } else {
          password_show.value = true;
          return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
              if (is_verify.value) {
                resolve(true);
                clearInterval(timer);
              }
            }, 500);
          });
        }
      };
      const show = vue.ref(false);
      const password_show = vue.ref(false);
      const onPayFor = async () => {
        const res = await hasPayPassword();
        if (!res)
          return;
        show.value = true;
      };
      return (_ctx, _cache) => {
        const _component_van_dialog = vue.resolveComponent("van-dialog");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "scroll-order"
            }, [
              vue.createVNode(CreateHeader),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(cartStore).selectedItems, (item, index) => {
                  return vue.openBlock(), vue.createBlock(PackgeItem, {
                    key: index,
                    item,
                    index
                  }, null, 8, ["item", "index"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createCommentVNode(" 优惠券、红包板块 "),
              vue.createVNode(CreateQuote, {
                li_checked: li_checked.value,
                "onUpdate:li_checked": _cache[0] || (_cache[0] = ($event) => li_checked.value = $event),
                h_checked: h_checked.value,
                "onUpdate:h_checked": _cache[1] || (_cache[1] = ($event) => h_checked.value = $event)
              }, null, 8, ["li_checked", "h_checked"]),
              vue.createCommentVNode(" 商品金额信息板块 "),
              vue.createVNode(Discount, {
                li_checked: li_checked.value,
                "onUpdate:li_checked": _cache[2] || (_cache[2] = ($event) => li_checked.value = $event),
                h_checked: h_checked.value,
                "onUpdate:h_checked": _cache[3] || (_cache[3] = ($event) => h_checked.value = $event)
              }, null, 8, ["li_checked", "h_checked"])
            ]),
            vue.createElementVNode("view", { class: "create-order-btm flex" }, [
              vue.createElementVNode(
                "view",
                { class: "pay-price" },
                " 应付:￥" + vue.toDisplayString(vue.unref(payNum).toFixed(2)),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "buy-now",
                  style: vue.normalizeStyle({ backgroundColor: vue.unref(addressStore).addressList ? "#f72430" : "" }),
                  onClick: onPayFor
                },
                " 立即支付 ",
                4
                /* STYLE */
              )
            ]),
            vue.createVNode(PasswordPopup, {
              show: password_show.value,
              "onUpdate:show": _cache[4] || (_cache[4] = ($event) => password_show.value = $event),
              is_verify: is_verify.value,
              "onUpdate:is_verify": _cache[5] || (_cache[5] = ($event) => is_verify.value = $event)
            }, null, 8, ["show", "is_verify"]),
            vue.createVNode(PayPopup, {
              show: show.value,
              "onUpdate:show": _cache[6] || (_cache[6] = ($event) => show.value = $event),
              type: true,
              price: vue.unref(payNum).toFixed(2)
            }, null, 8, ["show", "price"]),
            vue.createVNode(_component_van_dialog, { id: "van-dialog" })
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const ProfilePackgeCreateOrderCreateOrder = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "D:/github/app-unis/profilePackge/create-order/create-order.vue"]]);
  const _sfc_main$y = {
    __name: "OrderDetail",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const orderStore = useOrderStore();
      const addressStore = useAddressStore();
      const cartStore = useCartStore();
      const address = vue.computed(() => addressStore.selectedAddress.address.split(" ").join("") + addressStore.selectedAddress.detail_adrs);
      const phone = vue.computed(() => {
        var _a, _b;
        return ((_a = orderStore.orderItem.contact) == null ? void 0 : _a.slice(0, 3)) + "****" + ((_b = orderStore.orderItem.contact) == null ? void 0 : _b.slice(7));
      });
      const onFinish = async () => {
        cancelFlag.value = true;
        orderStore.updateItem(-1, orderStore.orderItem.order_id);
      };
      const cancelFlag = vue.ref(false);
      const onCancelOrder = () => {
        cancelFlag.value = true;
        orderStore.updateItem(-1, orderStore.orderItem.order_id);
      };
      const onPayOrder = () => {
      };
      onLoad((options) => {
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        const _component_van_count_down = vue.resolveComponent("van-count-down");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "order-detail-box flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, { title: "订单详情" }),
            vue.createElementVNode("scroll-view", {
              class: "order-detail-bd flex-c",
              "scroll-y": "true"
            }, [
              vue.createElementVNode("view", { class: "detail-address-block fff" }, [
                vue.createElementVNode("view", { class: "address-item flex-c" }, [
                  vue.createElementVNode("view", { class: "address" }, [
                    vue.createCommentVNode(" 江西省南昌市新建区白水湖管理处华东交通大学北区 "),
                    vue.createTextVNode(
                      " " + vue.toDisplayString(vue.unref(address)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "phone-name flex" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(vue.unref(orderStore).orderItem.adress_name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(vue.unref(phone)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "change-address" },
                  [
                    vue.createElementVNode("view", { class: "change-item" }, " 修改地址 ")
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, !cancelFlag.value]
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(cartStore).selectedItems, (item, index) => {
                  return vue.openBlock(), vue.createBlock(PackgeItem, {
                    key: index,
                    item,
                    index
                  }, {
                    title: vue.withCtx(() => [
                      vue.createElementVNode(
                        "view",
                        { class: "wait-pay" },
                        vue.toDisplayString(cancelFlag.value ? "已取消" : "待付款"),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["item", "index"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createElementVNode("view", { class: "order-id-block fff flex" }, [
                vue.createElementVNode("view", { class: "id-left flex-c" }, [
                  vue.createElementVNode("text", { class: "id-name" }, [
                    vue.createTextVNode("订单编号："),
                    vue.createElementVNode(
                      "text",
                      { class: "id-value" },
                      vue.toDisplayString(vue.unref(orderStore).orderItem.order_id),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("text", { class: "id-name" }, [
                    vue.createTextVNode("下单时间："),
                    vue.createElementVNode(
                      "text",
                      { class: "id-value" },
                      vue.toDisplayString(vue.unref(orderStore).orderItem.create_time),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "copy-right" }, " 复制 ")
              ]),
              vue.createElementVNode("view", { class: "price-fee fff flex-c" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(orderStore).orderItem.spec, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: vue.normalizeClass([{ all_price: index === 4 }, "item-block flex"]),
                        key: index
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          { class: "item-left" },
                          vue.toDisplayString(item.name) + "：",
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "item-right" },
                          vue.toDisplayString(item.value),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", { class: "recommend" }, [
                vue.createVNode(LoveList, null, {
                  title: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "love-title" }, " 人气推荐 ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              vue.createElementVNode("view", { class: "btm" })
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "order-detail-footer flex-a fff" },
              [
                vue.createElementVNode(
                  "text",
                  null,
                  "实付：￥" + vue.toDisplayString(vue.unref(orderStore).orderItem.pay_price),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "footer-right flex" }, [
                  vue.createElementVNode("view", {
                    class: "cancel-order flex-a common",
                    onClick: onCancelOrder
                  }, " 取消订单 "),
                  vue.createElementVNode("view", {
                    class: "pay-order flex-a common",
                    onClick: onPayOrder
                  }, [
                    vue.createTextVNode(" 付款"),
                    vue.createVNode(_component_van_count_down, {
                      onFinish,
                      time: vue.unref(orderStore).orderItem.remainTime,
                      format: "mm:ss"
                    }, null, 8, ["time"])
                  ])
                ])
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, !cancelFlag.value]
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeOrderDetailOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "D:/github/app-unis/profilePackge/OrderDetail/OrderDetail.vue"]]);
  const _sfc_main$x = {
    __name: "balance",
    setup(__props) {
      const userCardStore = useUserCardStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "balance-block",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(Header, { title: "我的余额" }),
            vue.createElementVNode("view", { class: "balance-bd" }, [
              vue.createElementVNode("view", { class: "balance flex-c-a" }, [
                vue.createElementVNode("view", { class: "balance-top" }, " 余额(元) "),
                vue.createElementVNode("view", { class: "balance-mid flex-c-a" }, [
                  vue.createElementVNode("view", { class: "real-balance" }, [
                    vue.createElementVNode("text", { class: "dollar" }, "￥"),
                    vue.createElementVNode(
                      "text",
                      { class: "price" },
                      vue.toDisplayString(vue.unref(userCardStore).userBalance.num),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "check-detail" }, [
                    vue.createElementVNode("text", null, "查看明细"),
                    vue.createVNode(_component_van_icon, {
                      name: "arrow",
                      size: "24rpx"
                    })
                  ])
                ]),
                vue.createElementVNode("view", { class: "balance-btm" }, [
                  vue.createElementVNode("view", { class: "chorge" }, " 去充值 ")
                ])
              ])
            ]),
            vue.createVNode(LoveList, null, {
              title: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "love-title" }, " 热销好物 ")
              ]),
              _: 1
              /* STABLE */
            })
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeBalanceBalance = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "D:/github/app-unis/profilePackge/balance/balance.vue"]]);
  const useTimeHook = (item) => {
    const DateFormat = (date) => {
      return date.split(" ")[0].split("/").join(".") + " " + date.split(" ")[1].substring(0, 5);
    };
    const startEnd = vue.computed(() => DateFormat(item.get_time) + "-" + DateFormat(item.out_time));
    const validTime = vue.computed(() => {
      let time = /* @__PURE__ */ new Date();
      return new Date(item.out_time).getTime() - time.getTime();
    });
    const surplusTime = vue.computed(() => Math.ceil(validTime.value / (1e3 * 60 * 60 * 24)));
    return {
      startEnd,
      validTime,
      surplusTime
    };
  };
  const _sfc_main$w = {
    __name: "RedTicketItem",
    props: {
      isUse: {
        type: Boolean,
        default: false
      },
      isSuit: {
        type: Boolean,
        default: true
      },
      isSelected: {
        type: Boolean,
        default: false
      },
      tickets: {
        type: Object,
        default: {}
      },
      dateFormat: {
        type: Boolean,
        default: true
      }
      // condition: {
      // }
    },
    setup(__props) {
      const props = __props;
      const { startEnd, validTime, surplusTime } = useTimeHook(props.tickets);
      const isTap = vue.ref(false);
      const onShowMore = () => {
        if (!props.isSuit)
          return;
        isTap.value = !isTap.value;
      };
      const color = vue.computed(() => props.isSuit ? "#e11c20" : "#7d837e");
      return (_ctx, _cache) => {
        const _component_van_count_down = vue.resolveComponent("van-count-down");
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "red-ticket-block" }, [
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "is_selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, __props.isSelected]
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "ticket-top flex-a",
              style: vue.normalizeStyle({ backgroundColor: __props.isSuit ? "#ef656b" : "#b8bcc3" })
            },
            [
              vue.createElementVNode(
                "view",
                { class: "price" },
                vue.toDisplayString(__props.tickets.ticket_price) + "元 ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "ticket" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "date-out",
                    style: vue.normalizeStyle({ backgroundColor: vue.unref(color), display: __props.tickets.sign == 1 ? "" : "none", borderColor: vue.unref(color) })
                  },
                  " 即将过期 ",
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "name-condition" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(__props.tickets.ticket_name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "condition" },
                    vue.toDisplayString(__props.tickets.condition_name),
                    1
                    /* TEXT */
                  )
                ]),
                __props.dateFormat ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "date"
                }, [
                  vue.createVNode(_component_van_count_down, {
                    time: vue.unref(validTime),
                    format: "DD天HH 时"
                  }, null, 8, ["time"])
                ])) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "forbid-date"
                  },
                  vue.toDisplayString(vue.unref(startEnd)) + ";还有" + vue.toDisplayString(vue.unref(surplusTime)) + "天过期 ",
                  1
                  /* TEXT */
                ))
              ]),
              vue.createElementVNode("view", { class: "to-use" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "btn-use",
                    style: vue.normalizeStyle({ display: __props.isUse ? "" : "none" })
                  },
                  " 去使用 ",
                  4
                  /* STYLE */
                )
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", {
            class: "more-detail flex",
            onClick: onShowMore
          }, [
            !isTap.value ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "more-text"
              },
              vue.toDisplayString(__props.isSuit ? "适用商品" : "参与优惠金额小于红包门槛"),
              1
              /* TEXT */
            )) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "more-text"
            }, " 休闲时尚、运动休闲、复古、休闲、居家生活、现代简约、美式、日式、时尚、通用、百搭、通勤、简约、简约时尚、基础休闲、IFASHION ")),
            vue.createVNode(_component_van_icon, {
              name: isTap.value ? "arrow-up" : "arrow-down",
              class: "arrow-up-down",
              size: "28rpx"
            }, null, 8, ["name"])
          ])
        ]);
      };
    }
  };
  const RedTicketItem = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-c3861cb3"], ["__file", "D:/github/app-unis/profilePackge/redPacket/components/RedTicketItem.vue"]]);
  const getTicketListAPI = () => {
    return http({
      url: "/tickets"
    });
  };
  const getExchangeTicketAPI = () => {
    return http({
      url: "/tickets/sign"
    });
  };
  const getTicketInfoAPI = (id) => {
    return http({
      url: "/ticket",
      data: {
        id
      }
    });
  };
  const updateExchangeTicketAPI = ({ id, status, get_time }) => {
    return http({
      url: "/put/sign",
      method: "PUT",
      data: {
        id,
        status,
        get_time
      }
    });
  };
  const _sfc_main$v = {
    __name: "redPacket",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const ticketList = vue.ref([]);
      const getTicketList = async () => {
        const res = await getTicketListAPI();
        ticketList.value = res.data;
      };
      onLoad((options) => {
        getTicketList();
      });
      return (_ctx, _cache) => {
        const _component_van_tab = vue.resolveComponent("van-tab");
        const _component_van_tabs = vue.resolveComponent("van-tabs");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "header-ticket-quote flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(Header, {
              title: "红包",
              middle: true
            }),
            vue.createElementVNode("view", { class: "header-tab" }, [
              vue.createVNode(_component_van_tabs, {
                animated: "",
                swipeable: ""
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(ticketList.value, (item, index) => {
                      return vue.openBlock(), vue.createBlock(_component_van_tab, {
                        title: item == null ? void 0 : item.name,
                        key: index
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("scroll-view", {
                            "scroll-y": "true",
                            class: "scroll-ticket-quote"
                          }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item == null ? void 0 : item.value, (subItem, index2) => {
                                return vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  {
                                    key: subItem.user_ticket_id
                                  },
                                  [
                                    vue.createVNode(RedTicketItem, {
                                      tickets: subItem,
                                      isSuit: subItem.ticket_status == 0
                                    }, null, 8, ["tickets", "isSuit"]),
                                    vue.createCommentVNode(" <quote-item></quote-item> ")
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                );
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["title"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeRedPacketRedPacket = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "D:/github/app-unis/profilePackge/redPacket/redPacket.vue"]]);
  const _sfc_main$u = {
    __name: "choose-ticket",
    setup(__props) {
      const userCardStore = useUserCardStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const selectedItem = (item) => {
        userCardStore.tapSelected(item);
      };
      const unuseTicket = () => {
        userCardStore.unUseTicket();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "choose-ticket-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(__easycom_0, { title: "选择红包" }),
            vue.createElementVNode("view", { class: "choose-ticket-bd flex-c" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-y": "true",
                class: "scroll-ticket"
              }, [
                vue.createElementVNode("view", { class: "suit-ticket" }, [
                  vue.unref(userCardStore).effectiveTickets.length ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(vue.unref(userCardStore).effectiveTickets, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "item",
                        onClick: ($event) => selectedItem(item),
                        key: item.ticket_id
                      }, [
                        vue.createVNode(RedTicketItem, {
                          dateFormat: false,
                          tickets: item,
                          isUse: false,
                          isSelected: item.selected
                        }, null, 8, ["tickets", "isSelected"])
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("view", { class: "unsuit-ticket flex-c" }, [
                  vue.createElementVNode("view", { class: "unsuit-title flex" }, [
                    vue.createElementVNode("text", { class: "line" }, "——"),
                    vue.createElementVNode("text", { class: "title-text" }, "以下此订单不适用"),
                    vue.createElementVNode("text", { class: "line" }, "——")
                  ]),
                  vue.createElementVNode("view", { class: "unsuit-item-block" }, [
                    vue.unref(userCardStore).uselessTickets.length ? (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      vue.renderList(vue.unref(userCardStore).uselessTickets, (item) => {
                        return vue.openBlock(), vue.createBlock(RedTicketItem, {
                          key: item.ticket_id,
                          dateFormat: false,
                          tickets: item,
                          isUse: false,
                          isSuit: false
                        }, null, 8, ["tickets"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ])
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "unuse-ticket-block",
                style: vue.normalizeStyle({ marginBottom: vue.unref(safeAreaInsets).bottom + "px" })
              },
              [
                vue.createElementVNode("view", {
                  class: "unuse-ticket fff",
                  onClick: unuseTicket
                }, " 不使用红包 ")
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeChooseTicketChooseTicket = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "D:/github/app-unis/profilePackge/choose-ticket/choose-ticket.vue"]]);
  const _sfc_main$t = {
    __name: "card",
    setup(__props) {
      const userCardStore = useUserCardStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const sign = vue.ref(1);
      const title = vue.computed(() => sign.value == 1 ? "礼品卡" : "提货卡");
      const onTap = (val) => {
        sign.value = val;
      };
      const toDetail = () => {
        uni.navigateTo({
          url: "/subpkg/balance-detail/balance-detail"
        });
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "card-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(Header, {
              title: vue.unref(title) + "-网易严选",
              middle: false
            }, null, 8, ["title"]),
            vue.createElementVNode("view", { class: "card-tab flex-c" }, [
              vue.createElementVNode("view", { class: "tabs flex" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(userCardStore).userCard, (item) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "tabs-item",
                      onClick: ($event) => onTap(item.card_sign),
                      key: item.card_sign
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass(["item", { active_border: sign.value == item.card_sign }])
                        },
                        vue.toDisplayString(item.card_name),
                        3
                        /* TEXT, CLASS */
                      )
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createCommentVNode(' <view class="tabs-item" @tap="onTap(1)">\r\n					<text class="item" :class="{ active_border: !flag }">提货卡</text>\r\n				</view> ')
              ]),
              vue.createElementVNode("view", { class: "tab-content" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "card-total flex-c-a",
                    style: vue.normalizeStyle({ backgroundColor: sign.value == 1 ? "#a92d2b" : "#ad782d" })
                  },
                  [
                    vue.createElementVNode("view", { class: "total-top flex" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "total-title" },
                        vue.toDisplayString(vue.unref(title)) + "余额 ",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", {
                        class: "total-right",
                        onClick: toDetail
                      }, [
                        vue.createTextVNode(" 交易记录"),
                        vue.createVNode(_component_van_icon, {
                          name: "arrow",
                          size: "24rpx"
                        })
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "total-mid" }, [
                      vue.createTextVNode(" ￥"),
                      vue.createElementVNode("text", { class: "mid-price" }, "0.90")
                    ]),
                    vue.createElementVNode("view", { class: "total-btm" }, [
                      vue.createElementVNode("view", { class: "safety" }, " 支付安全 ")
                    ])
                  ],
                  4
                  /* STYLE */
                ),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(userCardStore).userCard, (item) => {
                    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("scroll-view", {
                      "scroll-y": "true",
                      class: "electron-card flex-c",
                      key: item.card_sign
                    }, [
                      item.children ? (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        vue.renderList(item.children, (subItem) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            key: subItem.change_id,
                            class: "electrion-item fff flex-c"
                          }, [
                            vue.createElementVNode("view", { class: "item-top flex" }, [
                              vue.createElementVNode("text", { class: "item-left" }, "电子卡"),
                              vue.createElementVNode(
                                "text",
                                { class: "item-right" },
                                "余额￥" + vue.toDisplayString(subItem.change_num),
                                1
                                /* TEXT */
                              )
                            ]),
                            vue.createElementVNode("view", { class: "item-btm flex" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "item-left" },
                                vue.toDisplayString(subItem.show_id),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("text", { class: "item-right" }, "有效期至 2024.11.8")
                            ])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )) : vue.createCommentVNode("v-if", true)
                    ])), [
                      [vue.vShow, sign.value == item.card_sign]
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "add-card-btm",
                style: vue.normalizeStyle({ marginBottom: vue.unref(safeAreaInsets).bottom + "px" })
              },
              [
                vue.createElementVNode("view", { class: "add-card-block" }, [
                  vue.createElementVNode("text", null, "+"),
                  vue.createElementVNode(
                    "text",
                    null,
                    "添加" + vue.toDisplayString(vue.unref(title)),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeCardCard = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__file", "D:/github/app-unis/profilePackge/card/card.vue"]]);
  const _sfc_main$s = {
    __name: "error-result",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "error-box flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, {
              title: "支付结果",
              middle: true
            }),
            vue.createElementVNode("view", { class: "result-body flex-c" }, [
              vue.createElementVNode("view", { class: "result-text" }, [
                vue.createElementVNode("view", { class: "error-pay" }, " 支付失败 "),
                vue.createElementVNode("view", { class: "error-delay flex-c" }, [
                  vue.createElementVNode("text", null, [
                    vue.createTextVNode("请在"),
                    vue.createElementVNode("text", { class: "err" }, "1小时"),
                    vue.createTextVNode("内完成付款")
                  ]),
                  vue.createElementVNode("text", { class: "err" }, "否则订单会被系统取消")
                ])
              ]),
              vue.createElementVNode("view", { class: "show-repay flex" }, [
                vue.createElementVNode("view", { class: "block check-order" }, " 查看订单 "),
                vue.createElementVNode("view", { class: "block re-pay" }, " 重新支付 ")
              ]),
              vue.createElementVNode("view", { class: "pay-detail flex-c" }, [
                vue.createElementVNode("view", { class: "addres-user flex" }, [
                  vue.createElementVNode("text", { class: "text" }, "工藤新一"),
                  vue.createElementVNode("text", { class: "price" }, "139****4611")
                ]),
                vue.createElementVNode("view", { class: "addres-detail flex" }, " 北京市北京市大兴区北京经济技术开发区京东 "),
                vue.createElementVNode("view", { class: "should-pay flex" }, [
                  vue.createElementVNode("text", { class: "text" }, "实付:"),
                  vue.createElementVNode("text", { class: "price" }, "￥88.00")
                ])
              ])
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeErrorResultErrorResult = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "D:/github/app-unis/profilePackge/error-result/error-result.vue"]]);
  const getCardDetailAPI = (type) => {
    return http({
      url: "/card/detail",
      data: {
        type
      }
    });
  };
  const _sfc_main$r = {
    __name: "balance-detail",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const cardList = vue.ref([]);
      const getCardList = async () => {
        const res = await getCardDetailAPI(1);
        cardList.value = res.data;
        formatAppLog("log", "at profilePackge/balance-detail/balance-detail.vue:45", cardList.value);
      };
      vue.onMounted(() => {
        getCardList();
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "ba-detail-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, { title: "网易严选-以严谨的态度..." }, null, 8, ["title"]),
            vue.createElementVNode("view", { class: "ba-detail-body" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(cardList.value, (item) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "detail-item-block flex-c",
                    key: item.change_id
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item-date" },
                      vue.toDisplayString(item.change_time),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "item-detail fff flex" }, [
                      vue.createElementVNode("view", { class: "item-left flex-c" }, [
                        vue.createElementVNode("view", { class: "item-card flex-a" }, [
                          vue.createElementVNode("text", { class: "name" }, "卡号:"),
                          vue.createElementVNode(
                            "text",
                            { class: "id" },
                            vue.toDisplayString(item.show_id),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "item-order flex-a" }, [
                          vue.createElementVNode("text", { class: "name" }, "订单:"),
                          vue.createElementVNode("text", { class: "id" }, "--")
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "item-right flex" }, [
                        vue.createElementVNode("view", { class: "item-name flex-c" }, [
                          vue.createElementVNode("text", null, "充值"),
                          vue.createElementVNode("text", { class: "btm" }, "余额")
                        ]),
                        vue.createElementVNode("view", { class: "item-change flex-c" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "sign" },
                            vue.toDisplayString(item.change_type == 1 ? "+" : "-") + vue.toDisplayString(item.change_num),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "btm" },
                            vue.toDisplayString(item.change_num),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeBalanceDetailBalanceDetail = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "D:/github/app-unis/profilePackge/balance-detail/balance-detail.vue"]]);
  const _sfc_main$q = {
    __name: "ProfileSafe",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const list = vue.ref([
        { name: "修改支付密码" },
        { name: "忘记支付密码" },
        { name: "开启/关闭个性化推荐" }
      ]);
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "safe-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, { title: "账号安全-网易严选" }),
            vue.createElementVNode("view", { class: "safe-body" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                vue.renderList(list.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "safe-item flex-a fff",
                    key: index
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item-left" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "item-right" }, [
                      vue.createVNode(_component_van_icon, {
                        name: "arrow",
                        size: "32rpx"
                      })
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const ProfilePackgeProfileSafeProfileSafe = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "D:/github/app-unis/profilePackge/ProfileSafe/ProfileSafe.vue"]]);
  const useGiftHook = () => {
    const randomList = vue.computed(() => {
      let arr = [10, 30, 60];
      for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
      }
      return arr;
    });
    return {
      randomList
    };
  };
  const WHITE = "#fff";
  const defaultOptions = {
    selector: "#van-notify",
    type: "danger",
    message: "",
    background: "",
    duration: 3e3,
    zIndex: 110,
    top: 0,
    color: WHITE,
    safeAreaInsetTop: false,
    onClick: () => {
    },
    onOpened: () => {
    },
    onClose: () => {
    }
  };
  let currentOptions = Object.assign({}, defaultOptions);
  function parseOptions(message) {
    if (message == null) {
      return {};
    }
    return typeof message === "string" ? { message } : message;
  }
  function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  }
  function Notify(options) {
    options = Object.assign(Object.assign({}, currentOptions), parseOptions(options));
    const context = options.context || getContext();
    const notify = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (notify) {
      notify.setData(options);
      notify.show();
      return notify;
    }
    formatAppLog("warn", "at wxcomponents/vant/notify/notify.js:38", "未找到 van-notify 节点，请确认 selector 及 context 是否正确");
  }
  Notify.clear = function(options) {
    options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
    const context = options.context || getContext();
    const notify = context.selectComponent(options.selector);
    if (notify) {
      notify.hide();
    }
  };
  Notify.setDefaultOptions = (options) => {
    Object.assign(currentOptions, options);
  };
  Notify.resetDefaultOptions = () => {
    currentOptions = Object.assign({}, defaultOptions);
  };
  const updateIntegralAPI = ({ type, count, sum, date }) => {
    return http({
      url: "/integral",
      method: "POST",
      data: {
        type,
        count,
        sum,
        date
      }
    });
  };
  const getUserIntegralAPI = () => {
    return http({
      url: "/integral"
    });
  };
  const getIntegralChangeAPI = () => {
    return http({
      url: "/integral/change"
    });
  };
  const _sfc_main$p = {
    __name: "integral",
    setup(__props) {
      const userStore = useUserStore();
      const giftHook = useGiftHook();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const toDetail = (type) => {
        uni.navigateTo({
          url: `/integralPackge/integral-detail/integral-detail?type=${type}`
        });
      };
      let flag = true;
      const onTapGift = async (val) => {
        if (!flag)
          return;
        flag = false;
        const nowTime = /* @__PURE__ */ new Date();
        if (integralInfo.value.sign_date) {
          const signTime = new Date(Number(integralInfo.value.sign_date)).getDate();
          if (nowTime.getDate() <= signTime) {
            uni.showToast({
              icon: "error",
              title: "今天您已经签到过了"
            });
            flag = true;
            return;
          }
        } else {
          val = 60;
        }
        await updateIntegralAPI(1, val, integralInfo.value.integral + val, nowTime.getTime());
        Notify({
          type: "success",
          message: `签到获得${val}积分`,
          duration: 2e3
        });
        getUserIntegral();
        flag = true;
      };
      const toTicketDetail = (id, val) => {
        uni.navigateTo({ url: `/integralPackge/integral-packet/integral-packet?id=${id}&integral=${val}` });
      };
      const integralInfo = vue.ref([]);
      const getUserIntegral = async () => {
        const res = await getUserIntegralAPI();
        integralInfo.value = res.result;
      };
      const ticketList = vue.ref([]);
      const getRedTicketList = async () => {
        const res = await getExchangeTicketAPI();
        ticketList.value = res.result;
      };
      onLoad(() => {
        Promise.all([getUserIntegral(), getRedTicketList()]);
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_notify = vue.resolveComponent("van-notify");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 积分乐园 "),
            vue.createElementVNode(
              "view",
              {
                class: "integral-top",
                style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
              },
              [
                vue.createVNode(_component_CustomHeader, {
                  title: "积分中心",
                  middle: true
                }),
                vue.createElementVNode("view", { class: "user-info flex-a" }, [
                  vue.createElementVNode("view", { class: "info-left flex-a" }, [
                    vue.createElementVNode("image", {
                      src: vue.unref(userStore).userInfo.avator,
                      class: "avator-image"
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "left-name flex-c" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(vue.unref(userStore).userInfo.nickname),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", {
                        class: "integral",
                        onClick: _cache[0] || (_cache[0] = ($event) => toDetail(1))
                      }, [
                        vue.createTextVNode(
                          " 积分:" + vue.toDisplayString(integralInfo.value.integral),
                          1
                          /* TEXT */
                        ),
                        vue.createVNode(_component_van_icon, { name: "arrow" })
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "detail-right",
                    onClick: _cache[1] || (_cache[1] = ($event) => toDetail(1))
                  }, " 积分明细 ")
                ])
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "integral-mid flex-c fff" }, [
              vue.createElementVNode("view", { class: "mid-title" }, " 随机签到领积分 "),
              vue.createElementVNode("view", { class: "mid-item-block flex" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(giftHook).randomList.value, (item) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "mid-item flex-c-a",
                      key: item,
                      onClick: ($event) => onTapGift(item)
                    }, [
                      vue.createElementVNode("image", {
                        src: "https://yanxuan.nosdn.127.net/static-union/165657439481e369.png",
                        class: "mid-item-image"
                      }),
                      vue.createElementVNode("view", { class: "item-text" }, " 赚积分 "),
                      vue.createElementVNode("view", { class: "item-text-tap" }, " 点击签到赚积分 ")
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("view", { class: "item-block flex-c fff" }, [
              vue.createElementVNode("view", { class: "item-header flex-a" }, [
                vue.createElementVNode("view", { class: "title" }, " 积分兑好礼 "),
                vue.createElementVNode("view", {
                  class: "change-detail",
                  onClick: _cache[2] || (_cache[2] = ($event) => toDetail(2))
                }, " 兑换明细 ")
              ]),
              vue.createElementVNode("view", { class: "item-main flex" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(ticketList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item flex-c-a",
                      key: index,
                      onClick: ($event) => toTicketDetail(item.ticket_id, integralInfo.value.integral)
                    }, [
                      vue.createElementVNode("image", {
                        src: "https://yanxuan.nosdn.127.net/4333b709fac8932bbf86a48ebb022e34.png?type=webp&imageView&thumbnail=160x160&quality=75",
                        class: "item-image"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "pack-name" },
                        vue.toDisplayString(item.ticket_name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "integral-num" },
                        vue.toDisplayString(item.is_exchange) + "积分兑",
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createCommentVNode(" 在页面内添加对应的节点 "),
            vue.createVNode(_component_van_notify, { id: "van-notify" })
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const ProfilePackgeIntegralIntegral = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "D:/github/app-unis/profilePackge/integral/integral.vue"]]);
  const getSubcateListAPI = (val) => {
    return http({
      url: "/subcate",
      data: {
        id: val.id,
        f_parentId: val.parent_id
      }
    });
  };
  const _sfc_main$o = {
    __name: "subCate",
    setup(__props) {
      const title = vue.ref("标题");
      const top = vue.ref();
      const toBack = () => {
        uni.navigateBack();
      };
      const subcateList = vue.ref([]);
      const getSubCateList = async (data) => {
        const res = await getSubcateListAPI(data);
        subcateList.value = res.result;
      };
      const goodsId = vue.ref();
      const onSwitchTab = (item, index) => {
        goodsId.value = item.id;
      };
      onLoad((options) => {
        goodsId.value = options.goods_id;
        title.value = options.title;
        useMiddle(".subcate-header-top").then((res) => {
          top.value = res.top;
        });
        getSubCateList({ ...options });
      });
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "subcate-block flex-c" }, [
          vue.createElementVNode(
            "view",
            {
              class: "subcate-header",
              style: vue.normalizeStyle({ paddingTop: top.value + "px" })
            },
            [
              vue.createElementVNode("view", { class: "subcate-header-top flex" }, [
                vue.createElementVNode("view", {
                  class: "title-left",
                  onClick: toBack
                }, [
                  vue.createVNode(_component_van_icon, { name: "arrow-left" })
                ]),
                vue.createCommentVNode(" 二级分类标题 "),
                vue.createElementVNode(
                  "view",
                  { class: "title" },
                  vue.toDisplayString(title.value),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 三级分类栏 "),
              vue.createElementVNode("view", { class: "submit-header-btm" }, [
                vue.createElementVNode("scroll-view", {
                  class: "scroll-x-block",
                  "scroll-x": "true",
                  "scroll-left": ""
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(subcateList.value, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: vue.normalizeClass(["third-cate-title", { border_btm: goodsId.value == item.id }]),
                        key: item.id,
                        onClick: ($event) => onSwitchTab(item)
                      }, vue.toDisplayString(item.name), 11, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createCommentVNode(" 三级分类内容项 "),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "scroll-y-block",
            "enable-flex": "true",
            "scroll-with-animation": "true"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(subcateList.value, (item, index) => {
                return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
                  class: "second-cate-block flex-c",
                  key: item.id
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "second-cate-title flex-a" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" 三级分类item "),
                  vue.createElementVNode("view", { class: "third-cate-block flex" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item.children, (subItem, i) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "third-cate-item",
                          key: subItem.goods_id
                        }, [
                          vue.createVNode(GoodsItem, { goodsItem: subItem }, null, 8, ["goodsItem"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])), [
                  [vue.vShow, goodsId.value == item.id]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const CatepkgSubCateSubCate = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "D:/github/app-unis/catepkg/subCate/subCate.vue"]]);
  const _sfc_main$n = {
    __name: "login",
    setup(__props) {
      const top = vue.ref(0);
      const isAgree = vue.ref(false);
      const isRegister = vue.ref(false);
      const userStore = useUserStore();
      const userCardStore = useUserCardStore();
      const cartStore = useCartStore();
      const toRegister = () => {
        isRegister.value = !isRegister.value;
        formData.value = {};
      };
      const formData = vue.ref({
        acconut: "",
        password: ""
      });
      const oncheck = () => {
        isAgree.value = !isAgree.value;
      };
      const handleSubmit = () => {
        if (!isAgree.value) {
          uni.showToast({
            icon: "success",
            title: "请同意协议"
          });
          return;
        }
        if (isRegister.value) {
          uni.request({
            url: "/register",
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            data: {
              account: formData.value.acconut,
              password: formData.value.password
            },
            success: (res) => {
              formatAppLog("log", "at indexpkg/login/login.vue:106", res);
              if (res.data.status === "200") {
                uni.showToast({
                  icon: "success",
                  title: "注册成功"
                });
              }
            }
          });
        } else {
          uni.request({
            url: "/login",
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            data: {
              account: formData.value.acconut,
              password: formData.value.password
            },
            success: (result) => {
              if (result.data.status === "200") {
                const { data: res } = result;
                userStore.setUserInfo(res.data);
                uni.showToast({
                  icon: "success",
                  title: "登录成功"
                });
                cartStore.getCartList();
                userCardStore.getUserCardInfo(res.data.user_id);
                setTimeout(() => {
                  uni.switchTab({
                    url: "/pages/profile/profile"
                  });
                }, 500);
              }
            }
          });
        }
      };
      onLoad(() => {
        useMiddle(".login-header").then((data) => top.value = data.top);
      });
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_uni_forms_item = vue.resolveComponent("uni-forms-item");
        const _component_uni_forms = vue.resolveComponent("uni-forms");
        return vue.openBlock(), vue.createElementBlock("view", { class: "login-box" }, [
          vue.createElementVNode(
            "header",
            {
              class: "login-header flex",
              style: vue.normalizeStyle({ paddingTop: top.value + "px" })
            },
            [
              vue.createElementVNode("view", { class: "h-left" }, [
                vue.createElementVNode("navigator", { url: "/pages/index/index" }, [
                  vue.createVNode(_component_van_icon, {
                    name: "home-o",
                    size: "36rpx"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "h-mid" }, [
                vue.createElementVNode("navigator", { url: "/pages/index/index" }, "网易严选")
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "body flex-c" }, [
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode("view", { class: "img-logo" }, [
                vue.createElementVNode("image", {
                  class: "content-image",
                  src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
                })
              ]),
              vue.createElementVNode("view", { class: "login-info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "titles" },
                  vue.toDisplayString(isRegister.value ? "免费注册" : "欢迎登录"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "login-register-block flex-c" }, [
                  vue.createVNode(
                    _component_uni_forms,
                    {
                      ref: "form",
                      modelValue: "formData"
                    },
                    {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "form-item-login" }, [
                          vue.createVNode(_component_uni_forms_item, null, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", { class: "item-input" }, [
                                vue.withDirectives(vue.createElementVNode(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.acconut = $event),
                                    placeholder: "请输入您的账号"
                                  },
                                  null,
                                  512
                                  /* NEED_PATCH */
                                ), [
                                  [vue.vModelText, formData.value.acconut]
                                ])
                              ])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        vue.createElementVNode("view", { class: "form-item-login" }, [
                          vue.createVNode(_component_uni_forms_item, { class: "form-item" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", { class: "item-input" }, [
                                vue.withDirectives(vue.createElementVNode(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.password = $event),
                                    placeholder: "请输入您的密码"
                                  },
                                  null,
                                  512
                                  /* NEED_PATCH */
                                ), [
                                  [vue.vModelText, formData.value.password]
                                ])
                              ])
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    },
                    512
                    /* NEED_PATCH */
                  ),
                  vue.createElementVNode("view", { class: "not-reg flex-a" }, [
                    vue.createElementVNode("view", { class: "not item" }, " 忘记密码 "),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "reg item",
                        onClick: toRegister
                      },
                      vue.toDisplayString(isRegister.value ? "去登陆" : "免费注册"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "agree flex-a" }, [
                    vue.createElementVNode("view", { class: "radio" }, [
                      vue.createElementVNode("checkbox", { onClick: oncheck })
                    ]),
                    vue.createTextVNode(" 我已阅读并同意用户协议和隐私协议 ")
                  ]),
                  vue.createElementVNode("view", { class: "submit-block" }, [
                    vue.createElementVNode(
                      "button",
                      {
                        onClick: handleSubmit,
                        class: "btn-login-reg"
                      },
                      vue.toDisplayString(isRegister.value ? "注册" : "登录"),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const IndexpkgLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "D:/github/app-unis/indexpkg/login/login.vue"]]);
  const _sfc_main$m = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "hot-cate" }, [
      vue.createElementVNode("view", { class: "title" }, " 热门分类 "),
      vue.createElementVNode("view", { class: "hot-cate-list flex" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(7, (l) => {
            return vue.createElementVNode("view", {
              class: "hot-cate-item flex-c-a",
              key: l
            }, [
              vue.createElementVNode("image", {
                class: "hot-cate-image",
                src: "https://yanxuan.nosdn.127.net/559d2a240ec20b096590a902217009ff.png"
              }),
              vue.createElementVNode("view", { class: "name" }, " 肉类零食 ")
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const HotCate = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$3], ["__scopeId", "data-v-ab409703"], ["__file", "D:/github/app-unis/indexpkg/search/components/HotCate.vue"]]);
  const _sfc_main$l = {
    __name: "HotSearch",
    props: ["title", "list", "item"],
    emits: ["itemChange"],
    setup(__props, { emit: emits }) {
      const onTapItem = (item) => {
        emits("itemChange", item);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "hot-search flex-c" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createTextVNode(
              vue.toDisplayString(__props.title) + " ",
              1
              /* TEXT */
            ),
            vue.renderSlot(_ctx.$slots, "delete", {}, void 0, true)
          ]),
          vue.createElementVNode("view", { class: "hot-search-list flex" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.list, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "hot-search-item",
                  key: item,
                  onClick: ($event) => onTapItem(item)
                }, vue.toDisplayString(item), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const HotSearch = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-c2c8f5f9"], ["__file", "D:/github/app-unis/indexpkg/search/components/HotSearch.vue"]]);
  const _sfc_main$k = {
    __name: "SearchTab",
    setup(__props) {
      const lowerOrupper = vue.ref(false);
      const types = vue.inject("type");
      const reSortList = (val) => {
        if (val == "price") {
          lowerOrupper.value ? types.value = 3 : types.value = 2;
          lowerOrupper.value = !lowerOrupper.value;
        } else {
          types.value = val;
        }
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "search-tabs flex fixed" }, [
          vue.createElementVNode(
            "view",
            {
              class: "tab-item-block flex-a",
              onClick: _cache[0] || (_cache[0] = ($event) => reSortList(1)),
              style: vue.normalizeStyle({ color: vue.unref(types) == 1 ? "#a02f40" : "" })
            },
            " 综合 ",
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", {
            class: "tab-item-block flex-a",
            onClick: _cache[1] || (_cache[1] = ($event) => reSortList("price"))
          }, [
            vue.createElementVNode(
              "text",
              {
                style: vue.normalizeStyle({ color: vue.unref(types) == 2 ? "#a02f40" : vue.unref(types) == 3 ? "#a02f40" : "" })
              },
              "价格",
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "top-btm flex-c" }, [
              vue.createVNode(_component_van_icon, {
                name: "arrow-up",
                size: "24rpx",
                color: vue.unref(types) == 2 ? "#a02f40" : "",
                class: "icon-up"
              }, null, 8, ["color"]),
              vue.createVNode(_component_van_icon, {
                name: "arrow-down",
                size: "24rpx",
                color: vue.unref(types) == 3 ? "#a02f40" : "",
                class: "icon-down"
              }, null, 8, ["color"])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "tab-item-block flex-a",
              onClick: _cache[2] || (_cache[2] = ($event) => reSortList(4)),
              style: vue.normalizeStyle({ color: vue.unref(types) == 4 ? "#a02f40" : "" })
            },
            " 销量 ",
            4
            /* STYLE */
          )
        ]);
      };
    }
  };
  const SearchTab = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-2603f7bd"], ["__file", "D:/github/app-unis/indexpkg/search/components/SearchTab.vue"]]);
  const _sfc_main$j = {
    __name: "SearchDetail",
    props: ["list"],
    setup(__props) {
      uni.getSystemInfoSync();
      return (_ctx, _cache) => {
        return __props.list.length ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
          key: 0,
          "scroll-y": "true",
          class: "detail-bd flex-c"
        }, [
          vue.createVNode(SearchTab),
          vue.createElementVNode("view", { class: "search-item-block flex" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "goods-item",
                  key: index
                }, [
                  vue.createVNode(GoodsItem, { goodsItem: item }, null, 8, ["goodsItem"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "no-result flex-c-a"
        }, [
          vue.createElementVNode("view", { class: "bgc" }),
          vue.createElementVNode("text", null, "您寻找的商品还未上架")
        ]));
      };
    }
  };
  const SearchDetail = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-26f1db71"], ["__file", "D:/github/app-unis/indexpkg/search/SearchDetail.vue"]]);
  const useSearchStore = defineStore("search", () => {
    const searchList = vue.ref([]);
    const addSearchItem = (val) => {
      const index = searchList.value.findIndex((i) => i == val);
      if (index != -1) {
        searchList.value.splice(index, 1);
      }
      searchList.value.unshift(val);
    };
    return {
      searchList,
      addSearchItem
    };
  }, {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        }
      }
    }
  });
  const getSearchResultAPI = (name, type) => {
    return http({
      url: "/search",
      method: "GET",
      data: {
        name,
        type
      }
    });
  };
  const _sfc_main$i = {
    __name: "search",
    setup(__props) {
      const searchStore = useSearchStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const type = vue.ref(1);
      vue.provide("type", type);
      vue.watch(type, (type2, preType) => {
        if (type2 != preType) {
          getSearchResultList();
        }
      });
      const searchValue = vue.ref("");
      const onTapRight = () => {
        if (searchValue.value.length == 0) {
          uni.navigateBack();
        } else {
          searchStore.addSearchItem(searchValue.value);
          getSearchResultList();
        }
      };
      const onItemChange = (val) => {
        searchValue.value = val;
        searchStore.addSearchItem(val);
        getSearchResultList();
      };
      const show = vue.ref(true);
      const onChange = (e) => {
        searchValue.value = e.detail;
        if (searchValue.value == "") {
          show.value = true;
        }
      };
      const searchResult = vue.ref([]);
      const getSearchResultList = async () => {
        uni.showLoading({ mask: true });
        const res = await getSearchResultAPI(searchValue.value, type.value);
        searchResult.value = res.list;
        show.value = false;
        uni.hideLoading();
      };
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        const _component_van_search = vue.resolveComponent("van-search");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "search-box flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createElementVNode("view", { class: "top-search" }, [
              vue.createVNode(_component_CustomHeader, { title: "搜索" }),
              vue.createElementVNode("view", { class: "search-block flex-a" }, [
                vue.createElementVNode("view", { class: "search" }, [
                  vue.createVNode(_component_van_search, {
                    onChange,
                    value: searchValue.value,
                    shape: "round",
                    "use-left-icon-slot": true,
                    placeholder: "请输入搜索关键词"
                  }, null, 8, ["value"])
                ]),
                vue.createElementVNode(
                  "text",
                  {
                    class: "cancel",
                    onClick: onTapRight
                  },
                  vue.toDisplayString(searchValue.value.length ? "搜索" : "取消"),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "scroll-search",
                style: vue.normalizeStyle({ height: `calc(100vh - 200rpx - ${vue.unref(safeAreaInsets).top}px)` })
              },
              [
                show.value ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode("view", { class: "search-body flex-c" }, [
                      vue.createCommentVNode(" 搜索历史板块 "),
                      vue.createVNode(HotSearch, {
                        title: "搜索历史",
                        list: vue.unref(searchStore).searchList,
                        item: searchValue.value,
                        onItemChange
                      }, null, 8, ["list", "item"]),
                      vue.createCommentVNode(" 热门搜索板块 "),
                      vue.createVNode(HotSearch, {
                        title: "热门搜索",
                        item: searchValue.value
                      }, null, 8, ["item"])
                    ]),
                    vue.createCommentVNode(" 热门分类板块 "),
                    vue.createVNode(HotCate)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (vue.openBlock(), vue.createBlock(SearchDetail, {
                  key: 1,
                  list: searchResult.value
                }, null, 8, ["list"]))
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const IndexpkgSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "D:/github/app-unis/indexpkg/search/search.vue"]]);
  const _sfc_main$h = {
    __name: "GoodsHeader",
    setup(__props) {
      const { height } = uni.getMenuButtonBoundingClientRect();
      const toBack = () => {
        uni.navigateBack();
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "goods-header flex" }, [
          vue.createElementVNode("view", { class: "header-left-block flex-a" }, [
            vue.createVNode(_component_van_icon, {
              name: "arrow-left",
              size: "40rpx",
              class: "left-icon",
              onClick: toBack
            }),
            vue.createVNode(_component_van_icon, {
              name: "home-o",
              size: "40rpx",
              class: "right-icon"
            })
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "header-right-block flex-a",
              style: vue.normalizeStyle({ height: vue.unref(height) + "px" })
            },
            [
              vue.createVNode(_component_van_icon, {
                name: "search",
                size: "36rpx"
              }),
              vue.createElementVNode("input", {
                class: "header-right-input",
                type: "text",
                placeholder: "午餐肉"
              })
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  };
  const GoodsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-5b84bfac"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsHeader.vue"]]);
  const _sfc_main$g = {
    __name: "GoodsDetail",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    setup(__props) {
      const props = __props;
      const current = vue.ref(1);
      const onSwiperChange = (e) => {
        current.value = e.detail.current + 1;
      };
      const onTapImg = (item, index) => {
        uni.previewImage({
          urls: props.goods.goods_albums,
          current: index,
          loop: true,
          count: item
        });
      };
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        var _a;
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 商品图片板块 "),
            vue.createElementVNode("view", { class: "goods-detail-img" }, [
              vue.createElementVNode(
                "swiper",
                {
                  class: "goods-detail-swiper",
                  onChange: onSwiperChange
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(__props.goods.goods_albums, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", {
                        class: "detail-swiper-item",
                        key: item
                      }, [
                        vue.createElementVNode("image", {
                          class: "detail-swiper-image",
                          mode: "heightFix",
                          src: item,
                          onClick: ($event) => onTapImg(item, index)
                        }, null, 8, ["src", "onClick"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode("view", { class: "swiper-dot flex" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(current.value),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", null, "/"),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString((_a = __props.goods.goods_albums) == null ? void 0 : _a.length),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "goods-price-text flex-c" }, [
              vue.createElementVNode("view", { class: "cheap-price" }, [
                vue.createElementVNode("text", null, "特价"),
                vue.createElementVNode("text", null, "距结束"),
                vue.createCommentVNode('<text class="date">{{curHours}}</text>\r\n			<text>:</text>\r\n			<text class="date">{{curMinutes}}</text>\r\n			<text>:</text>\r\n			<text class="date">{{curSeconds}}</text> ')
              ]),
              vue.createElementVNode("view", { class: "goods-price" }, [
                vue.createElementVNode("text", { class: "mid-size" }, "￥"),
                vue.createElementVNode(
                  "text",
                  { class: "big-size" },
                  vue.toDisplayString(__props.goods.retail_price),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "mid-size" }, ".00"),
                vue.createElementVNode(
                  "text",
                  { class: "line-size" },
                  "￥" + vue.toDisplayString(__props.goods.goods_price),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createCommentVNode(" 商品介绍板块 "),
            vue.createElementVNode("view", { class: "goods-produce fff flex-c" }, [
              vue.createCommentVNode(" 如果是新人则显示,领取后变为老用户 "),
              vue.createCommentVNode(' <view class="goods-ticket flex-a" v-show="true">  \r\n			<view class="redPacket flex-a">\r\n				红包\r\n				<view class="whiteP">\r\n					新人红包<text>满99减30元</text>\r\n				</view>\r\n			</view>\r\n			<view class="get flex-a">\r\n				领取\r\n			</view>\r\n		</view> '),
              vue.createElementVNode(
                "view",
                { class: "goods-name" },
                vue.toDisplayString(__props.goods.goods_name),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "goods-recommend-block flex-a" }, [
                vue.createElementVNode("view", { class: "goods-recommend-item1" }, " 自营 "),
                vue.createElementVNode("view", { class: "goods-recommend-item2 flex-a" }, [
                  vue.createElementVNode("view", { class: "bg-img" }, [
                    vue.createElementVNode("image", {
                      class: "bg-image",
                      src: "https://yanxuan-item.nosdn.127.net/953fd27555b9382e9d3d656a54398953.png"
                    })
                  ]),
                  vue.createElementVNode("text", { class: "item2-text" }, "网易严选")
                ])
              ]),
              vue.createCommentVNode(" 推荐理由板块 "),
              vue.createElementVNode("view", { class: "goods-bot-block flex-a" }, [
                vue.createElementVNode("view", { class: "goods-bot-text" }, " 推荐理由 "),
                vue.createElementVNode("view", { class: "goods-bot-hot" }, [
                  vue.createTextVNode(" 销量"),
                  vue.createElementVNode("text", { class: "goods-hot-text" }, "10万+")
                ])
              ]),
              vue.createElementVNode("view", { class: "goods-hot-list flex-c" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(__props.goods.goods_desc, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "hot-list-item flex-a",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "item-num flex-a" },
                        vue.toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { class: "item-text" },
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const GoodsDetail = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-2957dd94"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsDetail.vue"]]);
  const _sfc_main$f = {
    __name: "GoodsDeliver",
    setup(__props) {
      const props = __props;
      const addressStore = useAddressStore();
      const selectName = vue.ref("");
      mitter.on("selectName", (data) => {
        selectName.value = data;
      });
      const skuList = vue.ref([]);
      const isShow = vue.ref(false);
      const onShowPopup = async () => {
        const res = await getSkuListAPI(props.id);
        skuList.value = res.data;
        mitter.emit("popup", { isCart: false });
        isShow.value = true;
      };
      const showAddress = vue.ref(false);
      const onShowAddress = (type = "open") => {
        type == "close" ? showAddress.value = false : showAddress.value = true;
      };
      const onChangeItem = (e, item) => {
        addressStore.tapAddress(item.addres_id, e.detail, "change");
      };
      const selectedAddres = vue.computed(() => {
        return addressStore.storeAddress ? addressStore.storeAddress.address.split(" ").join("") : "请选择配送区域";
      });
      return (_ctx, _cache) => {
        const _component_van_checkbox = vue.resolveComponent("van-checkbox");
        const _component_van_action_sheet = vue.resolveComponent("van-action-sheet");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "deliver common-block" }, [
              vue.createElementVNode("view", {
                class: "goods-select-item flex-a deliver-item",
                onClick: onShowPopup
              }, [
                vue.createElementVNode("view", { class: "item-left flex-a" }, [
                  vue.createElementVNode("text", { class: "item-left-conmmon" }, "已选"),
                  vue.createElementVNode(
                    "text",
                    { class: "select-sku" },
                    vue.toDisplayString(!selectName.value ? "请选择规格" : selectName.value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "item-right" }, " > ")
              ])
            ]),
            vue.createElementVNode("view", {
              class: "deliver",
              onClick: onShowAddress
            }, [
              vue.createElementVNode("view", { class: "goods-select-item flex-a deliver-item" }, [
                vue.createElementVNode("view", { class: "item-left flex-a" }, [
                  vue.createElementVNode("text", { class: "item-left-conmmon" }, "配送"),
                  vue.createElementVNode(
                    "text",
                    { class: "select-sku" },
                    vue.toDisplayString(vue.unref(selectedAddres)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "item-right" }, " > ")
              ])
            ]),
            vue.createElementVNode("view", { class: "deliver" }, [
              vue.createElementVNode("view", { class: "goods-select-item flex-a deliver-item" }, [
                vue.createElementVNode("view", { class: "item-left flex-a" }, [
                  vue.createElementVNode("text", null, "不支持无忧退还"),
                  vue.createElementVNode("text", null, "不可用券/红包"),
                  vue.createElementVNode("text", null, "不享受企业折扣")
                ]),
                vue.createElementVNode("view", { class: "item-right" }, " > ")
              ])
            ]),
            vue.createVNode(GoodsPopup, {
              goods: skuList.value,
              show: isShow.value,
              "onUpdate:show": _cache[0] || (_cache[0] = ($event) => isShow.value = $event)
            }, null, 8, ["goods", "show"]),
            vue.createVNode(_component_van_action_sheet, {
              show: showAddress.value,
              title: "配送至",
              onClose: _cache[1] || (_cache[1] = ($event) => onShowAddress("close")),
              round: false
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "address-block"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vue.unref(addressStore).addressList, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "address-item",
                        key: item.addres_id
                      }, [
                        vue.createVNode(_component_van_checkbox, {
                          onChange: ($event) => onChangeItem($event, item),
                          value: item.selected
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.address.split(" ").join("")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onChange", "value"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["show"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const GoodsDeliver = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-f6b9359b"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsDeliver.vue"]]);
  const _sfc_main$e = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 热销板块 "),
        vue.createElementVNode("view", { class: "rank-block common-block" }, [
          vue.createElementVNode("view", { class: "goods-select-item flex-a" }, [
            vue.createElementVNode("view", { class: "item-left flex-a rank-left" }, [
              vue.createElementVNode("text", { class: "rank_name" }, [
                vue.createTextVNode("入选 牛奶热销榜 第"),
                vue.createElementVNode("text", { class: "_red" }, "1"),
                vue.createTextVNode("名")
              ])
            ]),
            vue.createElementVNode("view", { class: "item-right" }, " > ")
          ])
        ]),
        vue.createCommentVNode(" 邮费板块 "),
        vue.createElementVNode("view", { class: "goods-fee common-block" }, [
          vue.createElementVNode("view", { class: "goods-select-item flex-a" }, [
            vue.createElementVNode("view", { class: "item-left flex-a" }, [
              vue.createElementVNode("text", { class: "item-left-conmmon" }, "邮费"),
              vue.createElementVNode("text", { class: "fee-con" }, "满99包邮")
            ]),
            vue.createElementVNode("view", { class: "item-right" }, " > ")
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const GoodsHotfee = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$2], ["__scopeId", "data-v-051ae112"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsHotfee.vue"]]);
  const _sfc_main$d = {
    __name: "GoodsFooter",
    setup(__props) {
      const cartStore = useCartStore();
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const toTabPage = (path) => {
        uni.switchTab({
          url: `/pages/${path}`
        });
      };
      return (_ctx, _cache) => {
        var _a;
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "goods-footer flex",
            style: vue.normalizeStyle({ marginBottom: vue.unref(safeAreaInsets).bottom + "px" })
          },
          [
            vue.createElementVNode("view", { class: "left-icons flex" }, [
              vue.createElementVNode("view", {
                class: "icon flex-c-a",
                onClick: _cache[0] || (_cache[0] = ($event) => toTabPage("index/index"))
              }, [
                vue.createVNode(_component_van_icon, {
                  name: "home-o",
                  size: "44rpx",
                  color: "#ce4345"
                }),
                vue.createElementVNode("text", { class: "icon-text" }, "首页")
              ]),
              vue.createElementVNode("view", { class: "icon flex-c-a" }, [
                vue.createVNode(_component_van_icon, {
                  name: "home-o",
                  size: "44rpx"
                }),
                vue.createElementVNode("text", { class: "icon-text" }, "客服")
              ]),
              vue.createElementVNode("view", {
                class: "icon flex-c-a",
                onClick: _cache[1] || (_cache[1] = ($event) => toTabPage("cart/cart"))
              }, [
                vue.createVNode(_component_van_icon, {
                  name: "cart-o",
                  size: "44rpx",
                  info: (_a = vue.unref(cartStore).cartList) == null ? void 0 : _a.length
                }, null, 8, ["info"]),
                vue.createElementVNode("text", { class: "icon-text" }, "购物车")
              ])
            ]),
            vue.createElementVNode("view", { class: "right-buy flex" }, [
              vue.createElementVNode("button", { class: "add-cart common-btn" }, "加入购物车"),
              vue.createElementVNode("button", { class: "buy-goods common-btn" }, "立即购买")
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const GoodsFooter = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-c38cf047"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsFooter.vue"]]);
  const _sfc_main$c = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "about-hot-block" }, [
      vue.createElementVNode("view", { class: "about-hot-title flex" }, [
        vue.createElementVNode("view", { class: "common-title active-title" }, " 相关商品 "),
        vue.createElementVNode("view", { class: "hot-title common-title" }, " 24小时热销 ")
      ]),
      vue.createElementVNode("view", { class: "about-hot-goods" }, [
        vue.createElementVNode("swiper", {
          class: "about-hot-swiper",
          "indicator-dots": "true"
        }, [
          vue.createElementVNode("swiper-item", { class: "item-hot-about flex" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(6, (i) => {
                return vue.createElementVNode("view", {
                  class: "item-goods-block flex-c",
                  key: i
                }, [
                  vue.createElementVNode("image", {
                    class: "item-goods-image",
                    src: "https://yanxuan-item.nosdn.127.net/a3f680a3e734fbd783c8b4148359238f.jpg?type=webp&imageView&quality=65&thumbnail=330x330"
                  }),
                  vue.createElementVNode("view", { class: "item-detail-text" }, " 澳洲DIAA金奖认证，全脂罐装 800g "),
                  vue.createElementVNode("view", { class: "item-detail-price" }, [
                    vue.createElementVNode("text", { class: "r-price" }, "￥69"),
                    vue.createElementVNode("text", { class: "f-price" }, "￥129")
                  ])
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ])
      ])
    ]);
  }
  const GoodsAboutHot = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$1], ["__scopeId", "data-v-42c52a27"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsAboutHot.vue"]]);
  const _sfc_main$b = {
    __name: "GoodsArgument",
    props: {
      arguments: {
        type: Array
      }
    },
    setup(__props) {
      const isShow = vue.ref(false);
      const showMore = () => {
        isShow.value = true;
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        return vue.openBlock(), vue.createElementBlock("view", { class: "goods-arguments flex-c" }, [
          vue.createElementVNode("view", { class: "arguments-title" }, " 商品参数 "),
          vue.createElementVNode("view", { class: "arguments-item-block" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.arguments, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["arguments-item", { moreItem: index > 2 ? true : false }]),
                    key: index,
                    style: vue.normalizeStyle({ display: isShow.value ? "flex" : "" })
                  },
                  [
                    vue.createElementVNode(
                      "view",
                      { class: "item-name" },
                      vue.toDisplayString(item.parameter_name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "item-val" },
                      vue.toDisplayString(item.parameter_value),
                      1
                      /* TEXT */
                    )
                  ],
                  6
                  /* CLASS, STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            {
              class: "tap-more",
              onClick: showMore
            },
            [
              vue.createElementVNode("text", null, "点击查看更多"),
              vue.createVNode(_component_uni_icons, {
                type: "bottom",
                size: "12",
                color: "#616161"
              })
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, !isShow.value]
          ])
        ]);
      };
    }
  };
  const GoodsArgument = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-c7b1f43e"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsArgument.vue"]]);
  const _sfc_main$a = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "comment-detail flex-c" }, [
      vue.createElementVNode("view", { class: "user-info flex-a" }, [
        vue.createElementVNode("image", {
          class: "user-info-image",
          src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
        }),
        vue.createElementVNode("text", null, "用****4")
      ]),
      vue.createElementVNode("view", { class: "date-order" }, [
        vue.createElementVNode("text", null, "2023-10-22 12:50"),
        vue.createElementVNode("text", null, "纯牛奶"),
        vue.createElementVNode("text", null, "12盒*2提")
      ]),
      vue.createElementVNode("view", { class: "comment-text-img" }, [
        vue.createElementVNode("view", { class: "comment-text" }, " 挺好穿的，就是可能是我胖了点有点紧，我体重46公斤，我以为会松点的吖，可能是生完宝宝胖了，哈哈哈哈哈哈 "),
        vue.createElementVNode("view", { class: "comment-img flex" }, [
          vue.createElementVNode("image", {
            class: "comment-image",
            src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
          }),
          vue.createElementVNode("image", {
            class: "comment-image",
            src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
          }),
          vue.createElementVNode("image", {
            class: "comment-image",
            src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"
          })
        ])
      ])
    ]);
  }
  const CommentBlock = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render], ["__scopeId", "data-v-9b7c7c83"], ["__file", "D:/github/app-unis/components/CommentBlock/CommentBlock.vue"]]);
  const _sfc_main$9 = {
    __name: "GoodsComment",
    setup(__props) {
      const toComment = () => {
        uni.navigateTo({
          url: "/goodsPages/comment/comment"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "user-comment" }, [
          vue.createElementVNode("view", {
            class: "comment-title flex-a",
            onClick: toComment
          }, [
            vue.createElementVNode("view", { class: "comment-title-left" }, [
              vue.createElementVNode("text", null, "用户评价(6000+)")
            ]),
            vue.createElementVNode("view", { class: "comment-title-right" }, [
              vue.createElementVNode("text", null, "99.8% 好评"),
              vue.createElementVNode("text", null, ">")
            ])
          ]),
          vue.createVNode(CommentBlock)
        ]);
      };
    }
  };
  const GoodsComment = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-06b29985"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsComment.vue"]]);
  const _sfc_main$8 = {
    __name: "GoodsBrand",
    setup(__props) {
      const props = __props;
      const toBrandPage = () => {
        var _a;
        uni.navigateTo({
          url: `/goodsPages/brand/brand?id=${(_a = props.brandInfo) == null ? void 0 : _a.brand_id}`
        });
      };
      return (_ctx, _cache) => {
        var _a, _b, _c;
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "brand-block flex",
          onClick: toBrandPage
        }, [
          vue.createElementVNode("view", { class: "brand-img" }, [
            vue.createElementVNode("image", {
              class: "brand-image",
              src: (_a = props.brandInfo) == null ? void 0 : _a.brand_pic
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "brand-info flex-c" }, [
            vue.createElementVNode("view", { class: "info-title" }, [
              vue.createElementVNode(
                "text",
                { class: "b-title" },
                vue.toDisplayString((_b = props.brandInfo) == null ? void 0 : _b.brand_name),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_van_icon, {
                name: "arrow",
                size: "40rpx",
                class: "b-right"
              })
            ]),
            vue.createElementVNode(
              "view",
              { class: "info-produce" },
              vue.toDisplayString((_c = props.brandInfo) == null ? void 0 : _c.brand_desc),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  };
  const GoodsBrand = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-2e892f44"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsBrand.vue"]]);
  const _sfc_main$7 = {
    __name: "goods",
    setup(__props) {
      const goodsVal = vue.ref({});
      const getGoodsInfo = async (id) => {
        const res = await getGoodsInfoAPI(id);
        goodsVal.value = res;
      };
      onLoad((options) => {
        const {
          id
        } = options;
        getGoodsInfo(id);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "goods-block flex-c",
          style: { paddingTop: "30px" }
        }, [
          vue.createVNode(GoodsHeader),
          vue.createElementVNode("view", { class: "goods-body flex-c" }, [
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "goods-scroll",
              "enable-flex": "true"
            }, [
              vue.createElementVNode("view", { class: "goods-detail-block flex-c" }, [
                vue.createCommentVNode(" 商品详情板块 "),
                vue.createVNode(GoodsDetail, { goods: goodsVal.value }, null, 8, ["goods"]),
                vue.createElementVNode("view", { class: "fee-rank-deliver" }, [
                  vue.createCommentVNode(" 热销、邮费、配送板块 "),
                  vue.createVNode(GoodsHotfee),
                  vue.createCommentVNode(" 配送板块 "),
                  vue.createVNode(GoodsDeliver, {
                    id: goodsVal.value.goods_id
                  }, null, 8, ["id"])
                ]),
                vue.createCommentVNode(" 用户评论板块 "),
                vue.createVNode(GoodsComment),
                vue.createCommentVNode(" 品牌信息板块 "),
                vue.createVNode(GoodsBrand, {
                  brandInfo: goodsVal.value.brand_info
                }, null, 8, ["brandInfo"]),
                vue.createCommentVNode(" 相关商品、热销榜板块 "),
                vue.createVNode(GoodsAboutHot),
                vue.createCommentVNode(" 参数板块 "),
                vue.createVNode(GoodsArgument, {
                  arguments: goodsVal.value.attrList
                }, null, 8, ["arguments"]),
                vue.createCommentVNode(" 大图板块 "),
                goodsVal.value.goods_argImg ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goods-big-img"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(goodsVal.value.goods_argImg, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", { key: item }, [
                        vue.createElementVNode("image", {
                          class: "goods-big-image",
                          mode: "widthFix",
                          src: item
                        }, null, 8, ["src"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 更多推荐板块 "),
                vue.createElementVNode("view", { class: "more-recommend" }, [
                  vue.createElementVNode("view", { class: "more-recommend-title" }, " 更多推荐 "),
                  vue.createCommentVNode(" 更多推荐item ")
                ])
              ])
            ])
          ]),
          vue.createCommentVNode(' 		<goods-popup :goods="goodsVal"></goods-popup> '),
          vue.createVNode(GoodsFooter)
        ]);
      };
    }
  };
  const IndexpkgGoodsGoods = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "D:/github/app-unis/indexpkg/goods/goods.vue"]]);
  const _sfc_main$6 = {
    __name: "BrandTab",
    props: ["scrollTop", "type"],
    emits: ["update:type"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const lowerOrupper = vue.ref(false);
      const types = vue.ref(1);
      const reSortList = (val) => {
        if (val == "price") {
          lowerOrupper.value ? types.value = 3 : types.value = 2;
          lowerOrupper.value = !lowerOrupper.value;
        } else {
          types.value = val;
        }
        emits("update:type", types.value);
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["tab-brand flex", [props.scrollTop > 170 ? "fixed" : ""]])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "tab-item-block flex-a",
                onClick: _cache[0] || (_cache[0] = ($event) => reSortList(1)),
                style: vue.normalizeStyle({ color: props.type == 1 ? "#a02f40" : "" })
              },
              " 综合 ",
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", {
              class: "tab-item-block flex-a",
              onClick: _cache[1] || (_cache[1] = ($event) => reSortList("price"))
            }, [
              vue.createElementVNode(
                "text",
                {
                  style: vue.normalizeStyle({ color: types.value == 2 ? "#a02f40" : types.value == 3 ? "#a02f40" : "" })
                },
                "价格",
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "top-btm flex-c" }, [
                vue.createVNode(_component_van_icon, {
                  name: "arrow-up",
                  size: "24rpx",
                  color: types.value == 2 ? "#a02f40" : "",
                  class: "icon-up"
                }, null, 8, ["color"]),
                vue.createVNode(_component_van_icon, {
                  name: "arrow-down",
                  size: "24rpx",
                  color: types.value == 3 ? "#a02f40" : "",
                  class: "icon-down"
                }, null, 8, ["color"])
              ])
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "tab-item-block flex-a",
                onClick: _cache[2] || (_cache[2] = ($event) => reSortList(4)),
                style: vue.normalizeStyle({ color: props.type == 4 ? "#a02f40" : "" })
              },
              " 销量 ",
              4
              /* STYLE */
            )
          ],
          2
          /* CLASS */
        );
      };
    }
  };
  const BrandTab = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-ef082971"], ["__file", "D:/github/app-unis/goodsPages/brand/components/BrandTab.vue"]]);
  const _sfc_main$5 = {
    __name: "BrandDesc",
    props: ["brandInfo"],
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "brand-header flex-c" }, [
          vue.createElementVNode("view", { class: "header-info flex" }, [
            vue.createElementVNode("view", { class: "info-left" }, [
              vue.createElementVNode("image", {
                class: "info-image",
                src: __props.brandInfo.brand_pic
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "info-right flex-c" }, [
              vue.createElementVNode(
                "view",
                { class: "name" },
                vue.toDisplayString(__props.brandInfo.brand_name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "all-num" },
                " 全部商品" + vue.toDisplayString(__props.brandInfo.count) + "件 ",
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode(
            "view",
            { class: "brand-desc" },
            vue.toDisplayString(__props.brandInfo.brand_desc),
            1
            /* TEXT */
          )
        ]);
      };
    }
  };
  const BrandDesc = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-657da636"], ["__file", "D:/github/app-unis/goodsPages/brand/components/BrandDesc.vue"]]);
  const _sfc_main$4 = {
    __name: "brand",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const scrollTop = vue.ref(0);
      const onBrandScroll = (e) => {
        scrollTop.value = e.detail.scrollTop;
      };
      const type = vue.ref(1);
      vue.watchEffect(() => {
        switch (type.value) {
          case 1:
            brandGoodsList.value = brandGoodsList.value.sort((a, b) => a.sort - b.sort);
            break;
          case 2:
            brandGoodsList.value = brandGoodsList.value.sort((a, b) => a.goods_price - b.goods_price);
            break;
          case 3:
            brandGoodsList.value = brandGoodsList.value.sort((a, b) => b.goods_price - a.goods_price);
            break;
          case 4:
            brandGoodsList.value = brandGoodsList.value.sort((a, b) => b.sale - a.sale);
        }
      });
      const brandInfo = vue.ref({});
      const brandGoodsList = vue.ref([]);
      const getBrandGoodsList = async (id) => {
        const res = await getBrandGoodsAPI(id);
        brandInfo.value = res.data.brand_info;
        brandGoodsList.value = res.data.brand_goods;
      };
      onLoad((options) => {
        getBrandGoodsList(options.id);
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "brand-box flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, {
              title: brandInfo.value.brand_name
            }, null, 8, ["title"]),
            vue.createElementVNode("view", { class: "brand-block" }, [
              vue.createElementVNode(
                "scroll-view",
                {
                  "scroll-y": "true",
                  class: "brand-scroll flex-c",
                  onScroll: onBrandScroll
                },
                [
                  vue.createVNode(BrandDesc, { brandInfo: brandInfo.value }, null, 8, ["brandInfo"]),
                  vue.createElementVNode("view", { class: "brand-bd flex-c" }, [
                    vue.createVNode(BrandTab, {
                      scrollTop: scrollTop.value,
                      type: type.value,
                      "onUpdate:type": _cache[0] || (_cache[0] = ($event) => type.value = $event)
                    }, null, 8, ["scrollTop", "type"]),
                    vue.createElementVNode("view", { class: "brand-scroll flex" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(brandGoodsList.value, (item) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "goods-item",
                            key: item.goods_id
                          }, [
                            vue.createVNode(GoodsItem, { goodsItem: item }, null, 8, ["goodsItem"])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode("view", { class: "btm-end flex-a" }, " 更多内容，敬请期待 ")
                  ])
                ],
                32
                /* HYDRATE_EVENTS */
              )
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const GoodsPagesBrandBrand = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/github/app-unis/goodsPages/brand/brand.vue"]]);
  const getCommentListAPI = () => {
    return http({
      url: "/comment"
    });
  };
  const _sfc_main$3 = {
    __name: "comment",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const commentList = vue.ref("");
      const getCommentList = async () => {
        const res = await getCommentListAPI();
        commentList.value = res;
      };
      onLoad((options) => {
        getCommentList();
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "comment-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, { title: "评价" }),
            vue.createCommentVNode(' <view class="good-comment flex-c">\r\n			<text>99.9%好评</text>\r\n			<view class="comment-item-block flex">\r\n				<view class="comment-item selected">\r\n					全部(1234)\r\n				</view>\r\n				<view class="comment-item">\r\n					最新(1222)\r\n				</view>\r\n				<view class="comment-item">\r\n					有图(10)\r\n				</view>\r\n				<view class="comment-item">\r\n					追评(2)\r\n				</view>\r\n			</view>\r\n		</view> '),
            vue.createVNode(CommentBlock)
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const GoodsPagesCommentComment = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/github/app-unis/goodsPages/comment/comment.vue"]]);
  const _sfc_main$2 = {
    __name: "integral-detail",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const integralChangeList = vue.ref([]);
      const user_integral = vue.ref("");
      const getChangeList = async () => {
        const res = await getIntegralChangeAPI();
        integralChangeList.value = res.result;
        user_integral.value = res.integral;
        formatAppLog("log", "at integralPackge/integral-detail/integral-detail.vue:39", res);
      };
      onLoad((options) => {
        getChangeList();
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "detail-block flex-c",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            vue.createVNode(_component_CustomHeader, {
              title: "积分明细",
              middle: true
            }),
            vue.createElementVNode("view", { class: "detail-block-body" }, [
              vue.createElementVNode("view", { class: "integral flex-c-a" }, [
                vue.createElementVNode("text", { class: "user-integral" }, "我的积分"),
                vue.createElementVNode(
                  "text",
                  { class: "integral-num" },
                  vue.toDisplayString(user_integral.value),
                  1
                  /* TEXT */
                )
              ]),
              integralChangeList.value.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "integral-detail flex-c"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(integralChangeList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "integral-item flex-a",
                      key: index
                    }, [
                      vue.createElementVNode("view", { class: "item-left flex-c" }, [
                        vue.createElementVNode("text", null, "签到积分"),
                        vue.createElementVNode(
                          "text",
                          { class: "date" },
                          vue.toDisplayString(item.change_time),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "item-right" },
                        vue.toDisplayString(item.change_type ? "+" : "-") + vue.toDisplayString(item.change_num),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const IntegralPackgeIntegralDetailIntegralDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/github/app-unis/integralPackge/integral-detail/integral-detail.vue"]]);
  const _sfc_main$1 = {
    __name: "integral-packet",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const integral = vue.ref("");
      const ticketInfo = vue.ref({});
      const onExchangeItem = async () => {
        if (integral.value < ticketInfo.value.is_exchange) {
          uni.showToast({
            icon: "error",
            title: "积分不足"
          });
          return;
        } else {
          try {
            const now2 = (/* @__PURE__ */ new Date()).getTime();
            integral.value = integral.value - ticketInfo.value.is_exchange;
            let ticket = { id: ticketInfo.value.ticket_id, status: 0, get_time: now2 };
            let obj = { type: 0, count: ticketInfo.value.is_exchange, sum: integral.value, date: now2 };
            await Promise.all([updateExchangeTicketAPI(ticket), updateIntegralAPI(obj)]);
            uni.showToast({
              icon: "success",
              title: "兑换成功"
            });
          } catch (e) {
            uni.showToast({
              icon: "fail",
              title: "兑换失败，请稍后再试"
            });
          }
        }
      };
      const getTicketInfo = async (id) => {
        const res = await getTicketInfoAPI(id);
        ticketInfo.value = res.result;
      };
      onLoad((options) => {
        integral.value = options.integral;
        getTicketInfo(options.id);
      });
      return (_ctx, _cache) => {
        const _component_CustomHeader = resolveEasycom(vue.resolveDynamicComponent("CustomHeader"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "view",
              {
                class: "integral-top",
                style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
              },
              [
                vue.createVNode(_component_CustomHeader, {
                  title: "兑换详情",
                  middle: true
                })
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "packet-detail-block" }, [
              vue.createElementVNode("view", { class: "packet-detail flex-c" }, [
                vue.createElementVNode("view", { class: "packet-top flex" }, [
                  vue.createElementVNode("view", { class: "image" }, [
                    vue.createElementVNode("image", {
                      src: "https://yanxuan.nosdn.127.net/4333b709fac8932bbf86a48ebb022e34.png?type=webp&imageView&thumbnail=160x160&quality=75",
                      class: "packet-image"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "packet-num-condition flex-c" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "num" },
                      vue.toDisplayString(ticketInfo.value.ticket_name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "condition" },
                      vue.toDisplayString(ticketInfo.value.suit_goods),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "packet-btm" }, " -有效期以红包页面信息为准- ")
              ])
            ]),
            vue.createCommentVNode(" 兑换按钮 "),
            vue.createElementVNode(
              "view",
              {
                class: "exchange-btn",
                onClick: onExchangeItem
              },
              vue.toDisplayString(ticketInfo.value.is_exchange) + "积分兑换 ",
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const IntegralPackgeIntegralPacketIntegralPacket = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "D:/github/app-unis/integralPackge/integral-packet/integral-packet.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/cate/cate", PagesCateCate);
  __definePage("pages/cart/cart", PagesCartCart);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("profilePackge/Address/Address", ProfilePackgeAddressAddress);
  __definePage("profilePackge/order/order", ProfilePackgeOrderOrder);
  __definePage("profilePackge/add-edit/add-edit", ProfilePackgeAddEditAddEdit);
  __definePage("profilePackge/userinfo/userinfo", ProfilePackgeUserinfoUserinfo);
  __definePage("profilePackge/create-order/create-order", ProfilePackgeCreateOrderCreateOrder);
  __definePage("profilePackge/OrderDetail/OrderDetail", ProfilePackgeOrderDetailOrderDetail);
  __definePage("profilePackge/balance/balance", ProfilePackgeBalanceBalance);
  __definePage("profilePackge/redPacket/redPacket", ProfilePackgeRedPacketRedPacket);
  __definePage("profilePackge/choose-ticket/choose-ticket", ProfilePackgeChooseTicketChooseTicket);
  __definePage("profilePackge/card/card", ProfilePackgeCardCard);
  __definePage("profilePackge/error-result/error-result", ProfilePackgeErrorResultErrorResult);
  __definePage("profilePackge/balance-detail/balance-detail", ProfilePackgeBalanceDetailBalanceDetail);
  __definePage("profilePackge/ProfileSafe/ProfileSafe", ProfilePackgeProfileSafeProfileSafe);
  __definePage("profilePackge/integral/integral", ProfilePackgeIntegralIntegral);
  __definePage("catepkg/subCate/subCate", CatepkgSubCateSubCate);
  __definePage("indexpkg/login/login", IndexpkgLoginLogin);
  __definePage("indexpkg/search/search", IndexpkgSearchSearch);
  __definePage("indexpkg/goods/goods", IndexpkgGoodsGoods);
  __definePage("goodsPages/brand/brand", GoodsPagesBrandBrand);
  __definePage("goodsPages/comment/comment", GoodsPagesCommentComment);
  __definePage("integralPackge/integral-detail/integral-detail", IntegralPackgeIntegralDetailIntegralDetail);
  __definePage("integralPackge/integral-packet/integral-packet", IntegralPackgeIntegralPacketIntegralPacket);
  const _sfc_main = {
    onLaunch: async function() {
      const userStore = useUserStore();
      if (userStore.userInfo) {
        const addressStore = useAddressStore();
        const cartStore = useCartStore();
        const userCardStore = useUserCardStore();
        userCardStore.getUserCardInfo(userStore.userInfo.user_id);
        addressStore.getAddresList();
        await cartStore.getCartList();
      }
      formatAppLog("log", "at App.vue:21", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:24", "App Show");
    },
    onHide: function() {
      uni.pageScrollTo({
        scrollTop: 1,
        duration: 0
      });
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/github/app-unis/App.vue"]]);
  function isObject(v) {
    return typeof v === "object" && v !== null;
  }
  function normalizeOptions(options, factoryOptions) {
    options = isObject(options) ? options : /* @__PURE__ */ Object.create(null);
    return new Proxy(options, {
      get(target, key, receiver) {
        if (key === "key")
          return Reflect.get(target, key, receiver);
        return Reflect.get(target, key, receiver) || Reflect.get(factoryOptions, key, receiver);
      }
    });
  }
  function get(state, path) {
    return path.reduce((obj, p) => {
      return obj == null ? void 0 : obj[p];
    }, state);
  }
  function set(state, path, val) {
    return path.slice(0, -1).reduce((obj, p) => {
      if (/^(__proto__)$/.test(p))
        return {};
      else
        return obj[p] = obj[p] || {};
    }, state)[path[path.length - 1]] = val, state;
  }
  function pick(baseState, paths) {
    return paths.reduce((substate, path) => {
      const pathArray = path.split(".");
      return set(substate, pathArray, get(baseState, pathArray));
    }, {});
  }
  function hydrateStore(store, { storage, serializer, key, debug }) {
    try {
      const fromStorage = storage == null ? void 0 : storage.getItem(key);
      if (fromStorage)
        store.$patch(serializer == null ? void 0 : serializer.deserialize(fromStorage));
    } catch (error) {
      if (debug)
        formatAppLog("error", "at node_modules/pinia-plugin-persistedstate/dist/index.mjs:45", error);
    }
  }
  function persistState(state, { storage, serializer, key, paths, debug }) {
    try {
      const toStore = Array.isArray(paths) ? pick(state, paths) : state;
      storage.setItem(key, serializer.serialize(toStore));
    } catch (error) {
      if (debug)
        formatAppLog("error", "at node_modules/pinia-plugin-persistedstate/dist/index.mjs:54", error);
    }
  }
  function createPersistedState(factoryOptions = {}) {
    return (context) => {
      const { auto = false } = factoryOptions;
      const {
        options: { persist = auto },
        store,
        pinia: pinia2
      } = context;
      if (!persist)
        return;
      if (!(store.$id in pinia2.state.value)) {
        const original_store = pinia2._s.get(store.$id.replace("__hot:", ""));
        if (original_store)
          Promise.resolve().then(() => original_store.$persist());
        return;
      }
      const persistences = (Array.isArray(persist) ? persist.map((p) => normalizeOptions(p, factoryOptions)) : [normalizeOptions(persist, factoryOptions)]).map(
        ({
          storage = localStorage,
          beforeRestore = null,
          afterRestore = null,
          serializer = {
            serialize: JSON.stringify,
            deserialize: JSON.parse
          },
          key = store.$id,
          paths = null,
          debug = false
        }) => {
          var _a;
          return {
            storage,
            beforeRestore,
            afterRestore,
            serializer,
            key: ((_a = factoryOptions.key) != null ? _a : (k) => k)(typeof key == "string" ? key : key(store.$id)),
            paths,
            debug
          };
        }
      );
      store.$persist = () => {
        persistences.forEach((persistence) => {
          persistState(store.$state, persistence);
        });
      };
      store.$hydrate = ({ runHooks = true } = {}) => {
        persistences.forEach((persistence) => {
          const { beforeRestore, afterRestore } = persistence;
          if (runHooks)
            beforeRestore == null ? void 0 : beforeRestore(context);
          hydrateStore(store, persistence);
          if (runHooks)
            afterRestore == null ? void 0 : afterRestore(context);
        });
      };
      persistences.forEach((persistence) => {
        const { beforeRestore, afterRestore } = persistence;
        beforeRestore == null ? void 0 : beforeRestore(context);
        hydrateStore(store, persistence);
        afterRestore == null ? void 0 : afterRestore(context);
        store.$subscribe(
          (_mutation, state) => {
            persistState(state, persistence);
          },
          {
            detached: true
          }
        );
      });
    };
  }
  var src_default = createPersistedState();
  const pinia = createPinia();
  pinia.use(src_default);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(pinia);
    return {
      app,
      pinia
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
