import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const style = {
  bg: `h-screen w-screen flex p-10 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] overflew-scroll`,
  container: `bg-slate-100 max-w-[800px] w-full mx-auto shadow-xl p-4 rounded-md h-[100%] relative`,
  heading: `text-3xl text-center font-bold text-gray-800 p-2`,
  form: `flex justify-between flex-col gap-2 sm:flex-row sm:gap-0 sm:justify-center`,
  input: `border p-2 w-full text-xl rounded-md`,
  button: `border p-2 ml-2 bg-purple-500 text-slate-100 rounded-md flex justify-center`,
  select: `mx-2 rounded-md border p-2 ml-2`,
  count: `text-center p-2 absolute bottom-2 left-[50%] translate-x-[-50%]`,
  ul: `sm:h-[80%] overflow-scroll h-[59%]`
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState('all');

  // Create todo

  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === ""){
      alert("Please enter a valid todo")
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input, 
      completed: false
    })
    setInput("")
  }

  // Read todo from Firebase

  useEffect(()=>{
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q , (querySnapshot) =>{
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })

      if(type === 'checked'){
        setTodos(todosArr.filter( (todo) => {
          return todo.completed === true;
        }))
        return
      }else if(type === 'unchecked'){
        setTodos(todosArr.filter( (todo) => {
          return todo.completed === false;
        }))
        return
      }

      setTodos(todosArr);    
    });
    return () => unsubscribe;
  }, [type]);

  // Update todo from Firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // Delete todo

  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, 'todos', todo.id))
  }
  

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form className={style.form} onSubmit={createTodo}>
          <input className={style.input} type="text" placeholder="Add Todo" value={input} onChange={e => setInput(e.target.value)}/>
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
          <select name="todos" className={style.select} onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="checked">Checked</option>
            <option value="unchecked">Uncheked</option>
          </select>
        </form>
        <ul className={style.ul}>
          {
            todos.map((todo, index) => {
              return <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>;
            })
          }
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>You have {`${todos.length}`} todos</p>}        
      </div>
    </div>
  );
}

export default App;
