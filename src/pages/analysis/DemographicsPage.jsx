import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { loadAI } from '../../lib/storage'

function sortScores(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([label, val]) => ({ label, pct: (val * 100).toFixed(2), raw: val }))
}

function ArcMeter({ value = 0.0, percentage = "0" }) {
  const size = 360
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * value
  const gap = c - dash

  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center", width: '100%' }}>
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: 360 }} className="dem-arc-svg">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#cfcfcf" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#111"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '36px',
        fontWeight: 800,
        color: '#111'
      }} className="dem-arc-percentage">
        {percentage}%
      </div>
    </div>
  )
}

export default function DemographicsPage() {
  const navigate = useNavigate()
  const [ai, setAi] = useState(null)
  const [actualRace, setActualRace] = useState("")
  const [actualAge, setActualAge] = useState("")
  const [actualGender, setActualGender] = useState("")
  const [activeCategory, setActiveCategory] = useState("race") // 'race', 'age', or 'gender'

  useEffect(() => {
    const loadedAi = loadAI()
    console.log('Loaded AI data from storage:', JSON.stringify(loadedAi, null, 2))
    setAi(loadedAi)
  }, [])

  const { raceList, ageList, genderList } = useMemo(() => {
    const race = ai?.data?.race ?? {}
    const age = ai?.data?.age ?? {}
    const gender = ai?.data?.gender ?? {}
    console.log('Demographics data (raw):', JSON.stringify({ race, age, gender }, null, 2))
    const sorted = {
      raceList: sortScores(race),
      ageList: sortScores(age),
      genderList: sortScores(gender)
    }
    console.log('Sorted demographics (first item in each):', {
      raceTop: sorted.raceList[0],
      ageTop: sorted.ageList[0],
      genderTop: sorted.genderList[0]
    })
    console.log('All sorted demographics:', JSON.stringify(sorted, null, 2))
    return sorted
  }, [ai])

  useEffect(() => {
    if (!actualRace && raceList.length) setActualRace(raceList[0].label)
    if (!actualAge && ageList.length) setActualAge(ageList[0].label)
    if (!actualGender && genderList.length) setActualGender(genderList[0].label)
  }, [raceList, ageList, genderList, actualRace, actualAge, actualGender])

  // Get current selected item and its percentage based on active category
  const getCurrentSelection = () => {
    if (activeCategory === 'race') {
      const selected = raceList.find(r => r.label === actualRace)
      return {
        label: actualRace || "-",
        value: selected ? selected.raw : 0.0,
        pct: selected ? selected.pct : "0"
      }
    } else if (activeCategory === 'age') {
      const selected = ageList.find(a => a.label === actualAge)
      return {
        label: actualAge || "-",
        value: selected ? selected.raw : 0.0,
        pct: selected ? selected.pct : "0"
      }
    } else {
      const selected = genderList.find(g => g.label === actualGender)
      return {
        label: (actualGender || "-").toUpperCase(),
        value: selected ? selected.raw : 0.0,
        pct: selected ? selected.pct : "0"
      }
    }
  }

  const currentSelection = getCurrentSelection()
  const currentList = activeCategory === 'race' ? raceList : activeCategory === 'age' ? ageList : genderList
  const categoryLabel = activeCategory === 'race' ? 'RACE' : activeCategory === 'age' ? 'AGE' : 'SEX'

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div className="dem-wrap" style={{ paddingTop: 140 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.02em" }}>A.I. ANALYSIS</div>
        <div className="dem-h1">DEMOGRAPHICS</div>
        <div className="dem-sub">PREDICTED RACE &amp; AGE</div>

        <div className="dem-content-layout">
          <div className="dem-cards">
            <button
              type="button"
              className={`dem-card ${activeCategory === 'race' ? 'black' : ''}`}
              style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => setActiveCategory('race')}
            >
              <div className="topline">{actualRace || "-"}</div>
              <div className="bottomline">RACE</div>
            </button>

            <button
              type="button"
              className={`dem-card ${activeCategory === 'age' ? 'black' : ''}`}
              style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => setActiveCategory('age')}
            >
              <div className="topline" style={{ color: activeCategory === 'age' ? 'white' : "rgba(0,0,0,0.8)" }}>{actualAge || "-"}</div>
              <div className="bottomline" style={{ color: activeCategory === 'age' ? 'white' : "rgba(0,0,0,0.85)" }}>AGE</div>
            </button>

            <button
              type="button"
              className={`dem-card ${activeCategory === 'gender' ? 'black' : ''}`}
              style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => setActiveCategory('gender')}
            >
              <div className="topline" style={{ color: activeCategory === 'gender' ? 'white' : "rgba(0,0,0,0.8)" }}>{(actualGender || "-").toUpperCase()}</div>
              <div className="bottomline" style={{ color: activeCategory === 'gender' ? 'white' : "rgba(0,0,0,0.85)" }}>SEX</div>
            </button>
          </div>

          <div className="dem-arc-block">
            <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '20px', textAlign: 'center' }}>
              {currentSelection.label}
            </div>
            <ArcMeter value={currentSelection.value} percentage={currentSelection.pct} />
            <div className="dem-arc-instruction">If A.I. estimate is wrong, select the correct one.</div>
          </div>

          <div className="dem-table">
            <div className="dem-table-head">
              <div>{categoryLabel}</div>
              <div style={{ textAlign: "right" }}>A.I. CONFIDENCE</div>
            </div>

            {currentList.length > 0 ? (
              currentList.map((opt) => {
                const isSelected = activeCategory === 'race' 
                  ? actualRace === opt.label
                  : activeCategory === 'age'
                  ? actualAge === opt.label
                  : actualGender === opt.label
                
                const handleClick = () => {
                  if (activeCategory === 'race') {
                    setActualRace(opt.label)
                  } else if (activeCategory === 'age') {
                    setActualAge(opt.label)
                  } else {
                    setActualGender(opt.label)
                  }
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`dem-row ${isSelected ? "selected" : ""}`}
                    style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer" }}
                    onClick={handleClick}
                  >
                    <div className="dem-left">
                      <div className="dem-radio" />
                      <div>{activeCategory === 'gender' ? opt.label.toUpperCase() : opt.label}</div>
                    </div>
                    <div className="dem-right">{opt.pct}%</div>
                  </button>
                )
              })
            ) : (
              <div className="dem-row" style={{ padding: "10px 12px", color: "rgba(0,0,0,0.45)" }}>
                <div>No data available</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dem-bottom-nav">
        <DiamondButton 
          label="BACK" 
          variant="white" 
          onClick={() => {
            console.log("🔵 DemographicsPage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Navigating to results page: /analysis/results")
            try {
              navigate("/analysis/results")
              console.log("🔵 Navigation to results page successful")
            } catch (error) {
              console.error("🔵 Error navigating:", error)
            }
          }} 
          className="diamond-btn-small" 
        />
        <DiamondButton label="HOME" variant="white" onClick={() => navigate("/")} className="diamond-btn-small" />
      </div>
    </div>
  )
}

