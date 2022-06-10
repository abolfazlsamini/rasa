import Link from 'next/link'

function Navbar(){
    return(
        
        <ul>
            <li>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>

            </li>
            <li>
                <Link href={'/profile'}>
                        <a>Profile</a>
                    </Link>
            </li>
            <li>
                <Link href={'/profile/login'}>
                        <a>Login</a>
                    </Link>
            </li>
            <li>
                <Link href={'/profile/signup'}>
                        <a>Signup</a>
                    </Link>
            </li>
        </ul>

    )
}

export default Navbar