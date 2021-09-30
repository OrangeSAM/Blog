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


// 获取 docs 目录下除去.vuepress目录外的所有目录以及文件
// 并遍历相关目录，导出如上结构的对象

// 第一层目录名为key值
// title值为目录下第一层级readme文件的title
// collapsable和sidebarDepth目前写死，后续考虑可配置
// children的值为由最后已层级的文件与之前目录名组成的字符串构成的数组

const fs = require('fs')

function generateDirectory (dir) {
  fs.readdir(dir, function (err, res) {
    if (err) {
      console.log(err)
    } else {
      // res [CodingTool, IdeaPills, ...]

      const judgeDir = (innerRes) => {
        let targetStr = ''

        // 处理后续递归时是字符串的情况
        if (typeof innerRes === "string") {
          fs.stat(innerRes, function (err, stats) {
            if (err) {
              throw new err
            } else {
              if (stats.isDirectory()) {
                generateDirectory(innerRes)
              }
            }
          })
        }

        // 处理一开始传入是数组的情况
        if (innerRes instanceof Array) {
          Array.prototype.forEach.call(innerRes, childDir => {
            fs.stat(`${dir}/${childDir}`, function (err, res) {
              if (res.isDirectory()) {
                judgeDir(`${dir}/${childDir}`)
              } else {
                targetStr = `${dir}/${childDir}`
              }
            })
          })
        }
      }

      // 对获取的目录进行处理
      // 如果是目录，继续处理，是文件，则拼接路径

      // 需要去除的目录
      removeArrItem(res, '.vuepress')
      judgeDir(res)
    }
  })
}

const path = './docs'
generateDirectory(path)


// 参数：原数组，需要删除的项

// 这里有设计上的考量，第二个参数应该传入数组还是字符串
// 传字符串，就无法应对需要删除数组中多项的情况，需要使用方自行多次调用处理。
// 传数组，内部是不是就得两次循环
function removeArrItem (originalArr = [], deleteItem = '') {
  const targetIndex = originalArr.indexOf(deleteItem)
  originalArr.splice(targetIndex, 1)
}


