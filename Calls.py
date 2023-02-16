from pip._vendor import requests
import json
import re

#Authorization token generated manually from spotify API console - will retrieve from server.js in future
currentAuth = 'BQCBiAHtAt6EIpczFzVK1_0iz-ANu_vHO3GV76G3o1P7SMXkFilzce9X5xXD2zyW91Y9Bc6xxnes4zmr_fRdqw6vlT9LGbnJw8EkRynmAtA1H-FeVp3zzq2j_--Nv1OewkEALP50kxLtKRemQ1Wcf6Ao5QBXl3gcijTA3nFBb6gQcgDXxQydhoeG7G-eaQ5sUUfO_qdjTr7U_1w4-ck'

title1 = 'ignition'     #manual input of desired song addition
artist1 = ''                            #artist variable doesn't need a value

def getCall(auth, title, artist):       #GET request to search trackID from user input above

    callTitle = title.replace(' ', '%20')
    if artist == '':      
        callArtist = ''   #callArtist should be empty if artist is
    else:
        callArtist = '%20artist%3A' + artist.replace(' ', '%20')
    url = 'https://api.spotify.com/v1/search?q=track%3A'+callTitle+callArtist+'&type=track&limit=1' #format & compile API url

    response = requests.get(url, headers={'Authorization': 'TOK: Bearer '+ auth}) #run the GET request

    if response.status_code == 200:
        print("sucessfully fetched the data")
        print(response.json())

        #text = json.dumps(response.json())
        #trackID = re.search('spotify:track:(.*?)"', text)   

        resJ = response.json()
        trackID = resJ['tracks']['items'][0]['id'] #retrieve trackID from JSON object driectly, which is more efficient than the regex method commented out above
        return trackID
    
    else:
        print(f"Sorry, there's a {response.status_code} error with your request")


def postCall(auth, id):   # POST request using track ID from previous request and same Authorization token

    postURL = 'https://api.spotify.com/v1/playlists/0d7uzo8caijsT9EaKsKCQS/tracks?uris=spotify%3Atrack%3A'+id #format & compile API url

    response = requests.post(postURL, headers={'Authorization': 'TOK: Bearer '+ auth}) #run POST request

    if response.status_code == 201:
        print("sucessfully posted the data")
    else:
        print(f"Sorry, there's a {response.status_code} error with your request")


requestedID = getCall(currentAuth, title1, artist1) 

print(requestedID)

postCall(currentAuth, requestedID)
