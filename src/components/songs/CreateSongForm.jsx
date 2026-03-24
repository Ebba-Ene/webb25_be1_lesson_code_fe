import { useState, useEffect } from "react";
import { createSong } from "../../api/songs";
import { getArtists } from "../../api/artists";
import { getAlbums, getAlbumsByArtist } from "../../api/albums";


export default function CreateSongForm({ setRefreshKey }) {
  const [artistId, setArtistId] = useState(null);
  const [title, setTitle] = useState('');
  const [albumId, setAlbumId] = useState(null);
  const [length, setLength] = useState(0);

  //TODO: fetch and save artists
  const[artists, setArtists] = useState([])
  const[albums, setAlbums] = useState([])
  
  //TODO: populate <select> with artists
      async function _getArtists(){
         const _artists = await getArtists()
         setArtists(_artists)
      }
  
      useEffect(() => {
          _getArtists()
      }, [])

    async function _getAlbums(artistId){
        console.log('Artist skickad till _getAlbums:', artistId)
        const _albums = await getAlbumsByArtist(artistId)
        setAlbums(_albums)
    }

      useEffect(() => {
        if(!artistId) return;
        _getAlbums(artistId)
      }, [artistId])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const song = await createSong({
      artistId,
      title,
      albumId,
      length,
    })
    if(!song) {
      alert("Song could not be created")
      return
    }
    
    setRefreshKey(key => key+1)
    // setArtist()
    setTitle('')
    setAlbumId(null)
    setLength(0)  
  };
  
  //TODO: set artist
  const handleArtistChange = async (e) => {
    const selectedId = e.target.value
    setArtistId(selectedId)
    setAlbumId(null)

    _getAlbums(selectedId)
  }

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
        <div className="form-group">
          <label htmlFor="song-artist">Artist</label>
          <select value={artistId} onChange={handleArtistChange}>
            <option value=""> -- Välj Artist -- </option>
           { artists.map(artist => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
           ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="song-album">Album</label>
          <select value={albumId || ""} onChange={e => setAlbum(e.target.value || null)}>
            <option value=""> -- Välj album -- </option>
            { albums.map(a => (
              <option key={albumId._id} value={albumId._id}>
                {albumId.title}
              </option>
           ))}
          </select>
        </div>
        <button type="submit" className="btn-primary">
          Create song
        </button>
      </form>
    </div>
  );
}
