import { useSession } from '../../contexts/SessionContext';

import styles from './styles.module.scss';
import {BiLogInCircle} from 'react-icons/bi';
import {useRouter} from 'next/router';
import { Dropdown } from '../Dropdown';

interface SignInButton {
    email?: string;
    password?: string;
}

export function SignInButton({ email, password }: SignInButton) {
    const { session, login, logout } = useSession()
    const router = useRouter()
    
    async function handleButtonClick() {
        if(session) {
            await logout()
            router.push('/unsigned')
        } else {
            if(email && password) {
                await login(email, password)
                router.push('/home')
            }
            
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
                Faça login&nbsp;
                <BiLogInCircle color="#4285F4"/>
            </span>

        </button>
    )
    
}