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

const isPositiveInteger=(input)=>{
    return Number.isInteger(input)&&input>0
}


 const  getCustomerById=async (req,res)=>{
    const customerId=parseInt(req.params.customerId)
    const isValid=isPositiveInteger(customerId)?(true):false
    const statusCode=isValid?200:400

    let data
    
    if(isValid){
        const customerQuery=`SELECT * FROM customers WHERE id=${customerId}`

        data=await pool
        .query(customerQuery)
        .then(result=>result.rows)
        .then(data=>{return data})
        .catch((e)=>{return e})   
    }
    
    res.status(statusCode).send(data)
    
}

const getCustomerBookings =(req,res)=>{
const customerId=req.params.customerId

const query=`
SELECT * FROM bookings b 
INNER JOIN customers c
ON b.customer_id=c.id
WHERE c.id=${customerId}
`

}





app.get("/hotels", function(req, res) {
    const hotelNameQuery = req.query.name?(req.query.name.toLowerCase()):null;

    const query=hotelNameQuery ? (`SELECT * FROM hotels WHERE LOWER(name) LIKE '%${hotelNameQuery}%' ORDER BY name`)
                :("SELECT * FROM hotels ORDER by name");

    pool
    .query(query)
    .then(result=>res.status(200).json(result.rows))
    .catch(e=>console.log(e))
    
});

app.get("/hotels/:hotelId",function(req,res){
    const hotelId=parseInt(req.params.hotelId)
    
    const isValid=(Number.isInteger(hotelId)&&hotelId>0)?(true):(false)
   

    if(isValid){
        const query=`SELECT * FROM hotels where id=${hotelId}`

        pool
        .query(query)
        .then(result=>res.status(200).json(result.rows))
        .catch(e=>console.log(e))
    }

})

app.get("/customers",function(req,res){
    pool.query('SELECT * FROM customers',(err,result)=>{
        res.json(result.rows)
    })
})

app.get("/customers/:customerId",getCustomerById)

app.get("/customers/:customerId/bookings",getCustomerBookings)

app.get("/suppliers",function(req,res){
    pool.query('SELECT * FROM suppliers',(err,result)=>{
        res.json(result.rows)
    })
})

app.post("/hotels", function (req, res) {
    const newHotelName = req.body.name;
    const newHotelRooms = req.body.rooms;
    const newHotelPostcode = req.body.postcode;
    let isValid
    let statusCode
    let msg=""

    // room must be an INT
    if(!Number.isInteger(newHotelRooms)){
        isValid=false
        statusCode=403
        msg="hotel rooms must be a positive integer"
    }
    
    //hotel room must not exist

    
    

    if(isValid){

    }
  
    const query =
      "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";
  
    pool
      .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
      .then(() => res.status(statusCode).send(msg))
      .catch((e) => console.error(e));
  });


  export default app 