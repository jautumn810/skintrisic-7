import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import TestingPage from './pages/TestingPage.jsx'
import IntroducePage from './pages/analysis/IntroducePage.jsx'
import PermissionsPage from './pages/analysis/PermissionsPage.jsx'
import ImagePage from './pages/analysis/ImagePage.jsx'
import SelfiePage from './pages/analysis/SelfiePage.jsx'
import ProcessingPage from './pages/analysis/ProcessingPage.jsx'
import AnalysisResultsPage from './pages/analysis/AnalysisResultsPage.jsx'
import DemographicsPage from './pages/analysis/DemographicsPage.jsx'
import CityPage from './pages/analysis/CityPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'
import './globals.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/analysis/introduce" element={<IntroducePage />} />
        <Route path="/analysis/permissions" element={<PermissionsPage />} />
        <Route path="/analysis/image" element={<ImagePage />} />
        <Route path="/analysis/selfie" element={<SelfiePage />} />
        <Route path="/analysis/processing" element={<ProcessingPage />} />
        <Route path="/analysis/results" element={<AnalysisResultsPage />} />
        <Route path="/analysis/demographics" element={<DemographicsPage />} />
        <Route path="/analysis/city" element={<CityPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  )
}

export default App
