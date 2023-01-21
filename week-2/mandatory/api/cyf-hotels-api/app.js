import express from  "express";
import bodyParser from "body-parser";
import Pool from 'pg-pool'

const app =express()

app.use(bodyParser.json());
app.use(express.json())

const pool = new Pool({
    user: 'Ayun',
    host: 'localhost',
    database: 'cyf_hotels',
    password: '1121',
    port: '',
});

const serverErrorMessage="500 Internal Server Error."
const isPositiveInteger=(input)=>{
    return Number.isInteger(input)&&input>0
}


 const  getCustomerById=(req,res)=>{
    const customerId=parseInt(req.params.customerId)
    const isValid=isPositiveInteger(customerId)
    const statusCode=isValid?200:400

    let data

    if(isValid){
        const customerQuery=`SELECT * FROM customers WHERE id=${customerId}`

    pool
        .query(customerQuery)
        .then(result=>{data=result.rows})
        .catch((err)=>{console.error(err)})   
    }
    
    res.status(statusCode).send(data)
    
}

const getCustomerBookings = (req,res)=>{
    const customerId=parseInt(req.params.customerId)
    const isValid=isPositiveInteger(customerId)
    const statusCode=isValid?200:400

    let data
    if(isValid){
        const query=`
        SELECT * FROM bookings b 
        INNER JOIN customers c
        ON b.customer_id=c.id
        WHERE c.id=${customerId}
        `
        pool.query(query)
        .then(result=>{data=result.rows})
        .catch(e=>console.error(e))
    }

    res.status(statusCode).send(data)
}

const getHotelByKeyword=(req,res)=>{
    const hotelNameQuery = req.query.name?(req.query.name.toLowerCase()):"";

    const query= (`SELECT * FROM hotels WHERE LOWER(name) LIKE LOWER('%'|| $1 ||'%') ORDER BY name`)
    const values=[hotelNameQuery]
    pool
    .query(query,values)
    .then(result=>res.status(200).json(result.rows))
    .catch(e=>console.error(e))
}


const getHotelById= (req,res)=>{
    const hotelId=parseInt(req.params.hotelId)
    
    const isValid=isPositiveInteger(hotelId)
    const statusCode=isValid?200:400

    let data
    if(isValid){
        const query=`SELECT * FROM hotels where id=${hotelId}`
    pool
        .query(query)
        .then(result=>{data=result.rows})
               .catch(e=>console.error(e))
    }
    res.status(statusCode).send(data)
} 

const getCustomersByKeyword=(req,res)=>{
    const customerNameQuery = req.query.name?(req.query.name.toLowerCase()):null;

    const query=customerNameQuery ? (`SELECT * FROM customers WHERE LOWER(name) LIKE '%${customerNameQuery}%' ORDER BY name`)
                :("SELECT * FROM hotels ORDER by name");
    pool
    .query(query)
    .then(result=>res.status(200).json(result.rows))
    .catch(e=>console.error(e))
    
}



const hotelNameExists= (name)=>{
    const lowerCaseName=name.toLowerCase()

    const query=`SELECT * FROM hotels WHERE LOWER(name)='${lowerCaseName}'`

    return  pool
                        .query(query)
                        .then(result=>result.rowCount)
                        .then(rowCount=>{return rowCount>0})
                        .catch(e=>console.error(e))
    
    
}


const createNewHotel=async (req,res)=>{

    let data={result:{},error:{}}

    const newHotelName=req.body.name

    const newHotelRooms=parseInt(req.body.rooms)

    const newHotelPostcode=req.body.postcode

    //Fist validate that the hotel name does not already exist
    
    if(await hotelNameExists(newHotelName)){
        
        data.error="Hotel name already exists."
        const statusCode=400
        return res.status(statusCode).send(data)
    }
    
    if(!isPositiveInteger(newHotelRooms)){
        data.error="Hotel rooms must be a positive integer"
        const statusCode=400
        return res.status(statusCode).send(data)
    }

    const query =
        "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";
    pool.query(query,[newHotelName,newHotelRooms,newHotelPostcode],(err,result)=>{
        if(err){
            data.error=serverErrorMessage
        }
        data.result=result
        const statusCode=err?500:200
        res.status(statusCode).send(data)
    })
};

const deleteCustomerById=(req,res)=>{
    const customerId=req.params.customerId;

    pool.query('DELETE FROM bookings WHERE bookings.customer_id=$1',[customerId])
        .then(()=>{
            pool.query('DELETE FROM customers WHERE id=$1',[customerId])
                .then(()=>res.send(`Customer ${customerId} deleted!`))
                .catch(e=>{
                        console.error(e)
                        res.status(500).send(serverErrorMessage)
                    })
                })    
        .catch(e=>console.error(e))
       
}


const deleteHotelById=(req,res)=>{
    const hotelId=parseInt(req.params.hotelId);

    pool.query('SELECT FROM bookings WHERE hotel_id=$1',[hotelId])
        .then((result)=>{
            if(parseInt(result.rowCount)===0){
                pool.query('DELETE FROM hotels WHERE id=$1',[hotelId])
                    .then(()=>res.status(200).send(`Hotel ${hotelId} deleted!`))
                    .catch(e=>console.error(e))

            }else{
                res.status(400).send("Can't delete hotel.")
            }
        })
        .catch(e=>console.error(e))
    
}




app.get("/hotels", getHotelByKeyword)

app.get("/hotels/:hotelId",getHotelById) 

app.get("/customers",getCustomersByKeyword)

app.get("/customers/:customerId",getCustomerById)

app.get("/customers/:customerId/bookings",getCustomerBookings)

app.post("/hotels", createNewHotel)

app.delete("/customers/:customerId",deleteCustomerById)

app.delete("/hotels/:hotelId",deleteHotelById)


  export default app 