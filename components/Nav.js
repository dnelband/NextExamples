import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client';

const Nav = () => {
    
    const [ session,loading] = useSession();

    const router = useRouter()
    let backButtonDisplay;
    if (router.pathname !== "/"){
        backButtonDisplay = (
            <li>
                <a onClick={() => router.back()}>{"<<"}</a>
            </li>            
        )
    }

    let userAuthDisplay;
    console.log(session)
    if (session){
        userAuthDisplay = <li><a onClick={signOut}><img width="25" src={session.user.image}/> Sign out</a></li>
    } else {
        userAuthDisplay = <li><a onClick={signIn}>Sign in</a></li>
    }

    return (
        <nav className={navStyles.nav}>
            <ul>
                {backButtonDisplay}
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/list">List</Link>
                </li>
                {userAuthDisplay}
            </ul>
        </nav>
    )
}

export default Nav;