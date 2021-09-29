/**
 * Author：SamLiu
 * Date: 21.9.29
 * Description: 用于生成vuepress专用格式的目录配置
 */

// const config = {
//   '/LearnTech/': [
//     {
//       title: "Vue", // 必要的
//       // path: '/about/',      // 可选的, 应该是一个绝对路径
//       collapsable: true, // 可选的, 默认值是 true,
//       sidebarDepth: 4, // 可选的, 默认值是 1
//       children: [
//         "Vue/vue_component_communication",
//         "Vue/vue_doc_record",
//         "Vue/vue_geektime",
//         "Vue/vue_router",
//         "Vue/vue_source_code_Hcysun",
//         "Vue/vue_source_code_Huangyi",
//         "Vue/vuex",
//         "Vue/element_ui",
//         "Vue/virtual_dom",
//       ]
//     }
//   ]
// }


// 获取 docs 目录下除去.vuepress目录外的所有目录
// 并遍历相关目录，导出如上结构的对象

// 第一层目录名为key值
// title值为目录下第一层级readme文件的title
// collapsable和sidebarDepth目前写死，后续考虑可配置
// children的值为由最后已层级的文件与之前目录名组成的字符串构成的数组
function generateDirectory () {

}

generateDirectory()
