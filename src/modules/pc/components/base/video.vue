<template>
  <video :src="src"
         controls
         autoplay>
    您的浏览器不支持 video 标签。
  </video>
</template>

<script>
export default {
  name: 'video',
  props: {
    src: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
video {
  width: 100%;
}
</style>


