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
  const _sfc_main$s = {
    __name: "Search",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        return vue.openBlock(), vue.createElementBlock("view", { class: "search-block" }, [
          vue.createElementVNode("navigator", {
            "hover-class": "none",
            url: "/pages/search/search",
            class: "search-area"
          }, [
            vue.createCommentVNode(' <uni-icons class="sea-icon" type="search" size="20"></uni-icons> '),
            vue.createVNode(_component_van_icon, {
              name: "search",
              class: "sea-icon",
              size: "30rpx"
            }),
            vue.createElementVNode("input", {
              type: "text",
              placeholder: "请输入"
            }),
            vue.createElementVNode("button", { class: "btn-search" }, "搜索")
          ])
        ]);
      };
    }
  };
  const Search = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-428b4be6"], ["__file", "D:/github/app-unis/pages/index/components/Search.vue"]]);
  const _sfc_main$r = {
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
            class: "header",
            style: vue.normalizeStyle({ paddingTop: vue.unref(safeAreaInsets).top + "px" })
          },
          [
            !__props.scroll ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
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
  const CustomHeader = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-0def32ac"], ["__file", "D:/github/app-unis/pages/index/components/CustomHeader.vue"]]);
  const _sfc_main$q = {
    __name: "GoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    setup(__props) {
      const props = __props;
      const price = vue.ref(29.9);
      const priceArr = vue.computed(() => price.value.toString().split("."));
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
              src: __props.goodsItem.goods_img
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "btm-text" }, [
            vue.createElementVNode("view", { class: "produce" }, [
              vue.createCommentVNode(' <slot name="img"></slot> '),
              vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/16698631101bcf18.png" }),
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
              vue.createElementVNode("text", { class: "hot-price" }, [
                vue.createTextVNode("￥"),
                vue.createElementVNode(
                  "text",
                  { class: "int" },
                  vue.toDisplayString(vue.unref(priceArr)[0]),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode(
                  "." + vue.toDisplayString(vue.unref(priceArr)[1]),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("text", { class: "col-price" }, "￥25")
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
        ]);
      };
    }
  };
  const GoodsItem = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-4b020d49"], ["__file", "D:/github/app-unis/components/GoodsItem/GoodsItem.vue"]]);
  let baseUrl = "http://localhost:3000/api/uni";
  baseUrl = "http://10.0.2.2";
  const httpInterceptor = {
    invoke(args) {
      args.url = baseUrl + args.url;
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
  const getHomeListAPI = ({ page, pageSize }) => {
    return http({
      url: "/home",
      data: {
        page,
        pageSize
      }
    });
  };
  const _sfc_main$p = {
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
      const goodsItemList = vue.ref([]);
      const indexData = vue.ref({
        page: 1,
        pageSize: 11
      });
      const getHomeList = async () => {
        const res = await getHomeListAPI(indexData.value);
        goodsItemList.value = res;
      };
      let flag = vue.ref(true);
      const onLoadMore = async () => {
        if (flag.value) {
          flag.value = false;
          indexData.value.page++;
          const res = await getHomeListAPI(indexData.value);
          if (res.length == 0)
            return;
          goodsItemList.value = [...goodsItemList.value, ...res];
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
                vue.createElementVNode("swiper", {
                  class: "swiper-box",
                  "indicator-dots": "true"
                }, [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(2, (i) => {
                      return vue.createElementVNode("swiper-item", {
                        class: "swiper-item",
                        key: i
                      }, [
                        vue.createElementVNode("view", { class: "list-block" }, [
                          (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(10, (i2, index) => {
                              return vue.createElementVNode("view", {
                                class: "list-item flex-c-a",
                                key: index
                              }, [
                                vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png" }),
                                vue.createElementVNode("view", { class: "item-text" }, " 居家日用 ")
                              ]);
                            }),
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ])
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ]),
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
                            vue.createElementVNode("text", { class: "title-text" }, "每日抄底"),
                            vue.createCommentVNode(' 								<text class="date">{{curHours}}</text>\n								<text>:</text>\n								<text class="date">{{curMinutes}}</text>\n								<text>:</text>\n								<text class="date">{{curSeconds}}</text> ')
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
                              vue.createElementVNode("view", { class: "r-item-img" }, [
                                vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/879d6919fa093140c38336eec736e4b1.png?type=webp&imageView&quality=65&thumbnail=330x330" })
                              ])
                            ]);
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ]),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(goodsItemList.value, (item) => {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "D:/github/app-unis/pages/index/index.vue"]]);
  const getCateListAPI = () => {
    return http({
      url: "/category"
    });
  };
  const _sfc_main$o = {
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
                    vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/hxm/oly-picture/08ee4f03c9cc67cc7dbdad343043abcb.jpg?type=webp&imageView&quality=75&thumbnail=750x0" })
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
                          vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/1686641811181b03.jpg?quality=75&type=webp&imageView" }),
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
  const PagesCateCate = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "D:/github/app-unis/pages/cate/cate.vue"]]);
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
  const _sfc_main$n = {
    __name: "CartItem",
    setup(__props) {
      const goods_num = vue.ref(1);
      const openPopup = () => {
        mitter.emit("popup", { show: true, isCart: true });
      };
      const isOne = vue.ref(true);
      const changeNumber = () => {
        isOne.value = false;
      };
      const changeValue = (e) => {
        formatAppLog("log", "at pages/cart/components/CartItem.vue:51", e);
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_van_stepper = vue.resolveComponent("van-stepper");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(3, (i) => {
            return vue.createElementVNode("view", {
              class: "cart-item",
              key: i
            }, [
              vue.createElementVNode("view", { class: "cart-item-left" }, [
                vue.createElementVNode("label", { class: "radio" }, [
                  vue.createElementVNode("radio")
                ]),
                vue.createElementVNode("view", { class: "cart-item-img" }, [
                  vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/0ff394ce91519769c5bbf28174a37f64.jpg?type=webp&imageView&quality=75&thumbnail=750x0" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cart-item-pro" }, [
                vue.createElementVNode("view", { class: "item-pro-top" }, [
                  vue.createElementVNode("text", { class: "_red" }, "限时购"),
                  vue.createTextVNode("新产季鲜切大桃，肉爽嫩滑丰富汁水 ")
                ]),
                vue.createElementVNode("view", {
                  class: "item-choose",
                  onClick: openPopup
                }, [
                  vue.createTextVNode(" 玫瑰水50ml"),
                  vue.createVNode(_component_van_icon, {
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
                  vue.createTextVNode("297"),
                  vue.createElementVNode("text", { class: "red-small" }, "优惠后"),
                  vue.createElementVNode("text", { class: "num-small" }, "￥99")
                ]),
                !isOne.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "item-add"
                }, [
                  vue.createVNode(_component_van_stepper, {
                    value: goods_num.value,
                    onChange: changeValue
                  }, null, 8, ["value"])
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "item-add-1",
                  onClick: changeNumber
                }, " x1 "))
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const CartItem = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-b707d0d0"], ["__file", "D:/github/app-unis/pages/cart/components/CartItem.vue"]]);
  const _sfc_main$m = {};
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
  const LoveList = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$6], ["__scopeId", "data-v-fc6f4b39"], ["__file", "D:/github/app-unis/components/LoveList/LoveList.vue"]]);
  const _sfc_main$l = {
    __name: "GoodsPopop",
    setup(__props) {
      const sku = vue.ref(["玫瑰水50ml", "玫瑰水100ml", "玫瑰水150ml", "玫瑰水200ml", "玫瑰水250ml", "玫瑰水350ml", "玫瑰水450ml"]);
      const show = vue.ref(false);
      const isCart = vue.ref(true);
      const skuList = vue.ref([]);
      const num = vue.ref(1);
      mitter.on("popup", (data) => {
        if (data.sku) {
          skuList.value = data.sku;
        }
        show.value = data.show;
        isCart.value = data.isCart;
      });
      const onSubmitSku = () => {
        show.value = false;
      };
      const onClose = () => {
        show.value = false;
      };
      const changeValue = () => {
      };
      const skuIndex = vue.ref(0);
      const onSelectSku = (item, index) => {
        skuIndex.value = index;
      };
      return (_ctx, _cache) => {
        const _component_van_stepper = vue.resolveComponent("van-stepper");
        const _component_van_popup = vue.resolveComponent("van-popup");
        return vue.openBlock(), vue.createElementBlock("view", { class: "popup" }, [
          vue.createVNode(_component_van_popup, {
            show: show.value,
            position: "bottom",
            onClose,
            closeable: ""
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content flex-c" }, [
                vue.createElementVNode("view", { class: "popup-top-item-block" }, [
                  vue.createElementVNode("view", { class: "popup-top-item flex" }, [
                    vue.createElementVNode("view", { class: "top-item-img" }, [
                      vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/0ff394ce91519769c5bbf28174a37f64.jpg?type=webp&imageView&quality=75&thumbnail=750x0" })
                    ]),
                    vue.createElementVNode("view", { class: "top-item-pro flex-c" }, [
                      vue.createElementVNode("text", { class: "red-price" }, "价格:￥297"),
                      vue.createElementVNode("text", null, "已选择:玫瑰水50ml"),
                      vue.createElementVNode("text", null, "预计09月25日发货")
                    ])
                  ])
                ]),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "scroll-popup"
                }, [
                  vue.createElementVNode("view", { class: "popup-body flex-c" }, [
                    vue.createElementVNode("view", { class: "top" }, " 规格 "),
                    vue.createElementVNode("view", { class: "body-item-block flex" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(sku.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: vue.normalizeClass(["body-item", { border_active: skuIndex.value == index }]),
                            key: sku.value,
                            onClick: ($event) => onSelectSku(item, index)
                          }, vue.toDisplayString(item), 11, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
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
                  onClick: onSubmitSku
                }, " 确定 ")) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "goods-btn flex"
                }, [
                  vue.createElementVNode("button", { class: "add-cart" }, "加入购物车"),
                  vue.createElementVNode("button", { class: "buy-goods" }, "立即购买")
                ]))
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["show"])
        ]);
      };
    }
  };
  const GoodsPopup = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-64fcb64e"], ["__file", "D:/github/app-unis/components/GoodsPopop/GoodsPopop.vue"]]);
  const _sfc_main$k = {};
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
                  vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/0ff394ce91519769c5bbf28174a37f64.jpg?type=webp&imageView&quality=75&thumbnail=750x0" })
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
  const ChangeItem = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$5], ["__scopeId", "data-v-929d190a"], ["__file", "D:/github/app-unis/pages/cart/components/ChangeItem.vue"]]);
  const _sfc_main$j = {
    __name: "cart",
    setup(__props) {
      vue.ref(0);
      const isLogin = vue.ref(true);
      const checked = vue.ref(true);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("header", {
              class: "header",
              style: { paddingTop: "30px" }
            }, "购物车"),
            vue.createElementVNode("view", { class: "cart-block flex-c" }, [
              vue.createElementVNode("view", { class: "cart-body flex-c" }, [
                !isLogin.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "not-login-block flex-c-a"
                }, [
                  vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/3a6c77d8463d8675f4a0a0c80dbe4391.png" }),
                  vue.createElementVNode("text", null, "未登录"),
                  vue.createElementVNode("view", { class: "login-btn" }, [
                    vue.createElementVNode("button", null, "登录")
                  ])
                ])) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("scroll-view", {
                      "scroll-y": "true",
                      class: "scroll-cart",
                      "scroll-top": "{{top}}"
                    }, [
                      (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "cart-list-block flex-c"
                      }, [
                        vue.createCommentVNode(" 全场换购板块 "),
                        vue.createVNode(ChangeItem),
                        vue.createCommentVNode(" 购物车商品板块 "),
                        vue.createElementVNode("view", { class: "cart-item-block" }, [
                          vue.createElementVNode("view", { class: "cart-block-title flex-a" }, [
                            vue.createElementVNode("view", { class: "title-left flex-a" }, [
                              vue.createElementVNode("radio", {
                                value: "全选",
                                checked: checked.value,
                                onClick: _cache[0] || (_cache[0] = ($event) => checked.value = !checked.value)
                              }, null, 8, ["checked"]),
                              vue.createElementVNode("text", null, "单件包邮")
                            ]),
                            vue.createElementVNode("view", { class: "title-right" }, " 以下商品以免邮 ")
                          ]),
                          vue.createVNode(CartItem)
                        ])
                      ])),
                      vue.createElementVNode("view", { class: "love-block-cart" }, [
                        vue.createVNode(LoveList, null, {
                          title: vue.withCtx(() => [
                            vue.createTextVNode(" 猜你喜欢 ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ]),
                    vue.createVNode(GoodsPopup)
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
  const PagesCartCart = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "D:/github/app-unis/pages/cart/cart.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
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
  const setActivePinia = (pinia) => activePinia = pinia;
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
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
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
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
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
  function registerPiniaDevtools(app, pinia) {
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
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
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
              const store = pinia._s.get(nodeId);
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
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
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
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
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
          const store = pinia._s.get(storeId);
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
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
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
      pinia.use(devtoolsPlugin);
    }
    return pinia;
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
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
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
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
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
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
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
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
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
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
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
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
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
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
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
      get: () => hot ? hotState.value : pinia.state.value[$id],
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
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
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
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
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
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
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
    return {
      userInfo,
      setUserInfo
    };
  });
  const _sfc_main$i = {
    __name: "profile",
    setup(__props) {
      const { userInfo } = useUserStore();
      formatAppLog("log", "at pages/profile/profile.vue:91", userInfo);
      const toLogin = () => {
        uni.navigateTo({
          url: "/indexpkg/login/login"
        });
      };
      const toUserInfo = () => {
        uni.navigateTo({
          url: "/subpkg/userinfo/userinfo"
        });
      };
      return (_ctx, _cache) => {
        const _component_van_icon = vue.resolveComponent("van-icon");
        const _component_uni_card = vue.resolveComponent("uni-card");
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        return vue.openBlock(), vue.createElementBlock("view", { class: "profile-block flex-c" }, [
          vue.createElementVNode("header", { class: "header" }, [
            vue.createElementVNode("view", { class: "profile-login flex" }, [
              vue.createElementVNode("view", {
                class: "avator",
                onClick: toUserInfo
              }, [
                vue.unref(userInfo).avator ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: vue.unref(userInfo).avator
                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: "https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png"
                }))
              ]),
              !vue.unref(userInfo) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "profile-info flex-c"
              }, [
                vue.createElementVNode("text", null, "未登录"),
                vue.createElementVNode("view", { onClick: toLogin }, "点击登录账号")
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "profile-info"
              }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(vue.unref(userInfo).nickname),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  null,
                  vue.toDisplayString(vue.unref(userInfo).sign),
                  1
                  /* TEXT */
                )
              ]))
            ])
          ]),
          vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
            vue.createElementVNode("view", { class: "profile-bd" }, [
              vue.createElementVNode("view", { class: "profile-ticket-block flex" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(6, (i) => {
                    return vue.createElementVNode("view", {
                      class: "ticket-item flex-c-a",
                      key: i
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["item-num", { price: i == 2 || i == 6 }])
                        },
                        " 0 ",
                        2
                        /* CLASS */
                      ),
                      vue.createElementVNode("view", { class: "item-name" }, " 礼品卡 ")
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              vue.createCommentVNode(" 订单付款栏 "),
              vue.createElementVNode("view", { class: "order-card" }, [
                vue.createVNode(_component_uni_card, {
                  "is-full": true,
                  "is-shadow": true
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "order-block flex" }, [
                      (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(5, (i) => {
                          return vue.createElementVNode("view", {
                            class: "order-item flex-c-a",
                            key: i
                          }, [
                            vue.createElementVNode("view", { class: "order-item-icon" }, [
                              vue.createVNode(_component_van_icon, {
                                name: "shop-o",
                                size: "60rpx"
                              })
                            ]),
                            vue.createElementVNode("view", { class: "order-item-text" }, " 全部订单 ")
                          ]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
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
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(6, (k) => {
                      return vue.createElementVNode("view", {
                        class: "fuwu-item flex-c-a",
                        key: k
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "headphones",
                          color: "#f98a72",
                          size: "24"
                        }),
                        vue.createElementVNode("view", { class: "fuwu-item-text" }, " 帮助与客服 ")
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
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
                        class: "new-block-item flex-c-a",
                        key: j
                      }, [
                        vue.createElementVNode("view", { class: "new-item-img" }, [
                          vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/16644541382b06e4.png" })
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
          ])
        ]);
      };
    }
  };
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "D:/github/app-unis/pages/profile/profile.vue"]]);
  const useMiddle = (className) => {
    return new Promise((resolve, reject) => {
      let top = 0;
      let height = 0;
      let rect = uni.getMenuButtonBoundingClientRect();
      let query = wx.createSelectorQuery();
      query.select(className).boundingClientRect();
      query.exec((res) => {
        var _a;
        height = (_a = res[0]) == null ? void 0 : _a.height;
        top = rect.top + rect.height / 2 - height / 2;
        resolve({
          height,
          top
        });
      });
    });
  };
  const _sfc_main$h = {
    __name: "Address",
    setup(__props) {
      const { safeAreaInsets } = uni.getSystemInfoSync();
      const top = vue.ref(0);
      onLoad(() => {
        useMiddle(".header-adress").then((data) => top.value = data);
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        const _component_uni_swipe_action_item = vue.resolveComponent("uni-swipe-action-item");
        const _component_uni_swipe_action = vue.resolveComponent("uni-swipe-action");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "view",
              {
                class: "header-adress",
                style: vue.normalizeStyle({ paddingTop: top.value + "px" })
              },
              [
                vue.createVNode(_component_uni_icons, {
                  type: "left",
                  size: "20",
                  class: "header-left"
                }),
                vue.createElementVNode("view", { class: "header-adress-title" }, " 收货地址 ")
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "adress-body" }, [
              vue.createVNode(_component_uni_swipe_action, { class: "swipe-block" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_swipe_action_item, { class: "adress-item-block" }, {
                    right: vue.withCtx(() => [
                      vue.createElementVNode("button", { class: "btn-del" }, "删除")
                    ]),
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", { class: "adress-item" }, [
                        vue.createElementVNode("view", { class: "adress-item-left" }, [
                          vue.createElementVNode("view", { class: "item-left-top" }, [
                            vue.createElementVNode("view", { class: "small-view default" }, " 默认 "),
                            vue.createElementVNode("view", { class: "small-view" }, " 学校 "),
                            vue.createElementVNode("view", { class: "adress-area" }, " 江西省南昌市青山湖区白水湖管理处 ")
                          ]),
                          vue.createElementVNode("view", { class: "item-left-adress" }, [
                            vue.createElementVNode("text", { class: "adress-detail" }, "江西省南昌市青山湖区双港东大街808号华东交通大学北区")
                          ]),
                          vue.createElementVNode("view", { class: "item-left-people" }, [
                            vue.createElementVNode("text", { class: "name" }, "吴祖扬"),
                            vue.createElementVNode("text", { class: "phone-number" }, "150****0561")
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "adress-item-right" }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "gear",
                            size: "24"
                          })
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "footer",
                style: vue.normalizeStyle({ bottom: vue.unref(safeAreaInsets).bottom + "px" })
              },
              [
                vue.createElementVNode("view", { class: "btn-comm btn-from" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "weixin",
                    size: "22",
                    color: "#06bb07"
                  }),
                  vue.createElementVNode("text", null, "微信导入")
                ]),
                vue.createElementVNode("view", { class: "btn-comm btn-add" }, " 新增收货地址 ")
              ],
              4
              /* STYLE */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const SubpkgAddressAddress = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "D:/github/app-unis/subpkg/Address/Address.vue"]]);
  const _sfc_main$g = {
    __name: "order",
    setup(__props) {
      uni.getMenuButtonBoundingClientRect();
      const top = vue.ref(0);
      onLoad(() => {
        useMiddle(".header-title").then((data) => top.value = data.top);
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode(
              "view",
              {
                class: "header",
                style: vue.normalizeStyle({ paddingTop: top.value + "px" })
              },
              [
                vue.createElementVNode("view", { class: "header-top" }, [
                  vue.createElementVNode("view", { class: "header-left-block" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "left",
                      size: "24",
                      class: "left-icon"
                    }),
                    vue.createVNode(_component_uni_icons, {
                      type: "home",
                      size: "24",
                      class: "right-icon"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "header-title" }, " 我的订单 ")
                ]),
                vue.createElementVNode("view", { class: "header-search" }, [
                  vue.createElementVNode("view", { class: "header-search-icon" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "search",
                      size: "20"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "header-search-input" }, [
                    vue.createElementVNode("input", {
                      type: "text",
                      placeholder: "搜索我的订单"
                    })
                  ])
                ]),
                vue.createElementVNode("view", { class: "header-list-block" }, [
                  vue.createElementVNode("view", { class: "hlist-item-block" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(4, (i) => {
                        return vue.createElementVNode("view", {
                          class: "hlist-item-h",
                          key: i
                        }, " 全部 ");
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  vue.createElementVNode("view", { class: "more-right" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "bottom",
                      size: "16",
                      color: "#ccc",
                      class: "more-icon"
                    })
                  ])
                ])
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "order-scroll"
            }, [
              vue.createElementVNode("view", { class: "order-item" }, [
                vue.createElementVNode("view", { class: "order-item-top" }, [
                  vue.createElementVNode("div", { class: "item-top-left" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "shop",
                      size: "24",
                      class: "top-shop-icon"
                    }),
                    vue.createElementVNode("view", { class: "top-left-name" }, " 青潮服饰专营店 "),
                    vue.createVNode(_component_uni_icons, {
                      type: "right",
                      size: "14"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "item-top-right" }, [
                    vue.createElementVNode("view", { class: "finish" }, " 完成 "),
                    vue.createVNode(_component_uni_icons, {
                      type: "trash",
                      color: "#bbb",
                      size: "18",
                      class: "icon-delete"
                    })
                  ])
                ]),
                vue.createElementVNode("view", { class: "order-item-bd" }, [
                  vue.createElementVNode("view", { class: "item-bd-tp" }, [
                    vue.createElementVNode("view", { class: "img" }, [
                      vue.createElementVNode("image", {
                        src: "https://yanxuan-item.nosdn.127.net/2289a75e7d790c953ccf7e8e39b1d104.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
                        mode: ""
                      })
                    ]),
                    vue.createElementVNode("view", { class: "item-detail" }, " 睿圣 纯色短袖T恤男女宽松2021夏季新款ins潮流情侣内搭打底半袖衫基 白色 s码 "),
                    vue.createElementVNode("view", { class: "nums" }, " x1 ")
                  ]),
                  vue.createElementVNode("view", { class: "item-bd-btm" }, [
                    vue.createElementVNode("div", { class: "bd-btm-price" }, [
                      vue.createElementVNode("text", null, "实付"),
                      vue.createElementVNode("text", { class: "dol" }, "￥"),
                      vue.createElementVNode("text", { class: "price" }, "38.98")
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "order-item-botm" }, [
                  vue.createElementVNode("view", { class: "common red-buy" }, " 再次购买 "),
                  vue.createElementVNode("view", { class: "common" }, " 评价晒单 "),
                  vue.createElementVNode("view", { class: "common" }, " 卖了换钱 ")
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
  const SubpkgOrderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "D:/github/app-unis/subpkg/order/order.vue"]]);
  const _sfc_main$f = {
    __name: "add-edit",
    setup(__props) {
      const top = vue.ref(0);
      const formData = vue.ref({
        name: "",
        contact: "",
        area: "",
        adress: ""
      });
      onLoad(() => {
        useMiddle(".add-edit-header").then((data) => top.value = data);
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
        const _component_uni_forms_item = vue.resolveComponent("uni-forms-item");
        const _component_uni_forms = vue.resolveComponent("uni-forms");
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
                vue.createVNode(_component_uni_icons, {
                  type: "left",
                  size: "20",
                  class: "header-left"
                }),
                vue.createElementVNode("view", { class: "edit-add-title" }, " 新增地址 ")
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "add-edit-bd" }, [
              vue.createElementVNode("view", { class: "receiver-detail" }, [
                vue.createVNode(
                  _component_uni_forms,
                  {
                    ref: "form",
                    modelValue: "formData"
                  },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { class: "form-item" }, {
                        default: vue.withCtx(() => [
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
                        _: 1
                        /* STABLE */
                      }),
                      vue.createVNode(_component_uni_forms_item, { class: "form-item" }, {
                        default: vue.withCtx(() => [
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
                        _: 1
                        /* STABLE */
                      }),
                      vue.createVNode(_component_uni_forms_item, { class: "form-item" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", { class: "item-lable" }, " 所在地区 "),
                          vue.createElementVNode("view", { class: "item-input" }, [
                            vue.withDirectives(vue.createElementVNode(
                              "input",
                              {
                                type: "text",
                                placeholder: "请填写收货人姓名",
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.area = $event)
                              },
                              null,
                              512
                              /* NEED_PATCH */
                            ), [
                              [vue.vModelText, formData.value.area]
                            ])
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      vue.createVNode(_component_uni_forms_item, { class: "form-item" }, {
                        default: vue.withCtx(() => [
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
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  },
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
                  vue.createElementVNode("view", { class: "default-btn" })
                ])
              ]),
              vue.createElementVNode("view", { class: "submit-block" }, [
                vue.createElementVNode("button", { class: "btn-submit" }, "确定")
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const SubpkgAddEditAddEdit = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "D:/github/app-unis/subpkg/add-edit/add-edit.vue"]]);
  const _sfc_main$e = {
    __name: "userinfo",
    setup(__props) {
      const { userInfo } = useUserStore();
      const toBack = () => {
        uni.navigateBack();
      };
      const top = vue.ref(0);
      const changeAvator = () => {
        uni.chooseImage({
          count: 1,
          sourceType: "album",
          success: (res) => {
            const path = res.tempFiles[0].path;
            uni.uploadFile({
              url: "http://localhost:3000/uni/upload",
              // header: {
              // 	"content-type": 'multipart/form-data'
              // },
              filePath: path,
              name: "file",
              formData: {
                id: userInfo.u_id
              },
              success: (result) => {
                formatAppLog("log", "at subpkg/userinfo/userinfo.vue:112", result);
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
      const onRadioChange = (e) => {
        userInfo.gender = e.detail.value;
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
        const _component_uni_forms_item = vue.resolveComponent("uni-forms-item");
        const _component_van_datetime_picker = vue.resolveComponent("van-datetime-picker");
        const _component_uni_forms = vue.resolveComponent("uni-forms");
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
                vue.createVNode(_component_uni_forms, { modelValue: "userData" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { class: "info-item-block" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "info-item-left" }, " 账号 "),
                        vue.createElementVNode("view", { class: "info-item-right" }, [
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(vue.unref(userInfo).account),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { class: "info-item-block" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "info-item-left" }, " 用户名 "),
                        vue.createElementVNode("view", { class: "info-item-right" }, [
                          vue.withDirectives(vue.createElementVNode(
                            "input",
                            {
                              type: "text",
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(userInfo).nickname = $event)
                            },
                            null,
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vModelText, vue.unref(userInfo).nickname]
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { class: "info-item-block" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "info-item-left" }, " 个性签名 "),
                        vue.createElementVNode("view", { class: "info-item-right" }, [
                          vue.withDirectives(vue.createElementVNode(
                            "input",
                            {
                              type: "text",
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(userInfo).sign = $event)
                            },
                            null,
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vModelText, vue.unref(userInfo).sign]
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { class: "info-item-block" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "info-item-left" }, " 性别 "),
                        vue.createElementVNode("view", { class: "info-item-right" }, [
                          vue.createElementVNode(
                            "radio-group",
                            { onChange: onRadioChange },
                            [
                              vue.createElementVNode("label", { class: "radio" }, [
                                vue.createElementVNode("radio", {
                                  value: "男",
                                  color: "#27ba9b",
                                  checked: vue.unref(userInfo).gender === "男"
                                }, null, 8, ["checked"]),
                                vue.createTextVNode(" 男 ")
                              ]),
                              vue.createElementVNode("label", { class: "radio" }, [
                                vue.createElementVNode("radio", {
                                  value: "女",
                                  color: "#27ba9b",
                                  checked: vue.unref(userInfo).gender === "女"
                                }, null, 8, ["checked"]),
                                vue.createTextVNode(" 女 ")
                              ])
                            ],
                            32
                            /* HYDRATE_EVENTS */
                          )
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { class: "info-item-block" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "info-item-left" }, " 生日 "),
                        vue.createElementVNode("view", { class: "info-item-right" }, [
                          vue.createVNode(_component_van_datetime_picker, {
                            type: "date",
                            value: "{{ currentDate }}",
                            "bind:input": "onInput",
                            "min-date": "{{ minDate }}",
                            formatter: "{{ formatter }}"
                          }),
                          vue.unref(userInfo).birthday ? (vue.openBlock(), vue.createElementBlock(
                            "view",
                            { key: 0 },
                            vue.toDisplayString(vue.unref(userInfo).birthday),
                            1
                            /* TEXT */
                          )) : (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "placeholder"
                          }, "请选择日期"))
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createElementVNode("view", { class: "storge-block" }, [
                  vue.createElementVNode("button", {
                    onClick: vue.withModifiers(onSubmit, ["prevent"]),
                    class: "submit-btn"
                  }, "保存", 8, ["onClick"])
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
  const SubpkgUserinfoUserinfo = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "D:/github/app-unis/subpkg/userinfo/userinfo.vue"]]);
  const getSubcateListAPI = (val) => {
    return http({
      url: "/subcate",
      data: {
        id: val.id,
        f_parentId: val.parent_id
      }
    });
  };
  const _sfc_main$d = {
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
        return vue.openBlock(), vue.createElementBlock("view", { class: "subcate-block" }, [
          vue.createElementVNode(
            "view",
            {
              class: "subcate-header",
              style: vue.normalizeStyle({ paddingTop: top.value + "px" })
            },
            [
              vue.createElementVNode("view", { class: "subcate-header-top" }, [
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
            "enable-flex": "true"
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
  const CatepkgSubCateSubCate = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "D:/github/app-unis/catepkg/subCate/subCate.vue"]]);
  const _sfc_main$c = {
    __name: "login",
    setup(__props) {
      const top = vue.ref(0);
      const isAgree = vue.ref(false);
      const isRegister = vue.ref(false);
      const userStore = useUserStore();
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
            url: "http://localhost:3000/api/uni/register",
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            data: {
              account: formData.value.acconut,
              password: formData.value.password
            },
            success: (res) => {
              formatAppLog("log", "at indexpkg/login/login.vue:102", res);
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
            url: "http://localhost:3000/api/uni/login",
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            data: {
              account: formData.value.acconut,
              password: formData.value.password
            },
            success: (result) => {
              formatAppLog("log", "at indexpkg/login/login.vue:123", result);
              if (result.data.status === "200") {
                const { data: res } = result;
                userStore.setUserInfo(res.data);
                uni.showToast({
                  icon: "success",
                  title: "登录成功"
                });
                setTimeout(() => {
                  uni.navigateBack();
                }, 500);
              }
            }
          });
        }
      };
      onLoad(() => {
        useMiddle(".login-header").then((data) => top.value = data);
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = vue.resolveComponent("uni-icons");
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
                vue.createElementVNode("navigator", { url: "../index/index.vue" }, [
                  vue.createVNode(_component_uni_icons, { type: "home" })
                ])
              ]),
              vue.createElementVNode("view", { class: "h-mid" }, [
                vue.createElementVNode("navigator", { url: "../index/index.vue" }, "网易严选")
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "body flex-c" }, [
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode("view", { class: "img-logo" }, [
                vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png" })
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
  const IndexpkgLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "D:/github/app-unis/indexpkg/login/login.vue"]]);
  const _sfc_main$b = {
    __name: "search",
    setup(__props) {
      const goback = () => {
        uni.navigateBack();
      };
      return (_ctx, _cache) => {
        const _component_uni_nav_bar = vue.resolveComponent("uni-nav-bar");
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "search-box flex-c",
          style: { paddingTop: "30px" }
        }, [
          vue.createVNode(_component_uni_nav_bar, {
            onClickLeft: goback,
            "left-icon": "left",
            "left-text": "搜索"
          }),
          vue.createElementVNode("view", { class: "search-block flex-a" }, [
            vue.createElementVNode("input", {
              type: "text",
              placeholder: "牛肉"
            }),
            vue.createElementVNode("text", { class: "cancel" }, "取消")
          ]),
          vue.createElementVNode("view", { class: "search-body flex-c" }, [
            vue.createElementVNode("view", { class: "hot-search flex-c" }, [
              vue.createElementVNode("view", { class: "title" }, " 热门搜索 "),
              vue.createElementVNode("view", { class: "hot-search-list flex" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(8, (i) => {
                    return vue.createElementVNode("view", {
                      class: "hot-search-item",
                      key: i
                    }, " 睡衣 ");
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ]),
            vue.createCommentVNode(" 热门分类板块 "),
            vue.createElementVNode("view", { class: "hot-cate" }, [
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
                      vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/559d2a240ec20b096590a902217009ff.png" }),
                      vue.createElementVNode("view", { class: "name" }, " 肉类零食 ")
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ])
          ])
        ]);
      };
    }
  };
  const IndexpkgSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "D:/github/app-unis/indexpkg/search/search.vue"]]);
  const _sfc_main$a = {
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
  const GoodsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-5b84bfac"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsHeader.vue"]]);
  const _sfc_main$9 = {
    __name: "GoodsDetail",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    setup(__props) {
      const current = vue.ref(1);
      const onSwiperChange = (e) => {
        current.value = e.detail.current + 1;
      };
      const onTapImg = (item, index) => {
        uni.previewImage({
          urls: goodsVal.goods_ablums,
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
                vue.createElementVNode("text", { class: "big-size" }, "19"),
                vue.createElementVNode("text", { class: "mid-size" }, ".9"),
                vue.createElementVNode("text", { class: "line-size" }, "￥22")
              ])
            ]),
            vue.createCommentVNode(" 商品介绍板块 "),
            vue.createElementVNode("view", { class: "goods-produce flex-c" }, [
              vue.createElementVNode("view", { class: "goods-ticket flex-a" }, [
                vue.createElementVNode("view", { class: "redPacket flex-a" }, [
                  vue.createTextVNode(" 红包 "),
                  vue.createElementVNode("view", { class: "whiteP" }, [
                    vue.createTextVNode(" 新人红包"),
                    vue.createElementVNode("text", null, "满99减30元")
                  ])
                ]),
                vue.createElementVNode("view", { class: "get flex-a" }, " 领取 ")
              ]),
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
                    vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/953fd27555b9382e9d3d656a54398953.png" })
                  ]),
                  vue.createElementVNode("text", null, "网易严选")
                ])
              ]),
              vue.createCommentVNode(" 推荐理由板块 "),
              vue.createElementVNode("view", { class: "goods-bot-block flex-a" }, [
                vue.createElementVNode("view", { class: "goods-bot-text" }, " 推荐理由 "),
                vue.createElementVNode("view", { class: "goods-bot-hot" }, [
                  vue.createTextVNode(" 销量"),
                  vue.createElementVNode("text", null, "10万+")
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
  const GoodsDetail = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-2957dd94"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsDetail.vue"]]);
  const _sfc_main$8 = {
    __name: "GoodsDeliver",
    setup(__props) {
      const props = __props;
      const onShowPopup = () => {
        mitter.emit("popup", { show: true, isCart: false, sku: props.sku });
      };
      return (_ctx, _cache) => {
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
                  vue.createElementVNode("text", { class: "select-sku" }, "200*300 x1")
                ]),
                vue.createElementVNode("view", { class: "item-right" }, " > ")
              ])
            ]),
            vue.createElementVNode("view", { class: "deliver" }, [
              vue.createElementVNode("view", { class: "goods-select-item flex-a deliver-item" }, [
                vue.createElementVNode("view", { class: "item-left flex-a" }, [
                  vue.createElementVNode("text", { class: "item-left-conmmon" }, "配送"),
                  vue.createElementVNode("text", { class: "select-sku" }, "请选择配送区域")
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
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const GoodsDeliver = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-f6b9359b"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsDeliver.vue"]]);
  const _sfc_main$7 = {};
  function _sfc_render$4(_ctx, _cache) {
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
  const GoodsHotfee = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__scopeId", "data-v-051ae112"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsHotfee.vue"]]);
  const _sfc_main$6 = {};
  function _sfc_render$3(_ctx, _cache) {
    const _component_van_icon = vue.resolveComponent("van-icon");
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "goods-footer flex",
      style: { marginBottom: "0px" }
    }, [
      vue.createElementVNode("view", { class: "left-icons flex" }, [
        vue.createElementVNode("view", { class: "icon flex-c-a" }, [
          vue.createVNode(_component_van_icon, {
            name: "home-o",
            size: "44rpx",
            color: "#ce4345"
          }),
          vue.createElementVNode("text", null, "首页")
        ]),
        vue.createElementVNode("view", { class: "icon flex-c-a" }, [
          vue.createVNode(_component_van_icon, {
            name: "home-o",
            size: "44rpx"
          }),
          vue.createElementVNode("text", null, "客服")
        ]),
        vue.createElementVNode("view", { class: "icon flex-c-a" }, [
          vue.createVNode(_component_van_icon, {
            name: "cart-o",
            size: "44rpx"
          }),
          vue.createElementVNode("text", null, "购物车")
        ])
      ]),
      vue.createElementVNode("view", { class: "right-buy flex" }, [
        vue.createElementVNode("button", { class: "add-cart" }, "加入购物车"),
        vue.createElementVNode("button", { class: "buy-goods" }, "立即购买")
      ])
    ]);
  }
  const GoodsFooter = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-c38cf047"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsFooter.vue"]]);
  const _sfc_main$5 = {};
  function _sfc_render$2(_ctx, _cache) {
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
                  vue.createElementVNode("image", { src: "https://yanxuan-item.nosdn.127.net/a3f680a3e734fbd783c8b4148359238f.jpg?type=webp&imageView&quality=65&thumbnail=330x330" }),
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
  const GoodsAboutHot = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-42c52a27"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsAboutHot.vue"]]);
  const _sfc_main$4 = {
    __name: "GoodsArgument",
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
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(8, (i) => {
                return vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["arguments-item", { moreItem: i > 3 ? true : false }]),
                    key: i,
                    style: vue.normalizeStyle({ display: isShow.value ? "flex" : "" })
                  },
                  [
                    vue.createElementVNode("view", { class: "item-name" }, " 版型 "),
                    vue.createElementVNode("view", { class: "item-val" }, " 标准型、其他、平角裤 ")
                  ],
                  6
                  /* CLASS, STYLE */
                );
              }),
              64
              /* STABLE_FRAGMENT */
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
  const GoodsArgument = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c7b1f43e"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsArgument.vue"]]);
  const _sfc_main$3 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "user-comment" }, [
      vue.createElementVNode("view", { class: "comment-title flex-a" }, [
        vue.createElementVNode("view", { class: "comment-title-left" }, [
          vue.createElementVNode("text", null, "用户评价(6000+)")
        ]),
        vue.createElementVNode("view", { class: "comment-title-right" }, [
          vue.createElementVNode("text", null, "99.8% 好评"),
          vue.createElementVNode("text", null, ">")
        ])
      ]),
      vue.createElementVNode("view", { class: "comment-detail flex-c" }, [
        vue.createElementVNode("view", { class: "user-info flex-a" }, [
          vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png" }),
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
            vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png" }),
            vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png" }),
            vue.createElementVNode("image", { src: "https://yanxuan.nosdn.127.net/static-union/164793255107785e.png" })
          ])
        ])
      ])
    ]);
  }
  const GoodsComment = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__scopeId", "data-v-06b29985"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsComment.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render(_ctx, _cache) {
    const _component_uni_icons = vue.resolveComponent("uni-icons");
    return vue.openBlock(), vue.createElementBlock("view", { class: "brand-block flex" }, [
      vue.createElementVNode("view", { class: "brand-img" }, [
        vue.createElementVNode("image", { src: "/static/logo1.png" })
      ]),
      vue.createElementVNode("view", { class: "brand-info flex-c" }, [
        vue.createElementVNode("view", { class: "info-title" }, [
          vue.createElementVNode("text", { class: "b-title" }, "网易严选"),
          vue.createVNode(_component_uni_icons, {
            type: "right",
            size: "20",
            class: "b-right"
          })
        ]),
        vue.createElementVNode("view", { class: "info-produce" }, " 以“让美好生活触手可及”为初心，网易严选逐步发展成为中国新中产喜爱的生活方式品牌。 ")
      ])
    ]);
  }
  const GoodsBrand = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__scopeId", "data-v-2e892f44"], ["__file", "D:/github/app-unis/indexpkg/goods/components/GoodsBrand.vue"]]);
  const getGoodsInfoAPI = (id) => {
    return http({
      url: "/goods",
      method: "GET",
      data: {
        id
      }
    });
  };
  const _sfc_main$1 = {
    __name: "goods",
    setup(__props) {
      const goodsVal2 = vue.ref({});
      const getGoodsInfo = async (id) => {
        const res = await getGoodsInfoAPI(id);
        goodsVal2.value = res;
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
                vue.createVNode(GoodsDetail, { goods: goodsVal2.value }, null, 8, ["goods"]),
                vue.createElementVNode("view", { class: "fee-rank-deliver" }, [
                  vue.createCommentVNode(" 热销、邮费、配送板块 "),
                  vue.createVNode(GoodsHotfee),
                  vue.createCommentVNode(" 配送板块 "),
                  vue.createVNode(GoodsDeliver, {
                    sku: goodsVal2.value.sku
                  }, null, 8, ["sku"])
                ]),
                vue.createCommentVNode(" 用户评论板块 "),
                vue.createVNode(GoodsComment),
                vue.createCommentVNode(" 品牌信息板块 "),
                vue.createVNode(GoodsBrand),
                vue.createCommentVNode(" 相关商品、热销榜板块 "),
                vue.createVNode(GoodsAboutHot),
                vue.createCommentVNode(" 参数板块 "),
                vue.createVNode(GoodsArgument),
                vue.createCommentVNode(" 大图板块 "),
                goodsVal2.value.goods_argImg ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goods-big-img"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(goodsVal2.value.goods_argImg, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", { key: item }, [
                        vue.createElementVNode("image", {
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
          vue.createVNode(GoodsPopup),
          vue.createVNode(GoodsFooter)
        ]);
      };
    }
  };
  const IndexpkgGoodsGoods = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "D:/github/app-unis/indexpkg/goods/goods.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/cate/cate", PagesCateCate);
  __definePage("pages/cart/cart", PagesCartCart);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("subpkg/Address/Address", SubpkgAddressAddress);
  __definePage("subpkg/order/order", SubpkgOrderOrder);
  __definePage("subpkg/add-edit/add-edit", SubpkgAddEditAddEdit);
  __definePage("subpkg/userinfo/userinfo", SubpkgUserinfoUserinfo);
  __definePage("catepkg/subCate/subCate", CatepkgSubCateSubCate);
  __definePage("indexpkg/login/login", IndexpkgLoginLogin);
  __definePage("indexpkg/search/search", IndexpkgSearchSearch);
  __definePage("indexpkg/goods/goods", IndexpkgGoodsGoods);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      uni.pageScrollTo({
        scrollTop: 1,
        duration: 0
      });
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/github/app-unis/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    return {
      app
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
