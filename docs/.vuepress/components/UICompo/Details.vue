<template>
  <div class="details-wrap">
    <div class="title" @click="toggleContent">
      <span class="title-icon" :class="{rotate: showContent}">▶</span>
      <span class="title-cont">
        <slot name="title"></slot>
      </span>
    </div>
    <div class="content" :class="{display: showContent}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return  {
      showContent: true
    }
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent
    },
  }
}
</script>

<style>
.details-wrap {
  margin-bottom: 20px;
  transition: all 0.3 ease;
}
.title {
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 6px;
  box-shadow:8px 8px 10px 0px lightgray;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

}
.title-icon {
  display: inline-block;
  transition: all .2s ease;
}
.title-cont {
  padding-left: 10px;
  font-size: 1.65em;
}
.rotate {
  transform: rotate(90deg);
}
.content {
  display: none;
  transition: all .2s ease;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgb(229, 229, 229);
}
.content:hover {
  box-shadow: 8px 8px 10px 0px lightgray;
}
.display {
  display: block;
}
</style>