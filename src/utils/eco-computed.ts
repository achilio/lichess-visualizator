import { computed, ComputedRef, ref } from 'vue'

/**
 * A computed that will not recompute too often
 * @param fn The function to compute
 * @param minDelay The minimum delay between two computations
 * @returns A computed that will not recompute too often
 */
export function ecoComputed<T>(fn: () => T, minDelay: number): ComputedRef<T> {
  let lastComputedValue: T
  let lastComputedAt = 0
  let recomputeTrigger: NodeJS.Timeout
  const triggerRef = ref(0)
  return computed(() => {
    // Trigger a re-computation when the triggerRef changes
    triggerRef.value
    // If the last computation was too recent, schedule a new one
    const nextComputedAvailableAt = lastComputedAt + minDelay
    // If the next computation is scheduled in the future, return the cached value
    // and schedule a new computation
    if (nextComputedAvailableAt <= Date.now()) {
      // Recompute is allowed, clear the scheduled recompute
      lastComputedValue = fn()
      // Update the last computed time after the value has been computed
      lastComputedAt = Date.now()
    } else {
      recomputeTrigger && clearTimeout(recomputeTrigger)
      // The delay to wait before recomputing
      const delayNextCompute = nextComputedAvailableAt - Date.now()
      // Schedule a new computation
      recomputeTrigger = setTimeout(() => triggerRef.value++, delayNextCompute)
    }
    // Return the last computed value (either from the cache or from the function)
    return lastComputedValue
  })
}
