const Ably = require('ably');
const ably = new Ably.Realtime('jBXOFQ.P8Xv2A:_Qw3NEd_EzEbonkXGj6wQ6A0k63sqifBYfG1xC_h4oQ');



const channel = ably.channels.get('foodprep-orders');
channel.subscribe('greeting', (message) => {
    console.log(`Received message: ${message.data}`);
});
channel.publish('greeting', 'hello!', function(err) {
    if(err) {
        console.log(err);
    }
    console.log('message published');
});

/*
ably.close(); // runs synchronously
console.log('Closed the connection to Ably.');
 */
