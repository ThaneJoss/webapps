import { createRequire } from 'node:module'

import vueTsc from 'vue-tsc'

const require = createRequire(import.meta.url)

vueTsc.run(require.resolve('@typescript/old/lib/tsc'))
