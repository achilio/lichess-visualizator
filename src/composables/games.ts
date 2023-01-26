const ndjson = require('ndjson')

// export const readStream = (processLine: any) => (response: Response) => {
//   const matcher = /\r?\n/
//   const decoder = new TextDecoder()
//   let buf = ''
//   return new Promise<void>((resolve, fail) => {
//     response.body?.on('data', (v: any) => {
//       const chunk = decoder.decode(v, { stream: true })
//       buf += chunk

//       const parts = buf.split(matcher)
//       buf = parts.pop() || ''
//       for (const i of parts.filter((p) => p)) processLine(JSON.parse(i))
//     })
//     response.body?.on('end', () => {
//       if (buf.length > 0) processLine(JSON.parse(buf))
//       resolve()
//     })
//     response.body?.on('error', fail)
//   })
// }

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
  console.log(stream)
  const reader = stream.body?.pipeThrough(ndjson.parse())
  console.log(reader)
  // .then((res) => {
  //   console.log(res.body)
  //   return ndjson(res.body)
  // })
  // .then((stream) => {
  //   const reader = stream.getReader()
  //   let read: any
  //   reader.read().then(
  //     (read = (result: any) => {
  //       if (result.done) {
  //         reader.releaseLock()
  //         return
  //       }
  //       console.log(result.value)
  //       reader.read().then(read)
  //     })
  //   )
  // })
}
