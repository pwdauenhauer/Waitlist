# Waitlist

This project adds songs to a specified spotify playlist via API calls. The playlist used for this project can be found at https://open.spotify.com/playlist/0d7uzo8caijsT9EaKsKCQS but eventually users will input or create desired playlists within the app

The Calls.py file contains logic for searching any song's registered Spotify TrackID through a GET request that returns the single most relevant search result based on inputs provided. It then uses that ID in a POST request to add to a given playlist.

The server.js file contains the API calls for Identity authentication needed to access and refresh authorization tokens required in the python calls.

The end vision for this project will integrate a 'listening' component using Shazam or Apple Intents API (Siri) so user's phone can retrieve song information (title and artist) and pass to this app using audio input only.
