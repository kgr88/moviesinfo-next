import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
export default async function Page(){
    const session = await getServerSession(options)
    return (
        <div>
        {session ? <Link href="/api/auth/signout?callbackUrl=/">LogOut</Link> : <Link href="/api/auth/signin">Login</Link>}
        </div>
    )
}