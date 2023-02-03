import { computed, ComputedRef, ref } from 'vue'

export function ecoComputed<T>(fn: () => T, minDelay: number): ComputedRef<T> {
  // Initialize the cache with the first value
  let _cachedValue: T = fn()
  let lastComputedAt = Date.now()
  let computedTimeout: NodeJS.Timeout
  const triggerRef = ref(0)
  return computed(() => {
    console.log('Eco computed: triggered')
    triggerRef.value
    // If the cache is older than the minDelay, return the cache
    if (computedTimeout) clearTimeout(computedTimeout)
    if (lastComputedAt + minDelay > Date.now()) {
      computedTimeout = setTimeout(() => {
        console.debug('Eco computed: waiting time is over, triggering')
        triggerRef.value++
      }, lastComputedAt + minDelay - Date.now())
      console.log('Timeout in', lastComputedAt + minDelay - Date.now())
      console.debug('Eco computed: returning cached value')
      return _cachedValue
    }
    // Otherwise, compute the value and update the cache
    const value = fn()
    _cachedValue = value
    lastComputedAt = Date.now()
    console.debug('Eco computed: recomputed')
    return value
  })
}
