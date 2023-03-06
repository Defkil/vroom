/**
 * Base interface for the app
 */
export interface AppInterface {
  /**
   * setup of the app
   */
  setup: () => Promise<void>
  /**
   * start of the app
   */
  start: () => Promise<void>
}
