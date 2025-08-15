const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task
        return <div class="single-task ${completed ? 'task-completed' : ''}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">

<a href="task.html?id=${taskID}" class="edit-link">
<i class="fas fa-edit"></i>
</a>

<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  
  // Check if clicked element is the delete button or its child (icon)
  const deleteBtn = el.closest('.delete-btn')
  
  if (deleteBtn) {
    loadingDOM.style.visibility = 'visible'
    const id = deleteBtn.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
      // Show user-friendly error message
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = 'Error deleting task, please try again'
      formAlertDOM.classList.add('text-error')
      
      setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-error')
      }, 3000)
    }
    loadingDOM.style.visibility = 'hidden'
  }
})

// form
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value.trim() // Remove whitespace

  // Validate input
  if (!name) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Please enter a task name'
    formAlertDOM.classList.add('text-error')
    
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-error')
    }, 3000)
    return
  }

  try {
    await axios.post('/api/v1/tasks', { name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Success, task added!'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error('Error creating task:', error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Error, please try again'
    formAlertDOM.classList.add('text-error')
  }
  
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success', 'text-error')
  }, 3000)
})