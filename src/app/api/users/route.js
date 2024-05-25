import { connectDb } from "@/helper/db";
import { usersdata } from "@/models/userdata";
import { NextResponse } from "next/server"
import  bcrypt  from 'bcryptjs';

connectDb()

export async function GET(Response) {
    try {
        console.log("usersData")
        const newdata = await usersdata.find()
        console.log(newdata)
        return NextResponse.json({ newdata, status: true }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: err?.message, status: false }, { status: 500 })
    }

}
export async function POST(request) {
    console.log("Reached POST handler");
    try {
        // Parse request JSON
        const { name, email, password } = await request.json();
        
        // Log the salt environment variable
        const saltRounds = parseInt(process.env.BCRYPT_SALT);
        console.log(saltRounds, 'BCRYPT_SALT');

        // Check if salt rounds are valid
        if (isNaN(saltRounds)) {
            throw new Error('Invalid salt rounds configuration');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);
        
        // Create new user data object
        const newUser = new usersdata({ name, email, password: hashedPassword });
        console.log(name, email, hashedPassword, "this is data");

        // Save new user data to database
        await newUser.save();
        
        // Respond with success message
        return NextResponse.json({ message: "Successfully Created", data: newUser, status: true }, { status: 201 });

    } catch (err) {
        console.error('Error:', err);

        // Respond with error message
        return NextResponse.json({ message: err.message || 'An error occurred', status: false }, { status: 400 });
    }
}

export function DELETE(request) { }
export function PATCH(request) { }