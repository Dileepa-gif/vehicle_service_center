const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


  
function issueJWT(user, status) {
  const expiresIn = '2w';

  const payload = {
    sub: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      status : status
    },
    iat: Date.now()
  };
  const signedToken = jsonwebtoken.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn});

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
    sub: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      status : status
    }
  }
}

// function adminAuthMiddleware(req, res, next) {
//   if (req.headers.authorization) {
//     const tokenParts = req.headers.authorization.split(' ');
    
//     if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {


//       try {
//         const verification = jsonwebtoken.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET);
//         if(verification.sub.status=== "ADMIN"){
//           req.jwt = verification;
//           next();
//         }else{
//           res.status(200).json({ code :200, success: false, message: "You are not an admin" });
//         }

//       } catch (err) {
//         res.status(200).json({ code :200, success: false, message: "You must login as an admin to visit this route" });
//       }

//     } else {
//       res.status(200).json({ code :200, success: false, message: "You must login as an admin to visit this route" });
//     }
//   } else {
//     res.status(200).json({ code :200, success: false, message: "You must login as an admin to visit this route" });
//   }
// }





// function employeeAuthMiddleware(req, res, next) {
//   if (req.headers.authorization) {
//     const tokenParts = req.headers.authorization.split(' ');
    
//     if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {


//       try {
//         const verification = jsonwebtoken.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET);
//         if(verification.sub.status=== "EMPLOYEE"){
//           req.jwt = verification;
//           next();
//         }else{
//           res.status(200).json({ code :200, success: false, message: "You are not an employee" });
//         }

//       } catch (err) {
//         res.status(200).json({ code :200, success: false, message: "You must login as an employee to visit this route" });
//       }

//     } else {
//       res.status(200).json({ code :200, success: false, message: "You must login as an employee to visit this route" });
//     }
//   } else {
//     res.status(200).json({ code :200, success: false, message: "You must login as an employee to visit this route" });
//   }
// }



const authMiddleware = (status_arr) => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      const tokenParts = req.headers.authorization.split(' ');
      
      if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
  
  
        try {
          const verification = jsonwebtoken.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET);
          var temp = true;
          var status_list = '';
          status_arr.forEach((status) => {
            status_list=status_list + ', ' +status
            if(verification.sub.status=== status){
              req.jwt = verification;
              temp = false;
              next();
            }
          });
          if(temp){
            res.status(200).json({ code :200, success: false, message: "You are not" +  status_list});
          }
  
        } catch (err) {
          res.status(200).json({ code :200, success: false, message: "You must login to visit this route" });
        }
  
      } else {
        res.status(200).json({ code :200, success: false, message: "You must login to visit this route" });
      }
    } else {
      res.status(200).json({ code :200, success: false, message: "You must login to visit this route" });
    }
  }
}

module.exports.issueJWT = issueJWT;

module.exports.authMiddleware = authMiddleware;
