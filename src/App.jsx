import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SaveTheDate from './components/save-the-date'

function App() {
  return (
    // basename = the sub-path the site is served from ("/" locally, "/wedding-invite/" on GitHub Pages)
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <main>
        <Routes>
          <Route path="/save-the-date" element={<SaveTheDate />} />
          {/* Every other path (including "/") redirects to save-the-date */}
          <Route path="*" element={<Navigate to="/save-the-date" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
