// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details

  return (
    <li className="li-container">
      <Link to={`/team-matches/${id}`} className="item-link">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="team-text">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
