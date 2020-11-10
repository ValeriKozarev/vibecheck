import {IPlaylist} from "../data";

/**
 * Type to indicate a collection of playlist objects
 */
export type PlaylistEntries = IPlaylist[];

export class AudioFeaturesDict {
    // audio features defined by Spotify
    // definitions can be found here: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
    public acousticness: number;
    public danceability: number;
    public energy: number;
    public instrumentalness: number;
    public liveness: number;
    public loudness: number;
    public speechiness: number;
    public tempo: number;
    public valence: number;

    // default constructor should initialize all of these fields to 0
    constructor() {
        this.acousticness = 0;
        this.danceability = 0;
        this.energy = 0;
        this.instrumentalness = 0;
        this.liveness = 0;
        this.loudness = 0;
        this.speechiness = 0;
        this.tempo = 0;
        this.valence = 0;
    }
}
