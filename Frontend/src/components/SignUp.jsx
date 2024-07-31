import { useState} from 'react'
import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import { auth, db } from './Firebase'
import { setDoc,doc } from 'firebase/firestore/lite'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import img from '../images/hmb2.jpg'; 
function SignUp() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  });
  const handleSignup = async(e) => {
       e.preventDefault();
       const {name,email,password} = user;
       try {
         await createUserWithEmailAndPassword(auth,email,password);
         const user = auth.currentUser;
         console.log(user);
         alert("User created successfully !!");
          if(user){
           await setDoc(doc(db,"Users",auth.currentUser.uid),{
           name,
           email:user.email,
          });
          await setDoc(doc(db,'balance',auth.currentUser.uid),{
            balance:0.00
          })
        }
       } catch (error) {
        alert(error.message);
       }
      //  await fetch('https://fir-test-643c1-default-rtdb.firebaseio.com/firebasetest.json',{
      //   method:'POST',
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   body:JSON.stringify({
      //      name,
      //      email,
      //      password
      //   })
      //  });
      //  alert("User created.");
       setUser({
        name:"",
        email:"",
        password:""
       })
  }

  return (
    <>
    <ToastContainer/>
    <section>
  <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
      <div className="absolute inset-0">
        <img
          className="h-full w-full rounded-md object-cover object-top"
         
          src={img}
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative">
        <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
         

        </div>
      </div>
    </div>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Sign up
        </h2>
        <p className="mt-2 text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to={'/'}
            title=""
            className="font-medium text-black transition-all duration-200 hover:underline"
          
          >
            Sign In
          </Link>
        </p>
        <form action="#" method="POST" className="mt-8" autoComplete='off'>
          <div className="space-y-5">
            <div>
              <label for="name" className="text-base font-medium text-gray-900">
                {" "}
                Full Name{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name='name'
                  value={user.name}
                  onChange={(e)=>setUser({...user,name:e.target.value})}
                  type="text"
                  placeholder="Full Name"
                  id="name"
                />
              </div>
            </div>
            <div>
              <label for="email" className="text-base font-medium text-gray-900">
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name='email'
                  value={user.email}
                  onChange={(e)=>setUser({...user,email:e.target.value})}
                  type="email"
                  placeholder="Email"
                  id="email"
                  
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name='password'
                  value={user.password}
                  onChange={(e)=>setUser({...user,password:e.target.value})}
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                onClick={handleSignup}
              >
                Create Account{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="target.currentCvalue"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            onClick={()=>navigate('/')}
          >
            Already a User? Login here
          </button>
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            onClick={()=>toast("Cooming soon ....",{
              position:"top-center"
            })}
          >
            <span className="mr-2 inline-block">
              <svg
                className="h-6 w-6 text-[#2563EB]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="target.currentCvalue"
              >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </span>
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default SignUp
