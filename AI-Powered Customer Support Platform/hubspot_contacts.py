import requests

# Replace with your private app access token
ACCESS_TOKEN = 'pat-na1-4af59138-b079-4bbb-8b17-4c78ce29496b'

# HubSpot API endpoint to fetch contacts
url = "https://api.hubapi.com/crm/v3/objects/contacts"

# Headers with Authorization
headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json"
}

# Make the API request
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad status codes

    # Display the response
    data = response.json()
    print("Contacts:", data)

except requests.exceptions.RequestException as e:
    print("Error connecting to HubSpot API:", e)
