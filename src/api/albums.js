import { apiFetch } from "./client"

export async function getAlbums(){
  try{
    const albums = await apiFetch('/api/albums/')
    return albums
  }catch(error){
      console.warn("Unable to get albums", error)
      return []
  }
}

export async function getAlbumsByArtist(artistId){
  try{
    const albums = await apiFetch(`/api/albums`)
    const artistAlbums = albums.filter(album => album.artist?._id === artistId)
    return artistAlbums
  }catch(error){
      console.warn("Unable to get albums", error)
      return []
  }
}

export async function getAlbum(id){
  try {
    const album = await apiFetch(`/api/albums/${id}`)
    return album
  } catch(error) {
      console.warn("Unable to get album", error)
      return null
  }
}

export async function createAlbum(albumData) {
  try {
    const album = await apiFetch(`/api/albums/`, {
        method: "POST"
    }, albumData)
    return album
  } catch(error) {
      console.warn("Unable to create album", error)
      return null
  }
}