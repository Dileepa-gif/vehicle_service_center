const FCM = require("fcm-node");
const serverKey =
  "AAAA2I7IZNI:APA91bGdOBOgYf6sO3dEULAhFLG1QGH0o-dzY-Y4Euq5JJC44hwqeB2GwLhluBymCt3A16nApwnPq1M5en9YGNOaIi9_UYcZyel5Ejy18dcDzjNe9NCcRK5nPP4I7kOzFdjPY9tbxB8A";
const fcm = new FCM(serverKey);

exports.serviceDoneNotification = async function (service, fcm_token_arr) {
  const notification = {title : "Service Done!", body : `Completed service number ${service.id} related to ${service.vehicle_number} vehicle. Please make the payment.`};
  fcm_token_arr.forEach((fcm_token) => {
    notificationSender(fcm_token.fcm_token, notification, service);
  })
};


function notificationSender(fcm_token,notification, service) {
    var message = {
        to: fcm_token,
        notification: {
          title: notification.title,
          body: notification.body,
        },
      
        data: service,
      };
      
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!" + err);
          console.log("Response:! " + response);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
  };




