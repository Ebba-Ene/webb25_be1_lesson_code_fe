import { useState } from "react";
import { createSong } from "../../api/songs";

export default function CreateSongForm({ setRefreshKey }) {
  const [artist, setArtist] = useState("69a893ba5c0dfc919d16c189");
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState(null);
  const [length, setLength] = useState(0);

  //TODO: fetch and save artists
  //TODO: populate <select> with artists
  //TODO: set artist

  const handleSubmit = async (e) => {
    e.preventDefault();
      
      const song = await createSong({
          artist,
          title,
          album,
          length,
        })
        if(!song) {
            alert("Song could not be created")
            return
        }

        setRefreshKey(key => key+1)
        // setArtist()
        setTitle('')
        setAlbum(null)
        setLength(0)
        
    };

  return (
    <div className="create-song-form">
      <h3>Create new song</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="song-title">Song title</label>
          <input
            id="song-title"
            type="text"
            required
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="song-length">Length (seconds)</label>
          <input
            id="song-length"
            type="number"
            required
            min={0}
            step={1}
            placeholder="0"
            value={length}
            onChange={(e) => setLength(Math.round(Number(e.target.value)))}
          />
        </div>
        <button type="submit" className="btn-primary">
          Create song
        </button>
      </form>
    </div>
  );
}
