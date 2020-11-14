const messagebird = require('messagebird')(process.env.MESS_API_KEY);

const sendMessage = function(textMessage, eventdate, title) {
  console.log(textMessage);
  return messagebird.messages.create({
  originator : '55555',
  recipients : [ textMessage ] ,
  scheduledDatetime: eventdate.setHours(eventdate.gethour() - 24),
  body : 'Your event, ' + title + 'is coming up!'
  
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