//
// target ./docs/readme.md
// target ./docs/Interview/interview.md
// target ./docs/Interview/interview_summary.md
// target ./docs/Interview/nowcoder_record.md
// target ./docs/Interview/readme.md
// target ./docs/IdeaPills/idea_term_1.md
// target ./docs/IdeaPills/idea_term_10.md
// target ./docs/IdeaPills/idea_term_11.md
// target ./docs/IdeaPills/idea_term_12.md
// target ./docs/IdeaPills/idea_term_2.md
// target ./docs/IdeaPills/idea_term_3.md
// target ./docs/IdeaPills/idea_term_4.md
// target ./docs/IdeaPills/idea_term_6.md
// target ./docs/IdeaPills/idea_term_5.md
// target ./docs/IdeaPills/idea_term_8.md
// target ./docs/IdeaPills/idea_term_7.md
// target ./docs/IdeaPills/idea_term_9.md
// target ./docs/CodingTool/readme.md
// target ./docs/CodingTool/Vue_cli.md
// target ./docs/LearnTech/readme.md
// target ./docs/LeetCode/1.two_num_sum.md
// target ./docs/LeetCode/121.chance_to_trade.md
// target ./docs/LeetCode/14.comon_prefix.md
// target ./docs/LeetCode/189.reverse_array.md
// target ./docs/LeetCode/13.romeToInteger.md
// target ./docs/LeetCode/20.valid_brace.md
// target ./docs/LeetCode/26.delete_duplicate_in_array.md
// target ./docs/LeetCode/27.delete_item.md
// target ./docs/LeetCode/28.achieve_strstr.md
// target ./docs/LeetCode/3.lengthOfLongestSubstring.md
// target ./docs/LeetCode/35.find_insert_position.md
// target ./docs/LeetCode/4.findMedianSortedArrays.md
// target ./docs/LeetCode/67.binary_sum.md
// target ./docs/LeetCode/7.integer_reverse.md
// target ./docs/LeetCode/9.palindromic.md
// target ./docs/Others/anything_about_wechat.md
// target ./docs/Others/cheerio-readme.md
// target ./docs/Others/bug_analysis.md
// target ./docs/Others/comlete_determine_sytem.md
// target ./docs/Others/command_line_trick.md
// target ./docs/Others/common_ag.md
// target ./docs/Others/cycling_taiwan.md
// target ./docs/Others/FEwechater.md
// target ./docs/Others/frame_lib_sdk.md
// target ./docs/Others/get_my_money_back.md
// target ./docs/Others/get_outdoor_info.md
// target ./docs/Others/life_efficiency.md
// target ./docs/Others/make_blog.md
// target ./docs/Others/recommend_an_app.md
// target ./docs/Others/MVC、MVP&MVVM.md
// target ./docs/Others/repair_of_nuc.md
// target ./docs/Others/the_cognition_gain_in_market.md
// target ./docs/Others/the_thanks_to_zcl.md
// target ./docs/Others/time_tracker.md
// target ./docs/Others/try_to_touch_the_market.md
// target ./docs/Others/wechatread_use.md
// target ./docs/Others/wrong.md
// target ./docs/Projects/make_blog_with_vuepress.md
// target ./docs/Projects/map_of_data_center.md
// target ./docs/Projects/music_bulk_download.md
// target ./docs/Projects/node_getArticle.md
// target ./docs/Projects/node_todo.md
// target ./docs/Projects/page_screenshot.md
// target ./docs/Projects/puppeteer_get_image.md
// target ./docs/Projects/readme.md
// target ./docs/Projects/vue_wheels_button.md
// target ./docs/Projects/vue_wheels_compos_name.md
// target ./docs/Projects/vue_wheels_grid.md
// target ./docs/Projects/vue_wheels_input.md
// target ./docs/Projects/vue_wheels_layout.md
// target ./docs/Projects/vue_wheels_popover.md
// target ./docs/Projects/vue_wheels_primary_conclusion.md
// target ./docs/Projects/vue_wheels_start.md
// target ./docs/Projects/vue_wheels_tabs.md
// target ./docs/Projects/vue_wheels_toast.md
// target ./docs/Reading/Benjamin_Franklin.md
// target ./docs/Reading/charles_munger.md
// target ./docs/Reading/civilization_modernization_valueInvestment_china.md
// target ./docs/Reading/dog_money.md
// target ./docs/Reading/how_to_do_well_in_internet.md
// target ./docs/Reading/how_to_learn_efficiently.md
// target ./docs/Reading/index_funds.md
// target ./docs/Reading/invest_for_decades.md
// target ./docs/Reading/readme.md
// target ./docs/Reading/replay.md
// target ./docs/Reading/the_rich_father_investment.md
// target ./docs/Reading/value_what_i_thought_during_the_investment.md
// target ./docs/Reading/writing_is_investing.md
// target ./docs/Reading/xiaomin_qin.md
// target ./docs/Reading/xiaoping_cushijian.md
// target ./docs/CodingTool/Git/git&github.md
// target ./docs/CodingTool/Git/how_to_keep_sync_with_fork_project.md
// target ./docs/CodingTool/Git/git_geektime.md
// target ./docs/CodingTool/Webpack/chips.md
// target ./docs/CodingTool/Webpack/webpack_geektime.md
// target ./docs/LearnTech/Browser/cache.md
// target ./docs/LearnTech/Browser/character_byte_chinese.md
// target ./docs/LearnTech/Browser/devtools.md
// target ./docs/LearnTech/Browser/how_browser_works.md
// target ./docs/LearnTech/Browser/page_performance_optimize.md
// target ./docs/LearnTech/Browser/url_to_display.md
// target ./docs/LearnTech/HTTP/http_https.md
// target ./docs/LearnTech/HTTP/http_cache.md
// target ./docs/LearnTech/CSS/BFC.md
// target ./docs/LearnTech/CSS/block_inline_inlineBlock.md
// target ./docs/LearnTech/CSS/box_module.md
// target ./docs/LearnTech/CSS/css_font.md
// target ./docs/LearnTech/CSS/css_hard_to_learn.md
// target ./docs/LearnTech/CSS/css_img_stretch.md
// target ./docs/LearnTech/CSS/element_to_center.md
// target ./docs/LearnTech/CSS/flex.md
// target ./docs/LearnTech/CSS/preudo.md
// target ./docs/LearnTech/CSS/mobile_page.md
// target ./docs/LearnTech/CSS/Sass.md
// target ./docs/LearnTech/HTML/Dom.md
// target ./docs/LearnTech/Javascript/advanced_program_design.md
// target ./docs/LearnTech/Javascript/apply_call_bind.md
// target ./docs/LearnTech/Javascript/event_bind.md
// target ./docs/LearnTech/Javascript/babel.md
// target ./docs/LearnTech/Javascript/event_loop_translate.md
// target ./docs/LearnTech/Javascript/filter_in_array.md
// target ./docs/LearnTech/Javascript/forin_forof.md
// target ./docs/LearnTech/Javascript/func_declare_expression.md
// target ./docs/LearnTech/Javascript/hand_writing.md
// target ./docs/LearnTech/Javascript/Iterator_generator.md
// target ./docs/LearnTech/Javascript/js_arrow_func.md
// target ./docs/LearnTech/Javascript/js_async.md
// target ./docs/LearnTech/Javascript/js_dataType.md
// target ./docs/LearnTech/Javascript/js_datatype_convert.md
// target ./docs/LearnTech/Javascript/js_destructuring_assign.md
// target ./docs/LearnTech/Javascript/js_excute_context.md
// target ./docs/LearnTech/Javascript/js_grammar.md
// target ./docs/LearnTech/Javascript/js_inherit.md
// target ./docs/LearnTech/Javascript/js_modules.md
// target ./docs/LearnTech/Javascript/js_new.md
// target ./docs/LearnTech/Javascript/js_new_api.md
// target ./docs/LearnTech/Javascript/js_oop.md
// target ./docs/LearnTech/Javascript/js_proto_chain.md
// target ./docs/LearnTech/Javascript/let_const_interview.md
// target ./docs/LearnTech/Javascript/new_string.md
// target ./docs/LearnTech/Javascript/property_modification.md
// target ./docs/LearnTech/Javascript/reduce_in_array.md
// target ./docs/LearnTech/Javascript/this.md
// target ./docs/LearnTech/Javascript/tool_function.md
// target ./docs/LearnTech/Flutter/flutter_geektime.md
// target ./docs/LearnTech/Kaikeba/chapter_2.md
// target ./docs/LearnTech/Kaikeba/chapter_4.md
// target ./docs/LearnTech/Kaikeba/chapter_5.md
// target ./docs/LearnTech/Node/about_node.md
// target ./docs/LearnTech/Node/fs_module.md
// target ./docs/LearnTech/Node/http_url_module.md
// target ./docs/LearnTech/Node/mongoDB.md
// target ./docs/LearnTech/NetCourse/FEer_advance.md
// target ./docs/LearnTech/NetCourse/fe_attack.md
// target ./docs/LearnTech/NetCourse/geektime_git.md
// target ./docs/LearnTech/NetCourse/js_core.md
// target ./docs/LearnTech/NetCourse/js_deep.md
// target ./docs/LearnTech/NetCourse/office_ability.md
