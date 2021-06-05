import { session, signIn, signOut, useSession } from 'next-auth/client'
import {FaGoogle} from 'react-icons/fa';

export function SignInButton() {
    const [session] = useSession()

    function handleButtonClick() {
        if(session) {
            signOut()
        } else {
            signIn('google')
        }
    }
    return (
        <button
            type="button"
            onClick={handleButtonClick}
        >
            Entre com
            <FaGoogle color={session ? '#04D361' : ''}/>
        </button>
    )
}