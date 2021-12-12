import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';

const Nav = () => {
    
    const {data:session} = useSession();

    const router = useRouter()
    let backButtonDisplay;
    if (router.pathname !== "/"){
        backButtonDisplay = (
            <li>
                <a onClick={() => router.back()}>{"<<"}</a>
            </li>            
        )
    }

    let userActionDisplay = (
        <Link href="/api/auth/signin">
            Signin
        </Link>
    )
    if (session){
        userActionDisplay = (
            <Link href="/api/auth/signout">
                Signout
            </Link>
        )   
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
                <li>
                    {userActionDisplay}
                </li>
            </ul>
        </nav>
    )
}

export default Nav;