import { apiFetch } from "./client"

export async function getArtists(){
  try{
    const artists = await apiFetch('/api/artists/')
    return artists
  }catch(error){
      console.warn("Unable to get artists", error)
      return []
  }
}

export async function getArtist(id){
  try {
    const artist = await apiFetch(`/api/artists/${id}`)
    return artist
  } catch(error) {
      console.warn("Unable to get artist", error)
      return null
  }
}

export async function createArtist(artistData) {
  try {
    const artist = await apiFetch(`/api/artists/`, {
        method: "POST"
    }, artistData)
    return artist
  } catch(error) {
      console.warn("Unable to create artist", error)
      return null
  }
}