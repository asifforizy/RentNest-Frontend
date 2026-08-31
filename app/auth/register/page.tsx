import SignupForm from "../_components/SignupForm";




export default function SignUpPage() {
  return (
    <>
     <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">


          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register your account</h1>
            <p className="text-gray-500">
              Enter your details below to create your account
            </p>
          </div>


          <SignupForm/>

        </div>
      </div>
    </>
  )
}
