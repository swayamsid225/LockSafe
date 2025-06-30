import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })

  const [passwordArray, setpasswordArray] = useState([]);
  const backendUrl = import.meta.env.BACKEND_URL;

  const getPasswords = async () => {
    let req = await fetch(backendUrl || "http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords);
    console.log(passwords);
  }
  

  useEffect(() => {
    getPasswords()

    
  }, [])


  const showPassword = async () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eyee.png"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/hidden.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
  
      // If the form has an id, it means you're editing a password, so delete the old one
      if (form.id) {
        await fetch(backendUrl || "http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id })  
        });
      }
  
      
      const id = form.id || uuidv4();
  
      
      setpasswordArray([...passwordArray, { ...form, id }]);
  
      
      await fetch(backendUrl || "http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id })  
      });
  
      
      setform({ site: "", username: "", password: "" });
      
      window.location.reload(); 
     
      toast.success('Password Saved !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  
    } else {
      toast.warn('Error: Password not saved !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  
  

  const deletePassword = async (id) => {
    console.log("Deleting password with id: ", id);

    
    const userConfirmed = confirm("Do you really want to delete this password!");

    if (userConfirmed) {
      
      const updatedPasswordArray = passwordArray.filter(item => item.id !== id);

      
      setpasswordArray(updatedPasswordArray);

      // Update the localStorage with the new password array
      // localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
      let res = await fetch(backendUrl || "http://localhost:3000/",{method:"DELETE",headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({id})})

      
      toast.success('Password deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id: ", id);

    const passwordEntry = passwordArray.find(item => item.id === id);

    if (passwordEntry) {
        
        setform({ 
            site: passwordEntry.site, 
            username: passwordEntry.username, 
            password: '', 
            id: id 
        });
        setpasswordArray(passwordArray.filter(item => item.id !== id));
    } else {
        console.error('Password entry not found');
    }
};


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast("copied to clipbord " + text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        closeButton={true}
      />
      

      <div className="p-0 md:mycontainer min-h-[87vh] ">
        <h1 className='text-4xl text-white font-bold text-center'> <span className='text-sky-400 font-bold'> &lt; </span>

          Lock-<span className='text-sky-400 font-bold'>Safe/&gt; </span></h1>
        <p className='text-white text-lg text-center'>Your Own Password Manager</p>
        <div className='text-white flex flex-col p-2 gap-8 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full bg-black border border-sky-500 w-full text-white p-2 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full bg-black border border-sky-500 w-full text-white p-2 py-1' type="text" name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className=' rounded-full bg-black border border-sky-500 w-full text-white p-2 py-1' type="password" name="password" id="password" />
              <span className='absolute right-[5px] top-[4px] cursor-pointer' onClick=
                {showPassword}>
                <img className='p-0.5' width={25} src="icons/eyee.png" alt="eye" ref={ref} />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='text-black gap-2 flex justify-center items-center bg-sky-500 rounded-full px-8 py-2 w-fit hover:bg-sky-700 border-1 border-sky-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>Save</button>
        </div>
        <div className="passwords">
          <h2 className='text-white font-bold text-xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div className='text-white'>No Passwords To Show</div>}
          {passwordArray.length !== 0 && <div className="relative flex flex-col w-full h-full overflow-hidden text-white bg-black shadow-md rounded-md bg-clip-border border border-black">
            <table className="w-full text-left table-auto min-w-max overflow-hidden mb-10">
              <thead className='text-center'>
                <tr>
                  <th className="p-2 border-b border-sky-400  bg-slate-700">
                    <div className='flex items-center justify-center p-1'>
                      <p className="text-sm font-normal leading-none text-slate-300">
                        Site
                      </p>
                    </div>
                  </th>
                  <th className="p-2 border-b border-sky-400 bg-slate-700">
                    <div className=' flex items-center justify-center'>
                      <p className="text-sm font-normal leading-none text-slate-300">
                        Username
                      </p>
                    </div>
                  </th>

                  <th className="p-2 border-b border-sky-400  bg-slate-700">
                    <div className='flex items-center justify-center'>
                      <p className="text-sm font-normal leading-none text-slate-300">
                        Password
                      </p>
                    </div>
                  </th>

                  <th className="p-2 border-b border-sky-400  bg-slate-700">
                    <div className='flex items-center justify-center'>
                      <p className="text-sm font-normal leading-none text-slate-300">
                        Actions
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return <tr key={index} className="even:bg-slate-900 hover:bg-slate-700 text-center">
                    <td className="p-2 border-b border-sky-400">
                      <div className='flex items-center justify-center'>
                        <p className="text-sm text-slate-100 font-semibold">
                          <a href={item.site} target='_blank'>{item.site}</a>
                        </p>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 border-b border-sky-400">
                      <div className=' flex items-center justify-center'>
                        <p className="text-sm text-slate-300">
                          {item.username}
                        </p>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                          </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="p-2 border-b border-sky-400">
                      <div className=' flex items-center justify-center'>
                        <p className="text-sm text-slate-300">
                          {"*".repeat(10)}
                        </p>
                        <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                          </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="p-2 border-b border-sky-400">
                      <div className=' flex items-center justify-center'>
                        <p className="text-sm text-slate-300 cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </p>
                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </span>
                      </div>
                    </td>

                  </tr>
                })}

              </tbody>
            </table>
          </div>}
        </div>

      </div>
    </>

  )
}

export default Manager
