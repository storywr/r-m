import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import { Typography } from '@material-ui/core'

const Wrapper = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-around';
  overflow: 'hidden';
  margin-top: 2rem;
`

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        image
        name
        gender
        species
        status
        episode {
          id
          name
          episode
          air_date
        }
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`

interface Character {
  id: string | number
  name: string
  image: string
  species: string
  status: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

const EpisodeDetails = () => {
  const { id } = useParams()
  const history = useHistory()

  const { data, error, loading } = useQuery(GET_EPISODE, {
    variables: { id: id! }
  })

  return (
    <>
      {data ?
        <>
          <Typography
            variant='h2'
          >
            {data.episode.name}
          </Typography>
          <Typography
            variant='h4'
          >
            {data.episode.episode}
          </Typography>
          <Typography
            variant='h6'
            gutterBottom
          >
            {data.episode.air_date}
          </Typography>
          <Wrapper>
            <GridList cols={7}>
              {data.episode.characters.map((character: Character) => (
                <GridListTile key={character.id}>
                  <img src={character.image} alt={character.name} />
                  <GridListTileBar
                    title={character.name}
                    actionIcon={
                      <IconButton
                        aria-label={`star ${character.name}`}
                        onClick={() => history.push(`/character/${character.id}`)}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Wrapper>
        </>
      :
        <LinearProgress />
      }
    </>
  )
}

export default EpisodeDetails