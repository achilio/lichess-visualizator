import { computed, ComputedRef, Ref, ref } from 'vue'

/**
 * A computed that will not recompute too often
 * @param fn The function to compute
 * @param minDelay The minimum delay between two computations
 * @returns A computed that will not recompute too often
 */
export function ecoComputed<T>(fn: () => T, minDelay: number): ComputedRef<T> {
  let lastComputedValue: T
  let lastComputedAt = 0
  let lock: boolean = false
  const triggerRef: Ref<number> = ref(0)
  return computed(() => {
    triggerRef.value
    // Trigger a re-computation when the triggerRef changes
    // If the last computation was too recent, schedule a new one
    const nextComputedAvailableAt = lastComputedAt + minDelay
    // If the next computation is scheduled in the future, return the cached value
    // and schedule a new computation
    if (nextComputedAvailableAt <= Date.now() && !lock) {
      lock = true
      // Recompute is allowed, clear the scheduled recompute
      lastComputedValue = fn()
      // Update the last computed time after the value has been computed
      lastComputedAt = Date.now()
      lock = false
    } else {
      // The delay to wait before recomputing
      const delayNextCompute = nextComputedAvailableAt - Date.now()
      // Schedule a new computation
      setTimeout(
        // Retrigger the computed when the timeout is over and reset the timeout
        () => {
          triggerRef.value++
        },
        delayNextCompute
      )
    }
    // Return the last computed value (either from the cache or from the function)
    return lastComputedValue
  })
}
