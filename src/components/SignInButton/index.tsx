import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image';

import styles from './styles.module.scss';
import {FaGoogle} from 'react-icons/fa';
import {useRouter} from 'next/router';
import { Dropdown } from '../Dropdown';

export function SignInButton() {
    const [session] = useSession()
    const router = useRouter()
    
    async function handleButtonClick() {
        if(session) {
            const res = await signOut()
            if(res) {
                router.push('/unsigned')
            }
        } else {
            signIn('google')
        }
    }

    return session ? (
        <Dropdown/>
    ) : (
        <button
            type="button"
            className={styles.button}
            onClick={handleButtonClick}
            >
            <span className={styles.unlloged}>
                Entre com
                <FaGoogle color="#4285F4"/>
            </span>

        </button>
    )
    
}