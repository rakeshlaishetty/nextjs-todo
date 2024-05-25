import Image from "next/image"
import Form from "./Form"
import login from "../../assets/login.svg"


export const metadata = {
    title: "Add tasks",
    description: "Adding tasks"
}

const AddTasks = () => {
    return (
        <div className="grid grid-cols-12 justify-center">
            <div className="col-span-6 col-start-4  text-black shadow-md text-center shadow-gray-200 p-1"><h2 className="text-2xl p-2">Add Tasks</h2></div>
            <div className="col-span-6 col-start-4 mt-4 border shadow shadow-gray-100 p-2" >
                <div className="my-5 flex justify-center">
                    <Image src={login} style={{ width: "50%" }} />
                </div>
                <div className="col-span-8 col-start-8 mt-4  p-2 flex justify-center">

                    <Form />
                </div>
            </div>
        </div>
    )
}

export default AddTasks