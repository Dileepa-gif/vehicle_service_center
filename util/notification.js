const FCM = require("fcm-node");
const serverKey =
  "AAAAikw2yXo:APA91bGEHcn1T3cM0qD_4FDK1eOR7gkiRIQktmONNQOXQxyUFRf8nhkNLqYbsb6N4E57H-f_tXVMOCZs5qhJ-vpp7UcvwWyq1NfmFPAxWAwJKqqwImufrgOlx14rbV3Y_KVGMis3-ea2";
const fcm = new FCM(serverKey);

exports.serviceDoneNotification = async function (service_id, vehicle_number, fcm_token_arr) {
  const notification = {title : "Service Done!", body : `Completed service number ${service_id} related to ${vehicle_number} vehicle. Please make the payment.`};
  fcm_token_arr.forEach((fcm_token) => {
    notificationSender(fcm_token.fcm_token, notification);
  })
};


function notificationSender(fcm_token,notification) {
    var message = {
       // to: "ejx-PyTiQJy2DTkqUn0HC5:APA91bEps_l1yVqOA78Mtl5V4Cba_B-y1HdMg_KyIrbzHG51eQ-8gW68bSRlW3AHNYFgLPqpz2X_W2lD4DDlsD9oiIQAZpYmoATklOQk3MPA5TQfyJENNSPLm1SV9x9DkzYkS_0-m4SR",
       to: fcm_token,
        notification: {
          title: notification.title,
          body: notification.body,
        },
      
        data: {
          //you can send only notification or only data(or include both)
          title: notification.title,
          body: notification.body,
        },
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




