import 'shared/assets/styles/global.scss'

import { AppProviders } from 'app/providers/app-providers.tsx'
import { AppRouter } from 'app/providers/router.tsx'
import {ErrorToast} from "widgets/error-toast/ui/ErrorToast.tsx"

export const App = () => {
    return (
      <AppProviders>
        <AppRouter />
        <ErrorToast />
      </AppProviders>
    )
}