"use client"
import { GetTaskOfUsers, DeleteTask } from "@/services/Taskservices";
import { useContext, useEffect, useState } from "react"
import UserContext from "@/context/userContext";
import TaskComponent from "@/components/TaskComponent";
import Spinner from "../../components/Spinner"
import {toast} from "react-toastify"

const ShowTasks = () => {
    const userdata = useContext(UserContext)
    const [taskdata, setTaskData] = useState([])
    const [isLoading, setLoading] = useState(false)

    const GetTasks = async () => {
        setLoading(true)
        try {
            const response = await GetTaskOfUsers(userdata?.user?._id)
            if (response.data.status) {
                setTaskData(response.data.data)
            }
        } catch (err) {
            toast.error((err?.message || "Something Went Wrong"))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userdata.user) {
            GetTasks()
        }
    }, [userdata.user])

    async function deleteTaskParent(tasksId) {
        try {
            const result = await DeleteTask(tasksId);
            console.log(result,"This is result");
            const newTasks = taskdata.filter((item) => item._id != tasksId);
            setTaskData(newTasks);
            toast.success("Your task is deleted ");
        } catch (error) {
            toast.error((error?.message || "Failed to Delete"), {
                position: "top-center",
            });
            toast.error("Error in deleting task !!");
        }
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-6 col-start-4">
                <h2 className="text-3xl text-center">Show Tasks</h2>
                {isLoading ? (
                    <Spinner />
                ) : (
                    taskdata.length !== 0 ? (
                        Array.isArray(taskdata) && taskdata.map((task, index) => (
                            <TaskComponent key={index} task={task} deleteTaskParent={deleteTaskParent} />
                        ))
                    ) : (
                        <p>No Data To Display</p>
                    )
                )}
            </div>
        </div>
    )
}
export default ShowTasks
