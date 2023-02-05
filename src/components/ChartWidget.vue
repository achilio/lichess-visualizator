<template>
  <div class="grid-stack-item" v-bind="gridStackAttributes">
    <div class="grid-stack-item-content">
      <component
        :is="props.widget.component.name"
        v-bind="props.widget.component.props"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import get from 'lodash/get'
import { computed } from 'vue'

const name = 'ChartWidget'

const props = defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
})
const gridStackAttributes = computed(() => {
  return {
    id: get(props.widget, 'id', 'widget'),
    'data-gs-id': get(props.widget, 'id', 'widget'),
    'data-gs-x': get(props.widget, 'layout.x', 0),
    'data-gs-y': get(props.widget, 'layout.y', 0),
    'data-gs-width': get(props.widget, 'layout.width', 2),
    'data-gs-height': get(props.widget, 'layout.height', 1),
  }
})
</script>
<style>
.grid-stack-item {
  margin: 10px;
}
.grid-stack-item-content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3182ce;
  background-color: #bee3f8;
  font-weight: 600;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
