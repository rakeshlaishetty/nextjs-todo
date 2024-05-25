"use client"

import { useState } from "react";
import { AddTask } from "@/services/Taskservices"
import { toast } from "react-toastify";

const Form = () => {
    const [task, setTask] = useState({
        title: "",
        content: "",
        status: ""
    });

    const handler = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const addTask = async () => {
        console.log("Task added:", task);
        const response = await AddTask(task);
        console.log(response, "thisi sresponse")
        // if(response.status)
        if (response?.data?.status) {
            toast.success("successfully Added")
            clearTask()
        } else {
            toast.error((response?.response?.data?.message || "Something Went Wrong"))
        }
    };

    const clearTask = () => {
        setTask({
            title: "",
            content: "",
            status: ""
        });
    };

    console.log(task, "this Is atsk")
    return (
        <form className="w-full max-w-sm flex flex-col justify-center">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="task_Title">
                        Title
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="task_Title"
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handler}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="task_Content">
                        Content
                    </label>
                </div>
                <div className="md:w-2/3">
                    <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="task_Content"
                        name="content"
                        value={task.content}
                        onChange={handler}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="task_status">
                        Status
                    </label>
                </div>
                <div className="md:w-2/3">
                    <select
                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="task_status"
                        name="status"
                        value={task.status}
                        onChange={handler}
                    >
                        <option value="" disabled>--Select Status--</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            <div className="md:flex md:items-center justify-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3 space-x-2">
                    <button
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={addTask}
                    >
                        Add
                    </button>
                    <button
                        className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={clearTask}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
