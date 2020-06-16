<template>
  <div class="wrap">
    a hint
  </div>
</template>

<script>
  export default {
    name:"fixedSider"
  }
</script>


<style lang="stylus" scoped>
  .wrap
    transition all 1s
    position fixed
    right 0
    top 110px
    width 50px
    border-radius 5px 0 0 5px
    padding 20px 10px
    text-align center
    background-color #fff
    box-shadow -1px 0 4px 1px $accentColor
    &:hover
      width 300px
  @media screen and (max-width: 1360px) {
    .wrap{
      display: none;
    }
  }
</style>

