using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task = Asp.NetBackend.Models.Task;
namespace Asp.NetBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static List<Task> tasks = new List<Task>
        {

            new Task { Id = 1, Name="Learn React", IsCompleted = false  },
            new Task { Id = 2, Name="Learn .NET", IsCompleted = true },

        };

        //Get all tasks
        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(tasks);
        }

        //Add a new Task
        [HttpPost]
        public IActionResult AddTask([FromBody] Task task)
        {
            task.Id = tasks.Count + 1;
            tasks.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        //Update task completion status
        [HttpPut("{id}")]

        public IActionResult UpdateTask(int id, [FromBody] Task updatedTask)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
            {
                return NotFound();

            }
            task.IsCompleted = updatedTask.IsCompleted;
            return Ok(task);
        }


        //Delete a task
        [HttpDelete("{id}")]

        public IActionResult DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null){

                return NotFound();


            }

            tasks.Remove(task);
            return NoContent();
        }
    }
}
