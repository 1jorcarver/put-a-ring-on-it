const messagebird = require('messagebird')(process.env.MESS_API_KEY);

const sendMessage = function(textMessage) {
  console.log(textMessage);
  return messagebird.messages.create({
  originator : '55555',
  recipients : [ textMessage ] ,
  body : 'Hello, my name is Harold and I will be your wedding planner',
  
},
  function(err, response) {
    if(err) {
      console.log("ERROR:");
      console.log(err);
    } else {
      console.log("SUCCESS:");
      console.log(response);

    }
  });
}

module.exports = sendMessage;