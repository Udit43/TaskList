import "./App.css"
import React , {useState, useEffect} from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";


function App() {

  const [coloured, completed] = useState(true); 
  const [allTodos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("completed");

  const [complete, setComplete] = useState([]);

  const handleAdd= ()=>{
    let newTodoItem= {
      TaskName: taskName,
      date: date,
      status: status
    }
    
    if(newTodoItem.TaskName ==="" || newTodoItem.date==="" || newTodoItem.status===""){
      return alert("please fill values")
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completed'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompleted){
      setComplete(savedCompleted);
    }
  },[])

  const handleDelete = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete = (index)=>{
    let updatedCompletedArr = [...complete];
    updatedCompletedArr.push(allTodos[index]);
    setComplete(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completed',JSON.stringify(updatedCompletedArr))
  }

  const handleCompleteDelete = (index)=>{
    let reducedComplete = [...complete];
    reducedComplete.splice(index,1);
    localStorage.setItem('completed', JSON.stringify(reducedComplete));
    setComplete(reducedComplete);
  }

  return (
    <div className="App">

      <div className="headingBox">
        <h1 className="head"> React Task Tracker</h1>
      </div>
      
      <div className="biggerBox">
        <div className="bigBox">
          <div className="bigBoxUpper">
            <div className="flexxxxxxx">
              <div className="bigBoxUpper-item1">
                <label className="bigBoxUpper-subitem1">Task name</label><br/>
                <input className="bigBoxUpper-subitem2" type="text" value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder="enter task" />
              </div>

              <div className="bigBoxUpper-item2">
                <label className="bigBoxUpper-subitem3">Enter Date</label><br/>
                <input className="bigBoxUpper-subitem4" type="date" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="enter date" />
              </div>

              <div className="bigBoxUpper-item3">
                <label className="bigBoxUpper-subitem5" for= "status">Status</label><br/>
                  <select className="bigBoxUpper-subitem6" name= "status" value={status} onChange={(e)=>setStatus(e.target.value)} id="status">
                    <option value="Completed">Completed</option>
                    <option value="in progress">in progress</option>
                  </select>
              </div>
            </div>
            <div className="bigBoxUpper-item4">
              <button className="bigBoxUpper-subitem7" onClick={handleAdd} type="button">Add</button>
            </div>
            

          </div>




          <div className="bigBoxLower">
            <div className="bigBoxLower-first">
              <div className="bigBoxLower-item1">
                <button className= {`bigBoxLower-subitem1 ${coloured === true && 'active'}`} onClick={()=>completed(true)} type="button">ToDoo</button>
              </div>
              <div className="bigBoxLower-item2">
                <button className= {`bigBoxLower-subitem2 ${coloured === false && 'active'}`} onClick={()=>completed(false)} type="button">Completed</button>
              </div>
            </div>
            
            <div className="bigBoxLower-second">
              {coloured ===true && allTodos.map((item,index)=>{
                return(
                  <div className="bigBoxLower-item3" key={index}>
                    <div className="lowerLeftBox">
                      <h3 className="lowerLeftBox-item1">{item.TaskName}</h3>
                      <h6 className="lowerLeftBox-item2">{item.date}</h6>
                      <h6 className="lowerLeftBox-item3">{item.status}</h6>
                    </div>
                    <div className="lowerRightBox">
                      <div className="deletediv"><AiOutlineDelete onClick={()=>handleDelete(index)} className="deletediv-item"/></div>
                      <div className="rightdiv"><FaCheck onClick={()=>handleComplete(index)} className="rightdiv-item" /></div>
                    </div>
                  </div>
                );
              })}

              {coloured ===false && complete.map((item,index)=>{
                return(
                  <div className="bigBoxLower-item3" key={index}>
                    <div className="lowerLeftBox">
                      <h3 className="lowerLeftBox-item1">{item.TaskName}</h3>
                      <h6 className="lowerLeftBox-item2">{item.date}</h6>
                      <h6 className="lowerLeftBox-item3">{item.status}</h6>
                    </div>
                    <div className="lowerRightBox">
                      <div className="deletediv"><AiOutlineDelete onClick={()=>handleCompleteDelete(index)} className="deletediv-item"/></div>
                      
                    </div>
                  </div>
                );
              })}

            </div>
            
          </div>


        </div>
      </div>
      
    </div>
  );
}

export default App;
