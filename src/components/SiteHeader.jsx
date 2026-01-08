import { Link } from 'react-router-dom'

export default function SiteHeader({ section }) {
  return (
    <div className="site-header">
      <div className="brand">
        <Link to="/" style={{ textDecoration: 'none', color: '#111' }}>
          SKINSTRIC
        </Link>
        <img
          alt="left-bracket"
          loading="lazy"
          width={5}
          height={19}
          src="/Rectangle_2710.png"
          style={{ width: '5px', height: '19px' }}
        />
        <span className="section">{section}</span>
        <img
          alt="right-bracket"
          loading="lazy"
          width={5}
          height={19}
          src="/Rectangle_2711.png"
          style={{ width: '5px', height: '19px' }}
        />
      </div>
      <button className="enter-code">
        ENTER CODE
      </button>
    </div>
  )
}

