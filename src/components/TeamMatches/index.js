// Write your code here
import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {matchesDetails: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: {
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        id: data.latest_match_details.id,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      updatedRecentMatch: data.recent_matches.map(eachMatch => ({
        id: eachMatch.id,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        matchStatus: eachMatch.match_status,
        result: eachMatch.result,
      })),
    }

    this.setState({matchesDetails: updatedData, isLoading: false})
  }

  getBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return id
  }

  render() {
    const {matchesDetails, isLoading} = this.state
    const {teamBannerUrl, latestMatch, updatedRecentMatch} = matchesDetails
    const teamColor = this.getBgColor()

    return (
      <div className={`teamMatches-container  ${teamColor}`}>
        {isLoading ? (
          // eslint-disable-next-line react/no-unknown-property
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="match-details-container">
            <img src={teamBannerUrl} alt="team banner" className="banner" />
            <LatestMatch matchDetails={latestMatch} />
            <ul className="recent-match-list-container">
              {updatedRecentMatch.map(eachMatch => (
                <MatchCard key={eachMatch.id} details={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
