import 'reflect-metadata'
import './styles.scss'
import container from './ioc/inversify.container'
import { TYPES } from './ioc/inversify.types'
import { type AppInterface } from './App.interface'

/**
 * Main entry point for the application
 */
const main = async (): Promise<void> => {
  const app = container.get<AppInterface>(TYPES.APP)
  await app.setup()
  app.start().catch((err: Error) => {
    console.error(err)
  })
}

main().catch((err) => {
  console.error(err)
})
