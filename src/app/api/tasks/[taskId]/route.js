import { ResponseMessage } from "@/helper/responseMessage"
import { Task } from "@/models/tasks"
import mongoose from "mongoose"
export async function DELETE(request, { params }) {
    try {
        console.log(params, "params")
        const { taskId } = params
        console.log(taskId, "taskId")
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error("Please provide Proper taskId ")
        }
        const isexisting = await Task.findOne({ _id: taskId })
        if (!isexisting) {
            return ResponseMessage("Task data Not Found", false, 404, null)
        } else {
            await Task.findOneAndDelete({ _id: taskId })
        }
        return ResponseMessage("successfully Deleted", true, 200, null)
    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }

}

export async function GET(request, { params }) {
    try {
        console.log(params, "params")
        const { taskId } = params
        console.log(taskId, "taskId")
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error("Please provide Proper taskId ")
        }
        const isexisting = await Task.findOne({ _id: taskId })
        if (!isexisting) {
            return ResponseMessage("Task data Not Found", false, 404, null)
        }
        return ResponseMessage("successfully fetched", true, 200, isexisting)
    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }

}



export async function PATCH(request, { params }) {
    try {
        console.log(params, "params")
        const { taskId } = params
        const { title, content, status } = await request.json()
        console.log(taskId, "taskId")
        console.log(content, "content")
        console.log(status, "status")
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error("Please provide Proper taskId ")
        }
        const isexisting = await Task.findOne({ _id: taskId })
        if (!isexisting) {
            return ResponseMessage("Task data Not Found", false, 404, null)
        } else {
            isexisting.title = title
            isexisting.status = status || isexisting.status
            isexisting.content = content
            await isexisting.save()
        }
        console.log(isexisting, 'isExisting')
        return ResponseMessage("successfully Updated", true, 200, isexisting)
    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }

}