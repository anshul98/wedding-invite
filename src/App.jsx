import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SaveTheDate from './components/save-the-date'

/*
 * Two versions of the invite (only the order of the names differs, see save-the-date/content.js):
 *   /b, /b/anything  → bride's side  → /b/save-the-date ("Aishwarya & Anshul")
 *   everything else  → groom's side  → /save-the-date   ("Anshul & Aishwarya")
 * Paths are case-insensitive, so /B works too.
 */
function App() {
  return (
    // basename = the sub-path the site is served from ("/" here, since it's on its own domain)
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <main>
        <Routes>
          <Route path="/save-the-date" element={<SaveTheDate side="groom" />} />
          <Route path="/b/save-the-date" element={<SaveTheDate side="bride" />} />
          <Route path="/b/*" element={<Navigate to="/b/save-the-date" replace />} />
          <Route path="*" element={<Navigate to="/save-the-date" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
