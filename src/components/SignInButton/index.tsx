import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image';

import styles from './styles.module.scss';
import {FaGoogle} from 'react-icons/fa';
import {useRouter} from 'next/router';

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
        <button
            type="button"
            className={styles.button}
            onClick={handleButtonClick}
            title="Clique para sair"
            >
            <span>{session.user.name}</span>
            <Image 
                src={session.user.image} 
                alt="User image" 
                width={45} 
                height={45} 
                objectFit="cover" 
            />
        </button>
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