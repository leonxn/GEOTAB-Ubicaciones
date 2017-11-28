    var api = GeotabApi(function (authenticateCallback) {
    authenticateCallback('user@example.com', 'database', 'user', 'password', function(err) {
        console.error(err);
        });
    });
 var showDevice = function(deviceId,serial) {
        api.call("Get", {
            typeName: "DeviceStatusInfo",
            search: {
                deviceSearch: { id: deviceId }
            }
        }, function(statuses) {
            if (statuses[0]) {
                var estado = statuses[0],
                    coords = estado.latitude + "," + estado.longitude,lat=estado.latitude,lon=estado.longitude;
                    api.call("GetAddresses", {
                            coordinates: [
                                {x: lon, y: lat} // 3
                            ]
                        }, function (geo) {
                            console.log(coords + ' / ' + geo[0].formattedAddress + ' / ' + serial); // 4
                        }, function (error) {
                            console.log(error);
                        }); 
             } else {
                console.log("No se encontro localización");
            }

        });  
    }, 


    var vehiculos = []
    api.call('Get', {
        typeName: 'Device'
    }, function(devicess)
    {fromDate = new Date()
          toDate = new Date()
          fromDate.setDate(fromDate.getDate() -1)
         for (var i = 0; i < devicess.length; i++)
        {
            vehiculos[devicess[i].id] = devicess[i].licensePlate 
                api.call("Get", {
                    "typeName": "Device",
                    fromDate : fromDate,
                     toDate :   toDate,
                     search: {
                         id : devicess[i].id
                    }
                }, function(devices) {
                    if (devices[0]) {
                        showDevice(devices[0].id,devices[0].serialNumber);
                    } else {
                        console.log("Device not found!");
                    }
                }); 
        } 
    });