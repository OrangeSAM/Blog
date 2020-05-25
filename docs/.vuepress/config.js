module.exports = {
  title: '刘一笔的博客',
  description: '博客，日常记录，JavaScript，CSS，LeetCode，Node，HTTP',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  // 这是部署到github相关的配置
  markdown: {
    // 代码块显示行号
    lineNumbers: true
  },
  home: true,
  themeConfig: {
    // 导航栏配置
    nav:[
      {text: 'Github', link: 'https://github.com/OrangeSAM' },
      {text: '掘金', link: 'https://juejin.im'}
    ],
    // 侧边栏配置
    sidebar: [
      {
        title: "JavaScript", // 必要的
        // path: "/MiniProgram/" // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          "/Javascript/apply_call_bind",
          "/Javascript/event_bind",
          "/Javascript/babel",
          "/Javascript/FCC",
          "/Javascript/filter_in_array",
          "/Javascript/forin_forof",
          "/Javascript/func_declare_expression",
          "/Javascript/Iterator_generator",
          "/Javascript/Jsdeep",
          "/Javascript/js_arrow_func",
          "/Javascript/js_async",
          "/Javascript/js_dataStructure_algoritem",
          "/Javascript/js_dataType",
          "/Javascript/js_datatype_convert",
          "/Javascript/js_destructuring_assign",
          "/Javascript/js_excute_context",
          "/Javascript/js_false_nowcoder",
          "/Javascript/js_inherit",
          "/Javascript/js_new",
          "/Javascript/js_new_api",
          "/Javascript/js_oop",
          "/Javascript/js_proto_chain",
          "/Javascript/let_const_interview",
          "/Javascript/new_string",
          "/Javascript/property_modification",
          "/Javascript/reduce_in_array",
          "/Javascript/this",
          "/Javascript/what_is_js",
          "/Javascript/js_grammar"
        ]
      },
      {
        title: "项目记录", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Projects/record_of_wheels",
          "/Projects/vue_wheels_button",
          "/Projects/vue_wheels_layout",
          "/Projects/vue_wheels_tabs",
          "/Projects/webpage_screenshot",
          "/Projects/yibi_calendar",
          "/Projects/music_bulk_download",
        ]
      },
      {
        title: "浏览器", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Browser/character_byte_chinese",
          "/Browser/devtools",
          "/Browser/how_browser_works",
          "/Browser/url_to_display",
        ]
      },
      {
        title: "其他", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Others/cycling_taiwan",
          "/Others/FEwechater",
          "/Others/make_blog",
        ]
      },
      {
        title: "LeetCode", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/LeetCode/1.two_num_sum",
          "/LeetCode/7.integer_reverse",
          "/LeetCode/9.palindromic",
          "/LeetCode/13.romeToInteger",
          "/LeetCode/14.comon_prefix",
          "/LeetCode/20.valid_brace",
          "/LeetCode/26.delete_duplicate_in_array",
          "/LeetCode/27.delete_item",
          "/LeetCode/28.achieve_strstr",
          "/LeetCode/35.find_insert_position",
          "/LeetCode/67.binary_sum",
          "/LeetCode/121.chance_to_trade",
          "/LeetCode/189.reverse_array"
        ]
      },
      {
        title: "小程序", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/MiniProgram/",
        ]
      },
      {
        title: "Node", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Node/about_node",
          "/Node/fs_module",
          "/Node/http_url_module",
          "/Node/MongoDB",
          "/Node/Node.js_cheerio_puppeteer_getArticle",
          "/Node/node_combat",
          "/Node/node_primary",
          "/Node/node_todo",
          "/Node/puppeteer_get_image",
          "/Node/simple_web_server",
        ]
      },
      {
        title: "NPM", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/NPM/how_to_use",
        ]
      },
      {
        title: "Vue", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Vue/vue_component_communication",
          "/Vue/vue_doc_record",
          "/Vue/vue_geektime",
          "/Vue/vue_router",
          // "/Vue/vue_source_code_Hcysun",
          "/Vue/vue_source_code_Huangyi",
          "/Vue/Vuex",
        ]
      },
      {
        title: "Flutter", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Flutter/flutter_geektime",
          "/Flutter/flutter_learn",
        ]
      },
      {
        title: "HTML", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/HTML/Dom",
          "/HTML/HTML5",
        ]
      },
      {
        title: "Git", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Git/git&github",
          "/Git/how_to_keep_sync_with_fork_project",
          "/Git/how_to_use_git"
        ]
      },
      {
        title: "HTTP", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/HTTP/http_cache",
          "/HTTP/illustrate_http",
        ]
      },
      {
        title: "CSS", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/CSS/BFC",
          "/CSS/block_inline_inlineBlock",
          "/CSS/box_module",
          "/CSS/css_font",
          "/CSS/css_hard_to_learn",
          "/CSS/flex",
          "/CSS/mobile_page",
          "/CSS/preudo",
          "/CSS/Sass",
          "/CSS/width_height",
        ]
      },
      {
        title: "Dart", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Dart/dart_primary",
        ]
      },
      {
        title: "Work", // 必要的
        // path: '/about/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          "/Work/bug_analysis",
        ]
      },
    ],
  }
};