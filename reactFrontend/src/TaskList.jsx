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
}