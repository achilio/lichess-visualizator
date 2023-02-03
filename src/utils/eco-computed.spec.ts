import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { ecoComputed } from './eco-computed'
describe('Eco', () => {
  it('eco', async () => {
    const val = ref(1)
    const counter = ecoComputed(() => val.value, 100)
    expect(counter.value).toBe(1)
    val.value++
    // Too soon, the value should not have changed
    expect(counter.value).toBe(1)
    await wait(100)
    // After 2 seconds, the value should have changed
    expect(counter.value).toBe(2)
    val.value++
    val.value++
    val.value++
    val.value = 42
    await wait(100)
    expect(counter.value).toBe(42)
  })
})

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
