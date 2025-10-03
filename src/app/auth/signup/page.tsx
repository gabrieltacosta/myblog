import { Metadata } from "next";
import SignUpForm from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: "Criar conta"
}

const SignUpPage = () => {
    return ( 
        <div className="container mx-auto h-dvh flex flex-col items-center justify-center p-6">
            <SignUpForm />
        </div>
     );
}
 
export default SignUpPage;