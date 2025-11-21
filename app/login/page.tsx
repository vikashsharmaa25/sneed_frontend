
import Image from "next/image"
import LoginImage from "@/public/images/login.png"
import Logo from "@/public/images/logo.png"
import Login from "@/components/Login"

function Page() {
    return (
        <div className="relative min-h-svh w-full bg-muted/30">
            <div className="container mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-center gap-5 p-6 md:grid-cols-2">
                <div className="mx-auto max-w-xl space-y-4">
                    <div className="w-[175px]">
                        <Image src={Logo} alt="Sneed_logo" width={175} height={60} className="object-cover" />
                    </div>
                    <h1 className="text-3xl font-semibold md:text-4xl">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your account to continue</p>
                    <p className="text-sm text-muted-foreground">
                        At Sneed Coding Solutions, we are a passionate team driven by Bryan Sneed's vision to #KeepCodingSimple across all industries. Our dream team of professionals is dedicated to helping you overcome complex coding and marking challenges, so you can save time and focus on what truly matters – growing your business. With our advanced thermal-inkjet technology, we provide innovative solutions that simplify the coding process, allowing you to streamline operations and achieve greater success.
                    </p>
                    <div className="relative mt-4 w-full">
                        <Image src={LoginImage} alt="Sneed product" width={424} height={207} className="h-auto w-full rounded-xl p-4" />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Page