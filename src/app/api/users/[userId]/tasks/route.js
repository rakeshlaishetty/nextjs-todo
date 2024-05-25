import { connectDb } from "@/helper/db";
import { usersdata } from "@/models/userdata";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Task } from "@/models/tasks";
import { ResponseMessage } from "@/helper/responseMessage";


connectDb()
export async function GET(request, { params }) {
    try {
        console.log(params, "params")
        const { userId } = params
        console.log(userId, "userId")
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Please provide Proper userId ")
        }
        const isexisting = await Task.find({ userId: userId })
        if (!isexisting) {
            throw new Error("User data Not Found ")
        }
        return ResponseMessage("successfully fetched", true, 200, isexisting)
    } catch (err) {
        return ResponseMessage(err?.message, false, 500, null)
    }

}
export async function DELETE(request, { params }) {
    try {
        console.log(params, "params")
        const { userId } = params
        console.log(userId, "userId")
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Please provide Proper userId ")
        }
        const isexisting = await Task.findOne({ _id: userId })
        if (!isexisting) {
            throw new Error("User data Not Found ")
        } else {
            await Task.findOneAndDelete({ _id: userId })
        }
        return NextResponse.json({ message: "Succesfully deleted" })
    } catch (err) {
        return NextResponse.json({ message: (err?.message || "Something Went Wrong") }, { status: 500 })
    }

}
export async function PUT(request, { params }) {
    try {
        console.log(params, "params")
        const { userId } = params
        const { name, password, email } = await request.json()
        console.log(userId, "userId")
        console.log(password, "password")
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Please provide Proper userId ")
        }
        const isexisting = await usersdata.findOne({ _id: userId })
        if (!isexisting) {
            throw new Error("User data Not Found ")
        } else {
            isexisting.name = name
            isexisting.email = email
            isexisting.password = password
            await isexisting.save()
        }
        console.log(isexisting, 'isExisting')
        return NextResponse.json({ message: "Succesfully Updated", data: isexisting })
    } catch (err) {
        return NextResponse.json({ message: (err?.message || "Something Went Wrong") }, { status: 500 })
    }

}