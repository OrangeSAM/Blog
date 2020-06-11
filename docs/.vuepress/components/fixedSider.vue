<template>
  <div class="wrap">
    just a plugin test
  </div>
</template>

<script>
  export default {
    name:"fixedSider"
  }
</script>


<style scoped>
  .wrap{
    position: fixed;
    right: 0;
    top: 110px;
    width: 140px;
    border-radius: 5px 0 0 5px;
    padding: 20px 10px;
    text-align: center;
    background-color: #fff;
    /* height: 100%; */
    box-shadow: -1px 0 2px 0.5px #3eaf7c;
  }
  @media screen and (max-width: 1360px) {
    .wrap{
      display: none;
    }
  }
</style>

