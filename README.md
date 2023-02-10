# Waitlist

This project adds songs to a specified spotify playlist via API calls. 

The xxx.py file contains logic for searching any song's registered Spotify TrackID through a GET request, and then using that ID in a POST request to add to a given playlist.

The xxx.js file contains the API calls for Identity authentication needed to access and refresh authorization tokens required in the python API calls.

The end vision for this project will integrate a 'listening' component using Shazam or Apple Intents API (Siri) so user's phone can retrieve song information (title and artist) and pass to Spotify API using audio input only.
