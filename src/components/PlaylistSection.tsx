import React from 'react';
import SpotifyWebApi from "spotify-web-api-js";


interface IProps {
    playlistID?: string;
    token?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {playlistID, token} = props;

    // TODO: use an interface
    const audio_feature_dict: {[id: string]: number; } = {
        "acousticness": 0,
        "danceability": 0,
        "energy": 0,
        "instrumentalness": 0,
        "liveness": 0,
        "loudness": 0,
        "speechiness": 0,
        "tempo": 0,
        "valence": 0
    };

    const spotifyWebApi = new SpotifyWebApi();
    if (token) {
        spotifyWebApi.setAccessToken(token);
    }

    if (playlistID) {
        // load playlist info (TODO: refactor)
        spotifyWebApi.getPlaylistTracks(playlistID).then((response) => {
            const tracks: string[] = [];
            response.items.forEach(item => {
                tracks.push(item.track.id);
            });
            spotifyWebApi.getAudioFeaturesForTracks(tracks).then((response) => {
                //console.log(response);

                response.audio_features.forEach(track => {
                    // there must be a more elegant way to do this
                    audio_feature_dict["acousticness"] += track.acousticness;
                    audio_feature_dict["danceability"] += track.danceability;
                    audio_feature_dict["energy"] += track.energy;
                    audio_feature_dict["instrumentalness"] += track.instrumentalness;
                    audio_feature_dict["liveness"] += track.liveness;
                    audio_feature_dict["loudness"] += track.loudness;
                    audio_feature_dict["speechiness"] += track.speechiness;
                    audio_feature_dict["tempo"] += track.tempo;
                    audio_feature_dict["valence"] += track.valence;
                })

                // finally compute averages
                audio_feature_dict["acousticness"] /= tracks.length;
                audio_feature_dict["danceability"] /= tracks.length;
                audio_feature_dict["energy"] /= tracks.length;
                audio_feature_dict["instrumentalness"] /= tracks.length;
                audio_feature_dict["liveness"] /= tracks.length;
                audio_feature_dict["loudness"] /= tracks.length;
                audio_feature_dict["speechiness"] /= tracks.length;
                audio_feature_dict["tempo"] /= tracks.length;
                audio_feature_dict["valence"] /= tracks.length;
            })
        });
    }

    // TODO: need to make dict part of state because theres no values if I read it here
    // but there are values in the function above
    console.log(audio_feature_dict["acousticness"]);

    return (
        <div className="playlist">
            {playlistID === "" ? <p>Please select a playlist!</p> : <p>PlaylistID is {playlistID}</p> }
            <br />
            {playlistID !== "" ? <div>
                                    <p>Playlist Stats!</p>
                                    <p>acousticness: {audio_feature_dict["acousticness"]}</p>
                                    <p>danceability: {audio_feature_dict["danceability"]}</p>
                                    <p>energy: {audio_feature_dict["energy"]}</p>
                                    <p>instrumentalness: {audio_feature_dict["instrumentalness"]}</p>
                                    <p>liveness: {audio_feature_dict["liveness"]}</p>
                                    <p>loudness: {audio_feature_dict["loudness"]}</p>
                                    <p>speechiness: {audio_feature_dict["speechiness"]}</p>
                                    <p>tempo: {audio_feature_dict["tempo"]}</p>
                                    <p>valence: {audio_feature_dict["valence"]}</p>
                                </div> : null}
        </div>
    );
}

export default PlaylistSection;
