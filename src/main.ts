import { platformBrowser } from '@angular/platform-browser'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

platformBrowser()
  .bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('./ngsw-worker.js')
    }
  })
  .catch(err => console.error(err))
