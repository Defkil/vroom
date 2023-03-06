/**
 * Three core with animation loop
 */
export interface ThreeCoreInterface {
  /** Setup three core */
  setup: () => Promise<void>
  /** Start three core and loop */
  start: () => Promise<void>
}
