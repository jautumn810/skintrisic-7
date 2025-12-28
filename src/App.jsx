import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TestingPage from './pages/TestingPage'
import IntroducePage from './pages/analysis/IntroducePage'
import PermissionsPage from './pages/analysis/PermissionsPage'
import ImagePage from './pages/analysis/ImagePage'
import SelfiePage from './pages/analysis/SelfiePage'
import DemographicsPage from './pages/analysis/DemographicsPage'
import CityPage from './pages/analysis/CityPage'
import SelectPage from './pages/SelectPage'
import ProcessingPage from './pages/ProcessingPage'
import ResultPage from './pages/ResultPage'
import SummaryPage from './pages/SummaryPage'
import ThankYouPage from './pages/ThankYouPage'
import CitySelectPage from './pages/CityPage'

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
        <Route path="/analysis/demographics" element={<DemographicsPage />} />
        <Route path="/analysis/city" element={<CityPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/city" element={<CitySelectPage />} />
      </Routes>
    </Router>
  )
}

export default App

