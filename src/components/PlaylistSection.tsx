import React, {useState,useEffect,useMemo} from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import {AudioFeaturesDict} from "../types";

interface IProps {
    playlistID: string;
    token: string;
}

/**
 * Function Component representing an individual playlist and the stats calculated from it
 */
const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    // get the playlist information and access token from props
    const {playlistID, token} = props;

    const [playlistAudioFeatures, setPlaylistAudioFeatures] = useState<AudioFeaturesDict>(new AudioFeaturesDict());

    useEffect(() => {
        if (token && playlistID){
            const spotifyWebApi = new SpotifyWebApi();
            spotifyWebApi.setAccessToken(token);

            spotifyWebApi.getPlaylistTracks(playlistID).then(
                // get tracks in playlist
                function (trackResponse) {
                    return trackResponse.items.map(function (track) {
                        return track.track.id;
                    });
                })
                // get audio features for tracks
                .then(function (trackIDs) {
                    return spotifyWebApi.getAudioFeaturesForTracks(trackIDs);
                })
                // store data
                .then(function (trackAudioFeatures) {
                    console.log(trackAudioFeatures);
                    const newPlaylistAudioFeatures = new AudioFeaturesDict();

                    trackAudioFeatures.audio_features.forEach(track => {
                        newPlaylistAudioFeatures.acousticness += track.acousticness;
                        newPlaylistAudioFeatures.danceability += track.danceability;
                        newPlaylistAudioFeatures.energy += track.energy;
                        newPlaylistAudioFeatures.instrumentalness += track.instrumentalness;
                        newPlaylistAudioFeatures.liveness += track.liveness;
                        newPlaylistAudioFeatures.loudness += track.loudness;
                        newPlaylistAudioFeatures.speechiness += track.speechiness;
                        newPlaylistAudioFeatures.tempo += track.tempo;
                        newPlaylistAudioFeatures.valence += track.valence;
                    });

                    newPlaylistAudioFeatures.acousticness /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.danceability /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.energy /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.instrumentalness /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.liveness /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.loudness /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.speechiness /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.tempo /= trackAudioFeatures.audio_features.length;
                    newPlaylistAudioFeatures.valence /= trackAudioFeatures.audio_features.length;

                    setPlaylistAudioFeatures(newPlaylistAudioFeatures);
                });
        }
    },[playlistID]);

    return (
        <div className="playlist">
            {playlistID === "" ? <p>Please select a playlist!</p> : null }
            <br />
            {playlistID !== "" ? <div>
                                    <p>Playlist Stats!</p>
                                    <p>acousticness: {playlistAudioFeatures["acousticness"]}</p>
                                    <p>danceability: {playlistAudioFeatures.danceability}</p>
                                    <p>energy: {playlistAudioFeatures.energy}</p>
                                    <p>instrumentalness: {playlistAudioFeatures.instrumentalness}</p>
                                    <p>liveness: {playlistAudioFeatures.liveness}</p>
                                    <p>loudness: {playlistAudioFeatures.loudness}</p>
                                    <p>speechiness: {playlistAudioFeatures.speechiness}</p>
                                    <p>tempo: {playlistAudioFeatures.tempo}</p>
                                    <p>valence: {playlistAudioFeatures.valence}</p>
                                </div> : null}
        </div>
    );
}

export default PlaylistSection;
