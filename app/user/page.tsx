import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function User(){
    const session = await getServerSession(options);
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/user")
    }
    return (
        <div>
            <h1>{session?.user?.email} </h1>
            <h1>{session?.user?.role}</h1>
        </div>
    )
}