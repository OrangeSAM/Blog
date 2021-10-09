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

// 文件名
const timeNow = new Date()
let generateTime = `${timeNow.getMonth() + 1}.${timeNow.getDate()}_${timeNow.getHours()}_${timeNow.getMinutes()}`

const path = './docs'
// 最后导出的配置对象
let finalConfig = {}

generateDirectory(path)


// 用这样的方式生成配置的缺点在于，生成最终文章链接的时候，必须得对是否放在目录中做出选择。
// 即有目录的情况就新起一个对象放在数组中，那么这样就要为没有在目录的直接子文件兜底，生成一个默认的数组
// 如果不生成默认的数组兜底，就会导致在有目录的情况下，直接子文件不知放置何处
function generateDirectory (dir) {
  function handleDirectory(err, res) {
    if (err) {
      console.log(err)
    } else {
      // 对获取的目录进行处理
      // 如果是目录，继续处理，是文件，则拼接路径
      const judgeDir = (innerRes) => {
        let targetStr = ''

        // 处理后续递归时是字符串的情况 ./docs/LearnTech
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

        // 处理一开始传入是数组的情况 [CodingTool, IdeaPills, ...]
        if (innerRes instanceof Array) {
          // 当前目录的children
          let childrenConfig = []

          Array.prototype.forEach.call(innerRes, childDir => {
            fs.stat(`${dir}/${childDir}`, function (err, res) {
              if (res.isDirectory()) {
                // 参数都是字符串
                judgeDir(`${dir}/${childDir}`)
              } else {
                // ['.', 'docs']
                // ['.', 'docs', 'CodingTool']
                // 除了docs目录下直接子文件readme.md，disSplitArr都至少会有三个元素
                const dirSplitArr = dir.split('/')

                // 不管下面是目录还是文件，都以字符串的形式拼接
                targetStr = `${dir}/${childDir}`

                // 处理最终配置的key
                if (dirSplitArr[2]) {
                  // 为readme的情况，暂时返回不处理
                  if (targetStr.indexOf('readme') !== -1) {
                    return
                  }
                  // 当前目录的配置
                  let currentConfig
                  if (typeof finalConfig[`/${dirSplitArr[2]}/`] !== 'undefined') {
                    currentConfig = finalConfig[`/${dirSplitArr[2]}/`]
                    let obj = currentConfig.find(e => {
                      return e.title === dirSplitArr[3] ? dirSplitArr[3] : dirSplitArr[2]
                    })
                    obj.children.push(targetStr)
                  } else {
                    currentConfig = []
                    // 对于目录title的修正，
                    let title = dirSplitArr[3] ? dirSplitArr[3] : dirSplitArr[2]

                    childrenConfig.push(targetStr)
                    currentConfig.push({
                      title,
                      collapsable: true,
                      sidebarDepth: 4,
                      children: childrenConfig
                    })
                  }
                  finalConfig[`/${dirSplitArr[2]}/`] = currentConfig

                  // 这里其实执行几乎文件数量的写入次数。
                  fs.writeFileSync(`${generateTime}_Directory.js`, JSON.stringify(finalConfig))
                } else {
                  // doc 下的直接子文件readme的情况会走到这
                }
              }
            })
          })
        }
      }

      // 需要去除的目录
      removeArrItem(res, '.vuepress')

      // 处理获取到的目录
      judgeDir(res)
    }
  }
  fs.readdir(dir, handleDirectory)
}


// 参数：原数组，需要删除的项

// 这里有设计上的考量，第二个参数应该传入数组还是字符串
// 传字符串，就无法应对需要删除数组中多项的情况，需要使用方自行多次调用处理。
// 传数组，内部是不是就得两次循环
function removeArrItem (originalArr = [], deleteItem = '') {
  const targetIndex = originalArr.indexOf(deleteItem)
  originalArr.splice(targetIndex, 1)
}
