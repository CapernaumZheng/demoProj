import React, {useState, useEffect, useRef} from 'react';
import './index.css'
function Header(props) {
    const [todo, setTodo] = useState('');
    let {addTodo} = props;
    return (
        <header>
            <h1>Todos</h1>
            <input 
                id="new-todo" 
                type="text"
                placeholder="What needs to be done?" 
                value={todo}
                autoComplete="off"
                onChange={(e)=>{
                    setTodo(e.target.value);
                }}
                onKeyDown={(e)=>{
                    if(e.keyCode === 13) {
                        if(!todo.trim()) {
                            alert('请输入内容');
                            e.target.focus();
                        } else {
                            addTodo(todo);
                        }
                    }
                }}
                />
        </header>
    )
}
function Main(props) {
    let {todos, changeAllCompleted} = props;
    let completed = todos.filter(item=>item.completed)
    return (
        <section id="main" style={{
            display: todos.length > 0 ? 'block':'none'
        }}>
            <input id="toggle-all" type="checkbox" checked={completed.length == todos.length} onChange={(e)=>{
                changeAllCompleted(e.target.checked);
            }}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul id="todo-list">
                {
                    todos.map(item=> {
                        return <Li 
                            key={item.id}
                            inner={item}
                            {...props}
                        />
                    })
                }
            </ul>
        </section>
    )
}
function Li(props) {
    const [edit, setEdit] = useState(false);
    const elEdit = useRef(null);
    let {inner, changeCompleted, remove, editVal} = props;
    let {id} = inner;
    useEffect(()=> {
        if(edit) {
            elEdit.current.select() 
        } else {
            if(!inner.val.trim()) {
                setEdit(true);
            }
        }
    },[edit])
    return (
        <li className={inner.completed? 'done' : ''}>
            <div className="view" 
                style = {{
                    display: edit?'none':'block'
                }}
            >
                <input 
                    type="checkbox" 
                    className="toggle" 
                    checked = {inner.completed}
                    onChange={(e)=>{
                        changeCompleted(id, e.target.checked)
                    }}
                />
                <label onDoubleClick={()=>{
                    setEdit(true);
                }}>{inner.val}</label>
                <a href="#" className="destroy" onClick={()=>{
                    remove(id)
                }}></a>
            </div>
            <input type="text" className="edit" 
                ref={elEdit}
                value={inner.val}
                style = {{
                    display: edit?'inline-block':'none'
                }} 
                onBlur={(e)=>{
                    setEdit(false);
                }}
                onChange={(e)=>{
                    editVal(id, e.target.value)
                }}
                />
        </li>
    )
}
function Footer(props) {
    let {todos, removeCompleted} = props;
    let unComplete = todos.filter(item=>!item.completed).length;
    let complete = todos.filter(item=>item.completed).length;
    return (
        <footer style={{
            display: todos.length > 0 ? 'block' : 'none'
        }}>
            <a href="#" id="clear-completed" style={{
                display: complete > 0 ? 'block' : 'none'
            }} onClick={()=> {
                removeCompleted()
            }}>Clear {complete} completed item</a>
            <div id="todo-count">{unComplete} items left</div>
        </footer>
    )
}
export default function Todos() {
    const [todos, setTodos] = useState([]);
    function addTodo(val) {
        setTodos([...todos,{
            id: Date.now(),
            val,
            completed: false
        }])
    }
    function changeCompleted(id,completed) {
        todos.forEach(item=> {
            if(id === item.id) {
                item.completed = completed;
            }
        })
        setTodos([...todos]);
    }
    function remove(id) {
        setTodos(todos.filter(item=>item.id !== id));
    }
    function editVal(id, val) {
        todos.forEach(item=> {
            if(id === item.id) {
                item.val = val;
            }
        })
        setTodos([...todos]);
    }
    function removeCompleted() {
        setTodos(todos.filter(item=>!item.completed));
    }
    function changeAllCompleted(completed) {
        todos.forEach(item=> {
                item.completed = completed;
        })
        setTodos([...todos]);
    }
    return (
        <div id="todoapp">
            <Header addTodo={addTodo} />
            <Main todos={todos} changeCompleted={changeCompleted} remove={remove} editVal={editVal} changeAllCompleted={changeAllCompleted}/>
            <Footer todos={todos} removeCompleted={removeCompleted}/>
        </div>
    )
}