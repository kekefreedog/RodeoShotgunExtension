import { fn } from '@wdio/browser-runner'

export default {
  runtime: {
    getURL: fn().mockImplementation((path: string) => `chrome-extension://fake/${path}`),
  },
  storage: {
    sync: {
      get:  fn().mockResolvedValue({ logoReplacement: true, qcGroupHiding: true, noQcButton: true }),
      set:  fn().mockResolvedValue(undefined),
    },
    onChanged: {
      addListener: fn(),
    },
  },
}
