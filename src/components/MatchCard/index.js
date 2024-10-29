// Write your code here
import './index.css'

const MatchCard = props => {
  const {details} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = details

  return (
    <li className="matchCard-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo"
      />
      <p className="team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatus}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
