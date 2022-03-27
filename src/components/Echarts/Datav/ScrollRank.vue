<template>
  <div id="rank">
  <dv-scroll-ranking-board :config="config" style="width:400px; height:300px" />
  </div>
</template>

<script>
export default {
  
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  

};

</script>

<style lang="scss" scoped>
#rank{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
