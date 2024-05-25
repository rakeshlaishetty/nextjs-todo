import { ResponseMessage } from "@/helper/responseMessage";
import { Task } from "../../../models/tasks"
import { usersdata } from "../../../models/userdata"
import jwt from "jsonwebtoken";


export async function GET(response) {
    try {
        console.log("usersData")
        const newdata = await Task.find()
        console.log(newdata)

        return ResponseMessage("successfully fetched", true, 200, newdata)

    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }

}

export async function POST(request) {
    console.log("reached")
    try {

        const authToken = request.cookies.get("authToken")?.value;
        console.log(authToken);
        let data = null;
        if (process.env.JWT_KEY && authToken) {
            data = jwt.verify(authToken, process.env.JWT_KEY);
        }
        const user = await usersdata.findById(data._id).select("-password");
        if (!user) {
            throw new Error("user Id Does Not Exist ")

        }
        const { title, content, addedDate, status } = await request.json();
        const newData = new Task({ title, content, addedDate, status, userId: data?._id })
        console.log(title, content, addedDate, status, "this is data ")
        await newData.save()
        if (newData) {
            return ResponseMessage("Succefully Created", true, 201, newData)
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }
}
export async function PUT(request, { params }) {

}
