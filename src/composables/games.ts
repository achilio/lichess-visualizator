import ndjson from 'ndjson'
import fetch from 'node-fetch'

export const fetchGames = async (username: string, max: number) => {
  console.log(`Fetching games for ${username}...`)
  const stream = await fetch(
    `https://lichess.org/api/games/user/${username}?max=${max}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/x-ndjson',
      },
    }
  )
  const reader = stream.body?.pipe(ndjson.parse()).on('data', (data: any) => {
    console.log(data)
  })
}
