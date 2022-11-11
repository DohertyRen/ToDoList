import './styles.css';
import './global.css'
import { IoMdAdd } from 'react-icons/io'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdOutlineClose } from 'react-icons/md'
import { useState } from 'react';

function App() {

	const [task, setTask] = useState("")

	const [tasks, setTasks] = useState([])

	const [id, setId] = useState(0);

	const handleAddTask= () => {
		if (task === "") {

			toast.error("Digite alguma task.")

		}else{
			

			const newTask = { id: id, title: task, isComplete: false}

			setId(id + 1)

			setTasks([...tasks, newTask])

		}
	}

	function handleToggleTaskCompletion(id){
		const taskComplete = tasks.map(task => {
			if(task.id === id){
				return {...task, isComplete: !task.isComplete}
			}

			return task
		})

		setTasks(taskComplete)
	}

	function handleDelete(id){
		setTasks(tasks.filter(remove => remove.id !== id))
	}

	return (
		<div className="app">

			<ToastContainer />

			<div className='todo'>
				<div className='header'>
					<div className='input-fake' >
						<input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
					</div>

					<button onClick={handleAddTask} ><IoMdAdd /></button>
				</div>

				{tasks.map((task) => (
					<div key={task.id} className={task.isComplete ? 'task-container completed' : 'task-container'}>
						<div className='check-and-title' >
							<label className="checkbox-container">
								<input
									onClick={() => handleToggleTaskCompletion(task.id)}
									type="checkbox"
								/>

								<p className='checkmark'></p>
							</label>

							<p>{task.title}</p>
						</div>

						<div>
							<MdOutlineClose onClick={() => handleDelete(task.id)} />
						</div>	
						
					</div>
				))}

			</div>
		</div>
	);
}

export default App;