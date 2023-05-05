interface Data {
  [key: string]: unknown
}
export class Reactive {
  data: Data
  dependencies: Map<string, Set<() => void>>
  constructor(data: Data) {
    this.data = data
    this.dependencies = new Map()
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get: () => {
          return this.data[key]
        },
        set: (newValue: unknown) => {
          const oldValue = this.data[key]
          this.data[key] = newValue
          if (oldValue !== newValue) {
            this.notify(key)
          }
        }
      })
    })
  }

  public observe(key: string, callback: () => void): () => void {
    let dep = this.dependencies.get(key)
    if (!dep) {
      dep = new Set()
      this.dependencies.set(key, dep)
    }
    dep.add(callback)
    return () => {
      dep && dep.delete(callback)
    }
  }

  private notify(key: string): void {
    const dep = this.dependencies.get(key)
    if (dep) {
      dep.forEach(callback => callback())
    }
  }
}
