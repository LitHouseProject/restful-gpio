# restful-gpio
This a React frontend with a Flask backend (python 3) application. The app is a REST API backend to control the GPIO pins of a raspberry pi by making HTTP requests to the **/pins** and **/pins/<id>** endpoints. This project uses a breadboard, single LED Lights, and a raspberry pi to show a proof of concept on how to control LED lights via a website. This app could easily be trigger and process more complex events to control the pins of a Pi beyond lighting up an LED lights

## Step 1: HTTP Methods
These requests use the standard HTTP Requests **GET**, **POST**, **PUT**, and **DELETE**. We also use **PATCH** for partial updates to enable us to just send a **state** update to an existing pin endpoint. This will make sending requests through Python requests library a little more succint as we'll mainly be interested in changing the state for making our light show 

The JSON model of the **pin** resouce is:
```
{
	"id": "Integer(readonly=True, description='The pin unique id')",
	"pin-num": "Integer(required=True, description='GPIO pin associated with this endpoint')",
	"color": "String(required=True, description='LED color')",
	"state": "String(required=True, description='LED on or off')"
}
```
<br/>

* **POST** `pins/`: Create a new pin
	* Where the posted data is JSON:
		```
		{
			"pin-num": 23,
			"color": "red",
			"state": "on"
		}
		```
	* STATUS code 201
		* `Created new resource` is returned in the body of the message

* **GET** `pins/`: Read all pins stored on the system
	* Where the response back is JSON:
		```
		{
			"id": 1,
			"pin-num": 23,
			"color": "blue",
			"state": "on"
		},
		{
			"id": 2,
			"pin-num": 21,
			"color": "red",
			"state": "off"
		}
		```
	* STATUS code 200
		* On success

* **GET** `pins/<id>`: Read a pin given its resource id
	* Where the response back is JSON:
	```
	{
		"id": 2,
		"pin-num": 12,
		"color": "blue",
		"state": "off"
	}
	```
	
	* STATUS code 200
		* On success

* **PUT** `pins/<id>`: **Update** a pin given its resource id
	* Update all fields of pin with id 2
		* PUT `/pins/2`
			```
			{
				"pin-num": 24,
				"color": "blue",
				"state": "off"
			}
			```
	* STATUS code 200
		* On success

* **DELETE** `pins/<id>`: **Delete** pin from system
	* STATUS code 204
		* On success

* **PATCH** `pins/<id>`: **Partially Update** a pin given its resource id
	* Allows user to update a single field or all fields (except for its id b/c its READ ONLY)
	* Update the state of pin with id 2
		```
		{"state": "off"}
		```
	* STATUS code 200
		* On success
**NOTE**: <i>These pin numbers refer to the GPIO pin numbers, not the generic numbering</>


## Step 2: Try it out

```
> curl "http://localhost:5000/pins/"
>  curl "http://localhost:5000/pins/1"
> curl -X PATCH "http://localhost:5000/pins/3" -H "Content-Type: application/json" -d "{ \"state\": \"on\" }" 
