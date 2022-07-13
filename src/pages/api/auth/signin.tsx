import { getProviders, signIn } from "next-auth/react"
import '../../../styles/auth/signin.css'

export default function ({ providers }: any) {
    return (
        <div>
            {/* <button onClick={() => signIn()}>Signin with Github</button> */}
            <h1>login</h1>
        </div>
    )
}

export async function getServerSideProps(_context: any) {
    const providers = await getProviders()
    console.log(providers);
    return {
      props: { providers },
    }
}