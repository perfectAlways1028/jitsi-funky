import { onSnapshot } from 'mobx-state-tree'
import { RootStoreModel, RootStore } from './root-store'
import { Environment } from '../environment'
import * as storage from '../..//utils/storage'
import { Reactotron } from '../../services/reactotron'
import { Api } from '../../services/api'
import JitsiMeetJS from '../../../jitsi-meet'
import { JitsiApi } from '../../services/jitsi-api'

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root'

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment () {
  const env = new Environment()

  // env.useOverrides = __DEV__ ? true : false
  env.useOverrides = false

  env.ssl = true

  // create each service
  env.reactotron = new Reactotron()
  env.api = new Api()

  // allow each service to setup
  await env.reactotron.setup()
  await env.api.setup()

  env.jitsiMeetJS = JitsiMeetJS
  env.jitsiApi = new JitsiApi()

  await env.jitsiApi.setup()

  const initOptions = {
    disableAudioLevels: false
  }

  env.jitsiMeetJS.init(initOptions)

  env.jitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR)

  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore () {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    // data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    data = {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    // env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot => {
    // storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
  })

  return rootStore
}
