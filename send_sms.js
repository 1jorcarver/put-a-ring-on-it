const messagebird = require('messagebird')(process.env.MESS_API_KEY);

const sendMessage = function(textMessage) {
  console.log(textMessage);
  return messagebird.messages.create({
  originator : '55555',
  recipients : [ textMessage ] ,
  // scheduledDatetime: eventdate.setHours(eventdate.gethour() - 24),
  body : 'Hello! My name is Murphy, your wedding planner! '
  
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