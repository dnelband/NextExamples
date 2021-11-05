import { getSession } from 'next-auth/client';

function Admin ({session}) {
    console.log(session)
    return (
        <div>
            <h1>ADMIN PAGE</h1>
        </div>
    )
}

export default Admin;

export async function getServerSideProps(context){
    const session = await getSession(context);
    return {
        props: {
            data:session ? "list of really nasty shit" : "letters to barny"
        }
    }

}