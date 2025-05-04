import React ,{usestate , useEffect} from 'react';

function TaskList(){
    const [tasks, setTasks]= useState([]);
    const [taskName, setTaskName] = useState("");


    //Fetch   tasks from Backend
    useEffect(() =>{
        fetch("https://localhost:7246/tasks")
        .then((response)=> response.json())
        .then((data)=> setTasks(data))
        .catch((error)=> console.log("Error fetching tasks", error));
    }, []);



    //Add a new Task

    const addTask = () =>{
        if(!taskName.trim()){
            alert("Task name cannot be empty");
            return;
        }

        const newTask = { name: taskName, completed: false};
        fetch("https://localhost:7246/tasks",{
            method: "Post",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newTask),
        })
        .then((response)=> response.json())
        .then((data)=>{
            setTasks((prevTasks)=>[...prevTasks,data]);
            setTaskName("");  //Clear the input field
        })
        .catch((error)=> console.error("Error adding task", error));
    };

    //Update Task Completion Status

    const toggleCompletion= (id, currentStatus) => {
        fetch(`https://localhost:7246/tasks/${id}`,{

            method : "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({id, isCompleted: !currentStatus}),
        })
        .then((response)=> response.json())
        .then((updatedTask)=>{
            setTasks((prevTasks)=>
            prevTasks.manp((task)=>
            task.id === updatedTask.id ? updatedTask : task
        
        )
    )
        })
        .catch((error)=> console.error("Errror Updating task", error));
    }



    //Delete a Task

    const deleteTask = (id)=>{
        fetch(`https://localhost:7246/tasks/${id}`,{
            method: "DELETE"
        })
        .then(()=>{
            setTasks((prevTasks)=> prevTasks.filter((task)=> task.id !==id));
        })

        .catch((error)=> console.error("Error deleting task", error));
    }


    return(
        <div>
            <h1>Task Manager</h1>

            <input type="text" value={taskName} onChange ={(e)=> setTaskName(e.target.value)}  placeholder="Add a New Task"/>

            <button onClick={addTask}> Add Task</button>

            <ul>
                {tasks.map((taks)=>(
                    <li key={task.id}>

                        <input type="checkbox" checked={task.isCompleted} onChange={() => toggleCompletion(task.id, task.isCompleted)}/>  

                        {task.name} - {task.isCompleted ? "Completed": "Not Completed"}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>

                

)

                )}
            </ul>
            
        </div>
    );
}