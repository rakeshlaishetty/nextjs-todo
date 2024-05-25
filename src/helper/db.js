import mongoose from "mongoose"
export const connectDb = async () => {
    try {

        const { connection } = await mongoose.connect(process.env.MONGO_URL)
        // console.log(connection,'connection')
        console.log('connection Establshed')
    } catch (err) {
            console.log(err)
    }
}