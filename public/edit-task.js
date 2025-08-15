const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')

// Get task ID from URL parameters
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    
    const { _id: taskID, completed, name } = task

    // Populate form fields
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    taskCompletedDOM.checked = completed // Simplified checkbox setting
    
  } catch (error) {
    console.error('Error fetching task:', error)
    showAlert('Task not found', 'text-error')
    // Optional: redirect to main page after error
    setTimeout(() => {
      window.location.href = 'index.html'
    }, 2000)
  }
}

// Load task when page loads
showTask()

// Handle form submission - MOVED OUTSIDE showTask function
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  editBtnDOM.textContent = 'Loading...'
  
  try {
    const taskName = taskNameDOM.value.trim()
    const taskCompleted = taskCompletedDOM.checked

    // Input validation
    if (!taskName) {
      showAlert('Please enter a task name', 'text-error')
      editBtnDOM.textContent = 'Edit'
      return
    }

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    })

    const { _id: taskID, completed, name } = task

    // Update form with returned data
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    taskCompletedDOM.checked = completed
    
    showAlert('Success, task updated!', 'text-success')
    
  } catch (error) {
    console.error('Error updating task:', error)
    
    // Reset form to previous values on error
    taskNameDOM.value = tempName
    showAlert('Error, please try again', 'text-error')
  }
  
  // Reset button text
  editBtnDOM.textContent = 'Edit'
})

// Helper function to show alerts
const showAlert = (message, className) => {
  formAlertDOM.style.display = 'block'
  formAlertDOM.textContent = message
  formAlertDOM.className = `form-alert ${className}`
  
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.className = 'form-alert'
  }, 3000)
}