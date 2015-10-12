// TODO: add unsubscribe or something
import _ from 'underscore';

var subscribers = {};

function subscribe(message, callback) {
    if (!_.isArray(subscribers[message])) subscribers[message] = [callback];
    else subscribers[message].push(callback);
}

function publish(message, args) {
    if (subscribers.hasOwnProperty(message)) {
        _.each(subscribers[message], function (c) {
            c(args);
        });
    }
}

export default {
    subscribe: subscribe,
    publish: publish
};
