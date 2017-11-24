<template>
  <article>
    <img v-lazy="lazy"
         :alt="name" />
  </article>
</template>

<script>
export default {
  name: 'lazyImg',
  props: {
    lazy: {
      type: String
    },
    name: {
      type: String
    }
  },
  methods: {
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      return { width: srcWidth * ratio, height: srcHeight * ratio };
    }
  },
  inheritAttrs: false
};
</script>

<style lang="scss" scoped>
article {
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.5s;

    &[lazy='erro'] {
      animation: loaded 1s linear;
    }

    &[lazy='loading'] {
      width: 30px;
      height: 30px;
      animation: loading-rotate 2s linear infinite;
    }

    &[lazy='loaded'] {
      animation: loaded 1s linear;
    }
  }
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loaded {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>


