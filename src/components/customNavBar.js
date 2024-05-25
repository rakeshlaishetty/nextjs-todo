"use client"

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { toast } from "react-toastify";

const customNavBar = () => {
    const userdata = useContext(UserContext)
    console.log(userdata, "userdata")

    const router = useRouter()
    async function LogOut() {
        try {
            const response = await logout()
            console.log(response,'this is reposne')
            if(response.success) {
                userdata.setUser(null)
                setTimeout(()=> {
                    router.push("/")
                },2000)
            }else {
                throw new Error(response.message || "Something Went Wrong" )
            }
        } catch (err) {
            toast.error(err?.message || "Something Went Wrong")
        }
    }
    return (
        <nav className="bg-blue-500 h-12 py-3 px-5 flex flex-row justify-between items-center text-white">
            <div>
                <h2 className="font-semibold text-lg "><Link href={"/"}>Task List</Link></h2>
            </div>
            <div>
                <ul className="flex space-x-5 justify-between">
                    {
                        userdata.user ?
                            <>
                                <li>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link href={"/add-tasks"}>Add Tasks</Link>
                                </li>
                                <li>
                                    <Link href={"/show-tasks"}>Show Tasks</Link>
                                </li>
                            </> : null
                    }
                </ul>
            </div>
            <div> <ul className="flex space-x-5 justify-between">
                {
                    !userdata.user &&
                    <>
                        <li>
                            <Link href={"/login"}>Log In</Link>
                        </li>
                        <li>
                            <Link href={"/signup"}>Sign Up</Link>
                        </li>
                    </>
                }
                {
                    userdata.user &&
                    <>
                        <li>
                            {userdata?.user?.name}
                        </li>
                        <li>
                            <button onClick={LogOut}>LogOut</button>
                        </li>
                    </>
                }
            </ul></div>
        </nav>
    )
}

export default customNavBar;