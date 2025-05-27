import { MainPage } from 'pages/MainPage/ui/MainPage'
import { Route,Routes } from 'react-router-dom'

export const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    )
}