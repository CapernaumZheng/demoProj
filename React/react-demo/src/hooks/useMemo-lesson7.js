import React, { useState, useEffect, useMemo, useCallback } from 'react';
export default function Memo() {
    const [name, setName] = useState('leo');
    const [age, setAge] = useState(10);
    // let age2 = useMemo(()=> {
    //     return ()=>age<18? "未成年":"成年人";
    // },[age<=18])
    let age2 = useCallback(()=>age<18? "未成年":"成年人", [age<18]);
    useEffect(() => {
        console.log("更新完成之后")
    }, [age])
    console.log('开始更新了')
    return (
        <div>
            姓名：{name},<br/>
            年龄：{age}, <br/>
            年龄阶段：{age2()},<br/>
            <button onClick={()=>{
                setAge(age+2);
            }}>长大</button>
        </div>
    )
}