import Link from 'next/link';
import { getDb } from '../../../config/db'
import { server } from '../../../config/index';
import { useState } from "react";
import ImageUploader from '../../../components/ImageUploader';


// export const getStaticPaths = async () => {
//     const { db } = await getDb();
//     const vehicles = await db.all('select * from vehicle')
//     const ids = vehicles.map(vehicles => vehicles.id);
//     const paths = ids.map(id => ({params: {id: id.toString()}}))
//     return {
//         paths,
//         fallback: false
//     }
// }

export const getServerSideProps = async (context) => {
    const { db } = await getDb();
    const vehicle = await db.get('select * from vehicle where id = ?', [context.params.id])
    const person = await db.get('select * from person where id = ?', [vehicle.ownerId])
    return {
        props:{vehicle,person}
    }
}

export default function VehicleView({vehicle,person}){

    const [ brand, setBrand ] = useState(vehicle.brand)
    const [ model, setModel ] = useState(vehicle.model)
    const [ picture, setPicture] = useState(vehicle.picture);
  
    async function onUpdateVehicle(){

        console.log(brand,model,picture)

        const response = await fetch(`${server}/api/vehicle/${vehicle.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               brand,
               model,
               picture
            })
        });
        const newVehicle = await response.json(); 
        console.log(newVehicle,"new vehicle")
    }

    return (
      <main>
        <div>
            <h1>
                {brand}
            </h1>
            <h2>
            {model}
            </h2>
            <h3>
                owned by:
                <Link href={`/person/${person.id}`}>
                    <a>{person.name},  {person.email}</a>
                </Link>
            </h3>
        </div>
        <ImageUploader image={picture} onSetImage={setPicture}/>
        <button onClick={onUpdateVehicle}>
            UPDATE VEHICLE
        </button>
      </main>
    );

}