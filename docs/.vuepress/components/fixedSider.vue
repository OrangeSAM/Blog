<template>
  <!-- 应该可以更好的设计成一个名片页面 -->
  <div class="wrap" v-if="showSider" @dblclick="hideSider">
    <div class="tips">扫码添加我的微信</div>
    <div class="img-wrap">
      <img src="../public/personal.jpg" alt="个人">
      <div>个人号</div>
      <img src="../public/official.jpg" alt="公众号">
      <div>公众号</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"fixedSider",
    data() {
      return {
        showSider: true
      }
    },
    methods: {
      hideSider() {
        this.showSider = false
      }
    }
  }
</script>


<style lang="stylus" scoped>
@media(max-width : 425px)
  .wrap
    display none
@media(min-width: 426px)
  .wrap
    animation-name breath
    animation-duration 3000ms
    animation-iteration-count infinite
    position fixed
    right 0
    top 110px
    border-radius 5px 0 0 5px
    padding 20px 10px
    text-align center
    background-color #fff
    box-shadow -1px 0 4px 1px $accentColor
    .tips
      font-size 20px
      margin-bottom 20px
    .img-wrap
      display flex
      flex-direction column
      align-items center
      img
        width 150px

  // 心跳动画
  @keyframes breath {
    0% {
      transform scale(.95);
    }
    50% {
      transform scale(1)
    }
    100% {
      transform scale(.95);
    }
  }
</style>

