$( () => {

const SPOTIFY_URL = "https://spotify-api-wrapper.appspot.com"

const getArtist = async(url) => {
    console.log(url)
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)

    let artist = data.artists.items[0];

    $('.artist').empty().append (
        `
            <p>${artist.name}</p>
            <img src="${artist.images[0].url}" alt="${artist.name}"/>
        `
    )

    getTracks(SPOTIFY_URL + "/artist/" + artist.id + "/top-tracks");

}

const getTracks = async (url) => {
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)

    let tracks = data.tracks;
    console.log(tracks)

    tracks.map(track => {
        $('.artist').append (
           
            `<div class="track">
            <img src="${track.album.images[1].url}" alt="${track.album.name}"
            <p class="track-name">${track.name}/<p>
           <audio controls>
           <source src=${track.preview_url}/>
           </audio> 
           </div> 
           `
        )
        console.log(track.preview_url)
    })
    
}



$('.artist-button').on("click" , () => {
   let artistName = $('#artist-search').val()

   getArtist(SPOTIFY_URL + "/artist/:" + artistName)
})


})