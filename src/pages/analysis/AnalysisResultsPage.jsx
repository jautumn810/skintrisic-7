import SiteHeader from '../../components/SiteHeader'
import { useNavigate } from 'react-router-dom'

export default function AnalysisResultsPage() {
  const navigate = useNavigate()

  const handleSectionClick = (section) => {
    if (section === 'DEMOGRAPHICS') {
      navigate('/analysis/demographics')
    }
    // Add navigation for other sections when they're implemented
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div style={{ paddingTop: 120, paddingLeft: 12, paddingRight: 28 }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "0.02em", marginBottom: 18, paddingLeft: 0, marginLeft: 0 }}>A.I. ANALYSIS</div>
        
        <div style={{ fontSize: 18, color: "rgba(0,0,0,0.75)", lineHeight: 1.5, marginBottom: 4, paddingLeft: 0, marginLeft: 0 }}>
          A.I. HAS ESTIMATED THE FOLLOWING.
        </div>
        <div style={{ fontSize: 18, color: "rgba(0,0,0,0.75)", lineHeight: 1.5, marginBottom: 60, paddingLeft: 0, marginLeft: 0 }}>
          FIX ESTIMATED INFORMATION IF NEEDED.
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          width: "100%",
          minHeight: "400px"
        }}>
          <div className="analysis-diamond-container">
            <div className="analysis-diamond-top" onClick={() => handleSectionClick('DEMOGRAPHICS')}>
              <span>DEMOGRAPHICS</span>
            </div>
            <div className="analysis-diamond-left" onClick={() => handleSectionClick('COSMETIC CONCERNS')}>
              <span>COSMETIC<br />CONCERNS</span>
            </div>
            <div className="analysis-diamond-right" onClick={() => handleSectionClick('SKIN TYPE DETAILS')}>
              <span>SKIN TYPE DETAILS</span>
            </div>
            <div className="analysis-diamond-bottom" onClick={() => handleSectionClick('WEATHER')}>
              <span>WEATHER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
