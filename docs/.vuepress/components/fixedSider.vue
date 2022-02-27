<template>
  <div class="wrap">
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
    name:"fixedSider"
  }
</script>


<style lang="stylus" scoped>
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

