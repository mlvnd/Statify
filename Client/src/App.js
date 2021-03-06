import React, { Component } from 'react';
import './App.css';
import login from './login.svg';
import spotify from './spotify.png';
import twitter from './twitter.png';
import github from './github.png';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'


import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: 'http://www.scottishculture.org/themes/scottishculture/images/music_placeholder.png?' },
      artistDetails: {artists: {items: []}},
      trackDetails: {tracks: {items: []}},
      auth: token,
      portemail: 'http://localhost:81'
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
        
      })
  }

  getShortTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    var data = JSON.parse(xmlHttp.responseText);
    if(xmlHttp.response > 400)
      alert("please log in")
    this.setState({
      artistDetails: {artists: data}
    })
    console.log(this.state.artists);
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
  }
  getMediumTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    var data = JSON.parse(xmlHttp.responseText);
    if(xmlHttp.response > 400)
      alert("please log in")
    this.setState({
      artistDetails: {artists: data}
    })
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
  }
  getLongTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      artistDetails: {artists: data}
    })
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
    console.log(data)
  }

  

  render() {
    return (
      <div className="App">
        <AppBar position="static" style={{"background-color": "#1db954"}}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container 
              spacing={24}
            >
              <Grid item>
                <Typography variant="h2" color="inherit">
                  MySpotify
                </Typography>
              </Grid>
              {/*<Grid item>
                <Avatar src={user} />
              </Grid>*/}
            </Grid>
          </Toolbar>
        </AppBar>
        <br />
        {!this.state.loggedIn &&
        <a href="http://localhost:81"> <img src={login} style={{ height: 35 }}  /> </a> }
        <div style={{"color":"white"}}>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150, width: 150 }}/>
        </div>
        
        { this.state.loggedIn &&
          <Button variant="contained" color="primary" onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </Button>
        }
        <br />
        <br />
        <Grid               
          container 
          spacing={16}
          justify="center"
        >
          <Grid item>
            { this.state.loggedIn &&
            <Button variant="contained" color="primary" onClick={() => this.getShortTerm()}>
                Show Short Term
                (4 weeks)
            </Button>
            }
          </Grid>
          <Grid item>
            { this.state.loggedIn &&
            <Button variant="contained" color="primary" onClick={() => this.getMediumTerm()}>
                Show Medium Term
                (6 months)
            </Button>
            }
          </Grid>
          <Grid item>
            { this.state.loggedIn &&
            <Button variant="contained" color="primary" onClick={() => this.getLongTerm()}>
                Show Long Term
                (Years)
            </Button>
            }
          </Grid>
        </Grid>
        <br />

        {/*RENDER ARTISTS AND TRACKS DATA*/}
          <div className="root">
            <h1 style={{"color":"white"}}> ARTISTS </h1>
            <GridList className="gridList">
              {this.state.artistDetails.artists.items.map((artist, index) => (
                <GridListTile key={artist.name} style ={{"height":"300px", "width":"300px"}}>
                  { artist.images[0] && 
                  <img src={artist.images[0].url}/>}
                  <GridListTileBar
                    title={(index+1) + ". " + artist.name}
                    actionIcon={
                      <a href={artist.uri}>
                        <img src={spotify} style ={{"height":"20px", "width":"20px"}}/>
                      </a>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="root">
            <h1 style={{"color":"white"}}> TRACKS </h1>
            <GridList className="gridList">
              {this.state.trackDetails.tracks.items.map((track, index) => (
                <GridListTile key={track.name} style ={{"height":"300px", "width":"300px"}}>
                  { track.album.images[0] && 
                  <img href="google.com" src={track.album.images[0].url}/>}
                  <GridListTileBar
                    title={(index+1) + ". " + track.name}
                    subtitle={<span>{track.artists[0].name}</span>}
                    actionIcon={
                      <a href={track.uri}>
                        <img src={spotify} style ={{"height":"20px", "width":"20px"}}/>
                      </a>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <AppBar position="static" style={{"background-color": "#1db954"}}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container 
              spacing={24}
              style={{"justifyContent": "center"}}
            >
              <Grid item>
              <Typography variant="body2" color="inherit">
                  Built by Nojan Sheybani
                </Typography>
                <Typography variant="body2" color="inherit">
                  All data belongs to Spotify. This website is not endorsed by Spotify.
                </Typography>
                <Typography variant="body2" color="inherit">
                  Contact me: nds4jp@virginia.edu
                </Typography>
                <Typography>
                  <a href="https://google.com" target="_blank"> 
                    <img src={twitter} style={{"width":"20px", "height":"20px"}}/>
                  </a>
                  <a href="https://github.com/nickshey/Statify" target="_blank"> 
                    <img src={github} style={{"width":"20px", "height":"20px"}}/>
                  </a>
                </Typography>
                <a href="https://donorbox.org/donate-if-ya-want" target="_blank">
                  <img src="https://d1iczxrky3cnb2.cloudfront.net/button-small-blue.png" />
                </a>
              </Grid>
              {/*<Grid item>
                <Avatar src={user} />
              </Grid>*/}
            </Grid>
          </Toolbar>
        </AppBar>
        {/*
        <div class="left-half">
        <h1> Artists </h1>
        {this.state.artistDetails.artists.items.map(artist => (
          <div>
              { artist.images[0] &&
              <div>
              <img src={artist.images[0].url} style={{ height: 150, width: 150 }}/> <br />
              </div>
              }
              <a href={artist.uri}> {artist.name} </a>
              <br />
              <br />
          </div>
        ))}
        </div>
        <div class="right-half">
        <h1> Tracks </h1>
        {this.state.trackDetails.tracks.items.map(track => (
          <div>
              { track.album.images[0] &&
              <div>
              <img src={track.album.images[0].url} style={{ height: 150, width: 150 }}/> <br />
              </div>
              }
              <a href={track.uri}> {track.name} </a>
              <p> {track.artists[0].name} </p>
          </div>
        ))}
        </div>
            */}
      </div>
    );
  }
}

export default App;