import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image';

import styles from './styles.module.scss';
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
            <span>
                Entre com
                <FaGoogle color="#4285F4"/>
            </span>

        </button>
    )
    
}