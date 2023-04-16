const Ably = require('ably');
const ably = new Ably.Realtime('jBXOFQ.P8Xv2A:_Qw3NEd_EzEbonkXGj6wQ6A0k63sqifBYfG1xC_h4oQ');



const channel = ably.channels.get('foodprep-orders');
channel.subscribe('foodprep-orders', (message) => {
    console.log(`Received message: ${message.data}`);
});
channel.publish('foodprep-orders', 'hello!', function(err) {
    if(err) {
        console.log(err + 'error');
    }
    console.log('message published');
});

/*
ably.close(); // runs synchronously
console.log('Closed the connection to Ably.');
 */
