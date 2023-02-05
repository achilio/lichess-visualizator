import { computed, ComputedRef, Ref, ref } from 'vue'

/**
 * Creates a computed property that will not recompute too frequently.
 *
 * @template T
 * @param {() => T} fn - A function that returns a value of type T
 * @param {number} minDelay - The minimum delay, in milliseconds, between two computations
 * @returns {ComputedRef<T>} - A computed ref that returns the value of `fn` with a minimum delay of `minDelay` between two computations
 *
 * @example
 * ```
 * import { ecoComputed } from './ecoComputed';
 *
 * const counter = ref(0);
 * const computedCounter = ecoComputed(() => counter.value + 1, 1000);
 *
 * console.log(computedCounter.value); // 1
 * counter.value++;
 * console.log(computedCounter.value); // 1
 *
 * setTimeout(() => {
 *   console.log(computedCounter.value); // 2
 * }, 1500);
 * ```
 */
export function ecoComputed<T>(fn: () => T, minDelay: number): ComputedRef<T> {
  let lastComputedValue: T
  let lastComputedAt = 0
  let lock = false
  const triggerRef = ref(0)

  return computed(() => {
    triggerRef.value

    // Calculate the time when the next computation can be performed
    const nextComputedAvailableAt = lastComputedAt + minDelay

    // Check if the next computation can be performed now or if it needs to be scheduled
    if (nextComputedAvailableAt > Date.now() || lock) {
      setTimeout(() => triggerRef.value++, nextComputedAvailableAt - Date.now())
      return lastComputedValue
    }

    lock = true
    lastComputedAt = Date.now()
    lastComputedValue = fn()
    lock = false

    return lastComputedValue
  })
}
