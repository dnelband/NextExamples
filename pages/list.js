import Link from 'next/link';
import { useState } from 'react';
import {server} from '../config/index'
import { getDb } from '../config/db'

export default function List({ownersList}){

    const [ owners, setOwners ] = useState(ownersList)

    const [ newOwnerName, setNewOwnerName ] = useState();
    const [ newOwnerEmail, setNewOwnerEmail ] = useState();

    async function onSubmitNewOwnerForm(){
        const response = await fetch(`${server}/api/people`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:newOwnerName,
                email:newOwnerEmail
            })
        });
        const newOwners = await response.json(); 
        setOwners(newOwners)
        setNewOwnerName('')
        setNewOwnerEmail('')
    }

    async function deleteOWner(ownerId){
        const deleteResponse = await fetch(`${server}/api/person/${ownerId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        const res = await fetch(`${server}/api/people/`);
        const newOwners = await res.json();
        setOwners(newOwners)        
    }

    return (
        <div>
            
            <h1>DIS IZ DA LIST BIATCH</h1>
            
            <hr/>

            <div>
                <h2>Add Owner</h2>
                <input placeholder="Name" value={newOwnerName} onChange={e => setNewOwnerName(e.target.value)} />
                <input placeholder="E-Mail" value={newOwnerEmail} onChange={e => setNewOwnerEmail(e.target.value)} />
                <a onClick={onSubmitNewOwnerForm}>Add Owner</a>
            </div>
            
            <hr/>
            
            {
                owners.map((e,index) => (
                    <div>
                    <Link key={index} href={`/person/${e.id}`}>
                        <a>
                            {e.name} - {e.email}                            
                        </a>
                    </Link>
                    ................ <i onClick={() => deleteOWner(e.id)}>delete</i>
                    <hr/>
                    </div>
                ))
            }
        
        </div>
    )
}

export const getServerSideProps = async () => {
    const { db } = await getDb();
    const ownersList = await db.all('select * from person');
    return {props:{ownersList:ownersList}}
}