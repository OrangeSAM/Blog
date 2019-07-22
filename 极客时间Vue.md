##### 小列表demo

```vue
<input type="text" name="" id="" v-model="info" />
<button @click="handleClick">添加</button>
<ul>
    <li v-for="(item, index) in items">{{ item }}</li>
    <todo-item v-for="(item,index) in items" :item="item"></todo-item>
</ul>

Vue.component("todo-item", {
        props: ["item"],
        template: '<li class="item">{{item}}</li>'
      });
      new Vue({
        el: "#app",
        data() {
          return {
            msg: "hello sam",
            info: "",
            items: []
          };
        },
        methods: {
          handleClick() {
            this.items.push(this.info);
            this.info = " ";
          }
        }
      });
```

