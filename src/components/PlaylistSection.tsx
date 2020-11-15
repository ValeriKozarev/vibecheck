import React, {useState,useEffect,useMemo} from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import {AudioFeaturesDict} from "../types";
import {RadarChart, Radar, PolarGrid, PolarAngleAxis} from "recharts";

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

    const [radarData, setRadarData] = useState<object[]>();

    useEffect(() => {
        if (token && playlistID){
            // TODO: Last time I tried pulling this out into a separate file it became a mess because
            // of typing the API promises but I would still like to move it
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
                        // TODO: I'd like to make this cleaner but the API doesn't seem to have
                        // an index type for the audio features object
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

                    // recharts need specific format
                    let data = [
                        {
                            "feature": "acousticness",
                            "score": newPlaylistAudioFeatures.acousticness
                        },
                        {
                            "feature": "danceability",
                            "score": newPlaylistAudioFeatures.danceability
                        },
                        {
                            "feature": "energy",
                            "score": newPlaylistAudioFeatures.energy
                        },
                        // {
                        //     "feature": "instrumentalness",
                        //     "score": newPlaylistAudioFeatures.instrumentalness
                        // },
                        // {
                        //     "feature": "liveness",
                        //     "score": newPlaylistAudioFeatures.liveness
                        // },
                        // {
                        //     "feature": "loudness",
                        //     "score": newPlaylistAudioFeatures.loudness
                        // },
                        // {
                        //     "feature": "speechiness",
                        //     "score": newPlaylistAudioFeatures.speechiness
                        // },
                        // taking out tempo because it dominates the radar chart
                        // {
                        //     "feature": "tempo",
                        //     "score": newPlaylistAudioFeatures.tempo
                        // },
                        {
                            "feature": "valence",
                            "score": newPlaylistAudioFeatures.valence
                        }
                    ];

                    setRadarData(data);
                });
        }
    },[playlistID]);

    // TODO: make a section for Stats and place within PlaylistSection
    return (
        <div className="playlist">
            {playlistID === "" ? <p>Please select a playlist!</p> : null }
            <br />
            {playlistID !=="" ? <div className="radar">
                                    <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="feature" />
                                        <Radar name="audio features" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    </RadarChart>
                                </div> : null }
            <br />
            {playlistID !== "" ? <div className="stats">
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
                                </div> : null }
        </div>
    );
}

export default PlaylistSection;
