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

        const newTask
    }
}