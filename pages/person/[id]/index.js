import Link from "next/link";
import { server } from "../../../config/index";
import { getDb } from '../../../config/db'

// export const getStaticPaths = async () => {
//     const { db } = await getDb();
//     const people = await db.all('select * from person')
//     const ids = people.map(person => person.id);
//     const paths = ids.map(id => ({params: {id: id.toString()}}))

//     return {
//         paths, //indicates that no page needs be created at build time
//         fallback: false //indicates the type of fallback
//     }
// }

export const getServerSideProps = async (context) => {
    const { db } = await getDb();
    const person = await db.get('select * from person where id = ?', [context.params.id])
    const vehiclesList = await db.all('select * from vehicle where ownerId = ?', [context.params.id])
    return {
        props:{vehiclesList,person}
    }
}

export default function PersonView({vehiclesList,person}){
    return (
    <div>
        <h1>
            {person.name},  {person.email}
        </h1>
        <ul>
            {vehiclesList.map((v,index) => (
                <li key={index} >
                    <Link href={"/vehicle/" + v.id}>
                        <a>{v.brand}, {v.model}
                        <br/>
                        <img src={server + "/" + v.picture}/>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
    )
}