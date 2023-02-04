import { computed, ComputedRef, ref } from 'vue'

/**
 * A computed that will not recompute too often
 * @param fn The function to compute
 * @param minDelay The minimum delay between two computations
 * @returns A computed that will not recompute too often
 */
export function ecoComputed<T>(fn: () => T, minDelay: number): ComputedRef<T> {
  let lastComputedValue: T = fn()
  let lastComputedAt = Date.now()
  let recomputeTrigger: NodeJS.Timeout | null
  const triggerRef = ref(0)
  return computed(() => {
    // Trigger a re-computation when the triggerRef changes
    triggerRef.value
    // If the last computation was too recent, schedule a new one
    const nextComputedAvailableAt = lastComputedAt + minDelay
    // If the next computation is scheduled in the future, return the cached value
    // and schedule a new computation
    if (nextComputedAvailableAt <= Date.now()) {
      console.debug('Eco-computed: recompute')
      // Recompute is allowed, clear the scheduled recompute
      lastComputedValue = fn()
      // Update the last computed time after the value has been computed
      lastComputedAt = Date.now()
    } else if (!recomputeTrigger) {
      console.debug('Eco-computed: recompute scheduled')
      // The delay to wait before recomputing
      const delayNextCompute = nextComputedAvailableAt - Date.now()
      console.debug('Eco-computed: recompute scheduled in', delayNextCompute)
      // Schedule a new computation
      recomputeTrigger = setTimeout(
        // Retrigger the computed when the timeout is over and reset the timeout
        () => {
          triggerRef.value++
          recomputeTrigger = null
        },
        delayNextCompute
      )
      console.debug('Eco-computed: recompute scheduled in', delayNextCompute)
    } else {
      console.debug('Eco-computed: recompute already scheduled')
    }
    // Return the last computed value (either from the cache or from the function)
    console.debug('Eco-computed: return value: ', lastComputedValue)
    return lastComputedValue
  })
}
