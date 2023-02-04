import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { ecoComputed } from './eco-computed'
describe('Eco-computed', () => {
  it('Single reactive property', async () => {
    const val = ref(1)
    const counter = ecoComputed(() => val.value, 100)
    expect(counter.value).toBe(1)
    val.value++
    // Too soon, the value should not have changed
    expect(counter.value).toBe(1)
    val.value++
    expect(counter.value).toBe(1)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(3)
  })
  it('Multiple reactive properties', async () => {
    const val1 = ref(1)
    const val2 = ref(1)
    const counter = ecoComputed(() => val1.value + val2.value, 100)
    expect(counter.value).toBe(2)
    val1.value++
    // Too soon, the value should not have changed
    expect(counter.value).toBe(2)
    val2.value++
    expect(counter.value).toBe(2)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(4)
  })
  /**
   * The first call on value have to recompute the value.
   */
  it('Initial trigger is effective', async () => {
    const val = ref(1)
    const counter = ecoComputed(() => val.value, 100)
    val.value++
    expect(counter.value).toBe(1)
    val.value++
    expect(counter.value).toBe(1)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(3)
  })
  it('Many mutations in a short time', async () => {
    const val = ref(1)
    const counter = ecoComputed(() => val.value, 100)
    expect(counter.value).toBe(1)
    val.value++
    val.value++
    val.value++
    val.value++
    val.value++
    expect(counter.value).toBe(1)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(6)
  })
  it('Check number of calls in the computed', async () => {
    const val = ref(1)
    let computedCalls = 0
    const counter = ecoComputed(() => {
      computedCalls++
      return val.value
    }, 100)
    expect(counter.value).toBe(1)
    expect(computedCalls).toBe(1)
    val.value++
    expect(counter.value).toBe(1)
    expect(computedCalls).toBe(1)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(2)
    expect(computedCalls).toBe(2)
    for (let i = 0; i < 100; i++) {
      val.value++
    }
    expect(counter.value).toBe(2)
    expect(computedCalls).toBe(2)
    await wait(100)
    // After waiting, the value should have changed
    expect(counter.value).toBe(102)
    expect(computedCalls).toBe(3)
  })
})

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
