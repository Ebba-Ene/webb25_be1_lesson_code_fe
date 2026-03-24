import { apiFetch } from "./client"

    export async function getSongs(){
        try {
            const songs = await apiFetch('/api/songs/')
            return songs
        } catch(error) {
            console.warn("Unable to get songs", error)
            return []
        }
    }

    export async function getSong(id){
        try {
            const song = await apiFetch(`/api/songs/${id}`)
            return song
        } catch(error) {
            console.warn("Unable to get songs", error)
            return null
        }
    }

    export async function createSong(songData) {
        try {
            const song = await apiFetch(`/api/songs/`, {
                method: "POST"
            }, songData)
            return song
        } catch(error) {
            console.warn("Unable to create song", error)
            return null
        }
    }