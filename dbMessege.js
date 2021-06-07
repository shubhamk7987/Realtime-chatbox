import mongoose from "mongoose";

const test2Schema = mongoose.Schema([{
    name: String,
    messege: String,
    timestamp: String,
    received: Boolean
}]);

//collection
export default mongoose.model('messegecontents', test2Schema);


