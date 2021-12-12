import { getSession } from 'next-auth/react';

function Admin () {
    return (
        <div>
            <h1>ADMIN PAGE</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { session }
    }
}

export default Admin;