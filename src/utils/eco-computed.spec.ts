import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { ecoComputed } from './eco-computed'
describe('Eco-computed', () => {
  it('Multiple calls', async () => {
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
  it('Multiple calls with delay', async () => {
    const val = ref(1)
    const counter = ecoComputed(() => val.value, 100)
    expect(counter.value).toBe(1)
    val.value++
    // Too soon, the value should not have changed
    expect(counter.value).toBe(1)
    await wait(50)
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
})

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
