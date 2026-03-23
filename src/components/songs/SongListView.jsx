import { useEffect, useState } from "react";
import SongList from "./SongList";
import { getSongs } from "../../api/songs";
import CreateSongForm from "./CreateSongForm";


export default function SongListView() {

    const [songs, setSongs] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)


    async function _getSongs(){
       const _songs = await getSongs()
       setSongs(_songs)
    }


    useEffect(() => {
        _getSongs()
    }, [refreshKey])

    console.log(refreshKey)

    return (
        <div>
            <CreateSongForm setRefreshKey={setRefreshKey}/>
            <SongList songs={songs}/>
        </div>
    )
}