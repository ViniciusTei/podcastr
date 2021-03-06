import { useSession } from '../../contexts/SessionContext';

import styles from './styles.module.scss';
import {BiLogInCircle} from 'react-icons/bi';
import {useRouter} from 'next/router';
import { Dropdown } from '../Dropdown';

export function SignInButton() {
    const { session } = useSession()
    const router = useRouter()
    
    async function handleButtonClick() {
        if(session) {
            router.push('/unsigned')
        } else {
            router.push('/login')
            
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