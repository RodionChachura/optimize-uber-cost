import { haveSameEquitables } from './generic'

it('haveSameEquitables', () => {
  function equalTo(other) {
    return this.prop === other.prop
  }
  const ones = [
    {
      prop: 1,
      equalTo
    },
    {
      prop: 2,
      equalTo
    },
    {
      prop: 3,
      equalTo
    }
  ]
  const others = [
    {
      prop: 3,
      equalTo
    },
    {
      prop: 2,
      equalTo
    },
    {
      prop: 1,
      equalTo
    }
  ]
  expect(haveSameEquitables(ones, others)).toBe(true)

  others.push({
    prop: 4,
    equalTo
  })

  expect(haveSameEquitables(ones, others)).toBe(false)
})
