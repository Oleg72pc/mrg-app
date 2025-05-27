import { MainPage } from 'pages/MainPage/ui/MainPage'
import { NotFound } from "pages/NotFound/ui/NotFound.tsx"
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
}