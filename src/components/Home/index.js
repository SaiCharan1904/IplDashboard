// Write your code here
import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const teamData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teams: teamData, isLoading: false})
  }

  renderGetTeamCard = () => {
    const {teams} = this.state

    return (
      <ul className="teamsList-container">
        {teams.map(eachTeam => (
          <TeamCard key={eachTeam.id} details={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
              alt="ipl logo"
              className="logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            // eslint-disable-next-line react/no-unknown-property
            <div className="loader-container" testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            this.renderGetTeamCard()
          )}
        </div>
      </div>
    )
  }
}

export default Home
