const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.urlencoded({ extended: false }))

//node library for connectiong to zoho
/*
zoho uses oauth and by default self manages refresh and access tokens in a spcified mySQL module
by default the mySQL is running assummed to be running on default local server
can be changed in resources/oauth_configuration.properties under [mySQL] and the username and passwords can be added or changed there
Database with name zohooauth should be created and a table with below configurations should be present in the database. 
Table, named "oauthtokens", should have the columns "useridentifier" (varchar) "accesstoken" (varchar), "refreshtoken" (varchar) and "expirytime" (bigint).
follow the link below for informaion on custom token management
https://www.zoho.com/crm/developer/docs/server-side-sdks/node-js.html#Initialization
*/
const zoho = require('zcrmsdk');

//endpoint that returns the body of the response containing all the information on all the properties
//no input paratmeters
//response is a JSON containging first 25 properties
//data{[properties], info:{"per page", "count", "page", "more_records"}}
app.get('/properties', (req,res,next) => {
    zoho.API.MODULES.get({
            module:"Buildings",
            params: {
                page: 0,
                per_page: 25,
            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
            //the following prints true if theres more pages of records
            //console.log(JSON.parse(response.body).info.more_records);

            //below is an exaple of looping through each property in the JSON
            //for(record in response.data){
            //   var module_data = response.data[record];
            //   console.log(module_data);
        }).catch(next);
})

/*
endpoint that gets deals
takes no input
*/
app.get('/deals', (req,res,next) => {
    zoho.API.MODULES.get({
            module:"Deals",
            params: {
                page: 0,
                per_page: 25,
            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
            //the following prints true if theres more pages of records
            //console.log(JSON.parse(response.body).info.more_records);

            //below is an exaple of looping through each property in the JSON
            //for(record in response.data){
            //   var module_data = response.data[record];
            //   console.log(module_data);
        }).catch(next);
})

/*
endpoint to add new deal
takes x-www-form-urlencoded
- must take "Deal_Name" and "Stage" at a minumum or will return an error from zoho api
- check zoho for all other possible inputs (ZohoCRM -> setup -> Developer Space -> APIs -> API names)
- response json, example as follows
{
    "data": [
        {
            "code": "MANDATORY_NOT_FOUND",
            "details": {
                "api_name": "Deal_Name"
            },
            "message": "required field not found",
            "status": "error"
        }
    ]
}
or for success
{
    "data": [
        {
            "code": "SUCCESS",
            "details": {
                "Modified_Time": "2020-01-30T11:28:08-05:00",
                "Modified_By": {
                    "name": "Ethan Orlander",
                    "id": "3494024000000534001"
                },
                "Created_Time": "2020-01-30T11:28:08-05:00",
                "id": "3494024000023682001",
                "Created_By": {
                    "name": "Ethan Orlander",
                    "id": "3494024000000534001"
                }
            },
            "message": "record added",
            "status": "success"
        }
    ]
}
*/
app.post('/new_deal', (req,res,next) =>{
    //res.json(req.body);
    data = JSON.stringify(req.body);
    info = JSON.parse('{"data":['+ JSON.stringify(req.body)+ ']}');//JSON.parse('{\"data\":[{\"Deal_Name\":\"test\",\"Stage\":\"Inbound Lead\"}]}');
    input = {};
    input.module = "Deals";
    input.body = info;
    zoho.API.MODULES.post(input).then(function(response){
            console.log(response);
            response = JSON.parse(response.body);
            res.json(response)
    });
});

/*
endpoint to add new deal
takes same input as new_deal but must also take id of existing deal
- output is in the same structure
*/
app.put('/update_deal', (req,res,next) =>{
    //res.json(req.body);
    data = JSON.stringify(req.body);
    info = JSON.parse('{"data":['+ JSON.stringify(req.body)+ ']}');//JSON.parse('{\"data\":[{\"Deal_Name\":\"test\",\"Stage\":\"Inbound Lead\"}]}');
    input = {};
    input.module = "Deals";
    input.body = info;
    zoho.API.MODULES.put(input).then(function(response){
        console.log(response);
        response = JSON.parse(response.body);
        res.json(response);
    });
});

/*
endpoint to add new deal
takes same input as new_deal but must also take id of existing deal
- output is in the same structure
*/
app.put('/transition_deal', (req,res,next) =>{
    //res.json(req.body);
    data = JSON.stringify(req.body);
    info = JSON.parse('{"data": ['+ data + ']}');//JSON.parse('{\"data\":[{\"Deal_Name\":\"test\",\"Stage\":\"Inbound Lead\"}]}');
    input = {};
    input.module = "Deals";
    id = info.data[0].id;
    info.transition_id = id;
    //input.params = [id,info]
    //input.functions = "transition_stage"
    //delete info.data[0].id
    api_name = "transition_stage"
    input.body = info;
    console.log(input);
    zoho.API.FUNCTIONS.executeFunctionsInPost(input).then(function(response){
        console.log(response);
        response = JSON.parse(response.body);
        res.json(response);
    });
});
//prints all possible modules in CRM by their proper names for use during production
//takes no inputs
//prints a list of all the modules avaliable
app.get('/module_names', (req, res, next) => {
    var input = {};
    zoho.API.SETTINGS.getModules(input).then(function(response) {

	// Response of the API call is returned in the 'body'

	// Modules data value available as JSON Array of the 'modules' key of the JSON response
	// Each JSON object of the array corresponds to a module
	// By iterating the JSON objects of the array, individual module details can be obtained

        response = JSON.parse(response.body);
        response = response.modules;
        // Iterating the JSON array
        for(module in response) {
            var module_data = response[module];

            // For obtaining all the fields of the organization details, use the value of 'module_data' as such
		    //console.log(module_data);

		    // For obtaining a particular field, use module_data.<api-name of field>
		    // Sample API names: id, api_name
            console.log(module_data.api_name);
        }
    });
});

//production only
//retreives all information about the fields in the moduel "Deals"
app.get('/deal_fields', (req, res, next) => {
    var input = {module:"Deals"};
    zoho.API.SETTINGS.getFields(input).then(function(response) {

	// Response of the API call is returned in the 'body'

        response = JSON.parse(response.body);
        response = response.fields;
        // Iterating the JSON array
        res.json(response);
        for(module in response) {
            var module_data = response[module];

            // For obtaining all the fields of the organization details, use the value of 'module_data' as such

		    // For obtaining a particular field, use module_data.<api-name of field>
            // Sample API names: id, api_name
            if(module_data.system_mandatory == true){
                console.log(module_data.api_name);
                console.log(module_data.data_type);
                console.log(module_data.system_mandatory);
            }
        }
    });
});

/*
get request that takes 3 inputs
From: an address in string format
To: and address in string format
DepartureTime: ex. 2014-01-01 10:11:55
returns a json in this format
{
    "status": 200
    "statusText": "OK"
    "arrivalTime": "2014-01-01T10:11:55Z"
}
*/
app.get('/getTravelTime', (req, res, next) => {
    apiKey = 'AIzaSyDx4Yku_7ZMeKLkqKJsGdMr6egJTAz_0H0'
    location = req.body.From
    location = location.replace(" ", "+");
    destination = req.body.To
    destination = destination.replace(" ", "+");
    date = new Date(req.body.DepartureTime)
    url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&'+
    'origins=' + location + '&' +
    'destinations=' +destination +'&'+
    'key='+ apiKey
    const get_data = async url => {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json+ response.statusText);
          if(response.status != 200){
            throw new error(responseText);
          }
          seconds = json.rows[0].elements[0].duration.value
          date.setSeconds(date.getSeconds() + seconds);
          answer = {}
          answer.status = 200;
          answer.statusText = "OK"
          answer.arrivalTime = date
          res.json(answer)
      };
    
    get_data(url);
})

//error handeling middleware
app.use(function(error, req, res, next) {
    // Any request to this server will get here, and will send an HTTP
    //response with the error message
    res.json({response: 500, responseStatus: error.message});
});

/*
initialize zcrm client when app is started
*/
zoho.initialize().then(function()
{
    app.listen(3000);
})