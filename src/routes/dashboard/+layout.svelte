<article class="full-page-wrapper">
  <slot/>
</article>

<style lang='postcss'>
  .full-page-wrapper {
    height: calc(100vh - theme(spacing.12))
  }
</style>