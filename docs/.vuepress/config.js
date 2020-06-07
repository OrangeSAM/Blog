module.exports = {
  title: '刘一笔的博客',
  description: '博客，日常记录，JavaScript，CSS，LeetCode，Node，HTTP',
  plugins: ['@vuepress/back-to-top'],
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {rel: 'icon', href: '/logo.jpg'}], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  // 这是部署到github相关的配置
  markdown: {
    // 代码块显示行号
    lineNumbers: true
  },
  evergreen: true,
  home: true,
  themeConfig: {
    lastUpdated: '最后更新于',
    // 导航栏配置
    nav: [
      {text: '技术学习', link: '/LearnTech/Javascript/apply_call_bind'},
      {text: '项目记录', link: '/Projects/make_blog_with_vuepress'},
      {text: 'LeetCode', link: '/LeetCode/1.two_num_sum'},
      {text: '编程工具', link: '/CodingTool/NPM/how_to_use'},
      {text: 'Github', link: 'https://github.com/OrangeSAM'},
      {
        text: "友链",
        items: [
          {
            text: "若川博客",
            link: "https://www.lxchuan12.cn/"
          },
          {
            text: "森淼",
            link: "https://wind-nest.com/"
          },
          {
            text: "北风",
            link: "https://www.mybeifeng.com/"
          }
        ]
      }
    ],
    // 侧边栏配置
    sidebar: {
      '/LearnTech/': [
        {
          title: "JavaScript", // 必要的
          // path: "/MiniProgram/" // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2,    // 可选的, 默认值是 1
          children: [
            "Javascript/apply_call_bind",
            "Javascript/event_bind",
            "Javascript/babel",
            "Javascript/FCC",
            "Javascript/filter_in_array",
            "Javascript/forin_forof",
            "Javascript/func_declare_expression",
            "Javascript/Iterator_generator",
            "Javascript/Jsdeep",
            "Javascript/js_arrow_func",
            "Javascript/js_async",
            "Javascript/js_dataStructure_algoritem",
            "Javascript/js_dataType",
            "Javascript/js_datatype_convert",
            "Javascript/js_destructuring_assign",
            "Javascript/js_excute_context",
            "Javascript/js_false_nowcoder",
            "Javascript/js_inherit",
            "Javascript/js_new",
            "Javascript/js_new_api",
            "Javascript/js_oop",
            "Javascript/js_proto_chain",
            "Javascript/let_const_interview",
            "Javascript/new_string",
            "Javascript/property_modification",
            "Javascript/reduce_in_array",
            "Javascript/this",
            "Javascript/what_is_js",
            "Javascript/js_grammar"
          ]
        },
        {
          title: "Vue", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Vue/vue_component_communication",
            "Vue/vue_doc_record",
            "Vue/vue_geektime",
            "Vue/vue_router",
            "Vue/vue_source_code_Hcysun",
            "Vue/vue_source_code_Huangyi",
            "Vue/vuex",
          ]
        },
        {
          title: "CSS", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "CSS/BFC",
            "CSS/block_inline_inlineBlock",
            "CSS/box_module",
            "CSS/css_font",
            "CSS/css_hard_to_learn",
            "CSS/flex",
            "CSS/mobile_page",
            "CSS/preudo",
            "CSS/Sass",
            "CSS/width_height",
          ]
        },
        {
          title: "Node", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Node/about_node",
            "Node/fs_module",
            "Node/http_url_module",
            "Node/mongoDB",
            "Node/node_combat",
          ]
        },
        {
          title: "HTTP", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "HTTP/http_cache",
            "HTTP/illustrate_http",
          ]
        },
        {
          title: "HTML", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "HTML/Dom",
            "HTML/HTML5",
          ]
        },
        {
          title: "浏览器", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Browser/character_byte_chinese",
            "Browser/how_browser_works",
            "Browser/url_to_display",
          ]
        },
        // {
        //   title: "小程序", // 必要的
        //   // path: '/about/',      // 可选的, 应该是一个绝对路径
        //   collapsable: true, // 可选的, 默认值是 true,
        //   sidebarDepth: 2, // 可选的, 默认值是 1
        //   children: [
        //     "/MiniProgram/",
        //   ]
        // },
        {
          title: "Flutter", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Flutter/flutter_geektime",
            "Flutter/flutter_learn",
          ]
        },
        {
          title: "Dart", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Dart/dart_primary",
          ]
        },

      ],
      '/Projects/': [
        {
          title: "项目记录", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 4, // 可选的, 默认值是 1
          children: [
            "make_blog_with_vuepress",
            "record_of_wheels",
            "vue_wheels_button",
            "vue_wheels_layout",
            "vue_wheels_popover",
            "vue_wheels_tabs",
            "page_screenshot",
            "Node.js_getArticle",
            "node_todo",
            "puppeteer_get_image",
            "yibi_calendar",
            "music_bulk_download",
          ]
        },
      ],
      '/LeetCode/': [
        {
          title: "LeetCode", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "1.two_num_sum",
            "7.integer_reverse",
            "9.palindromic",
            "13.romeToInteger",
            "14.comon_prefix",
            "20.valid_brace",
            "26.delete_duplicate_in_array",
            "27.delete_item",
            "28.achieve_strstr",
            "35.find_insert_position",
            "67.binary_sum",
            "121.chance_to_trade",
            "189.reverse_array"
          ]
        }
      ],
      '/CodingTool/': [
        {
          title: "NPM", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "NPM/how_to_use",
          ]
        },
        {
          title: "Git", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "Git/git&github",
            "Git/how_to_keep_sync_with_fork_project",
            "Git/how_to_use_git"
          ]
        }
      ],
      '/Others/': [
        {
          title: "其他", // 必要的
          // path: '/about/',      // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "/Others/cycling_taiwan",
            "/Others/FEwechater",
            "/Others/make_blog",
            "/Others/bug_analysis",
          ]
        }
      ]
    }
  }
};