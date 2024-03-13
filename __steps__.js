/***
 *
 * -------------------------
 * MongoDb
 * -------------------------
 * 1 . create account
 * 2. create an use with password
 * 3. whitelist IP adress
 * 4. database > connect > drivers > Node > View Full code
 * 5. Change the password in the uri
 * ----------------------------------------------
 *
 * 1. CREATE ----- POST
 * 2.  app.post("/users" asunc (req,res)=>{})
 * 3. Make the Functio async to use await inside it
 * 4.Make Sure you use th express.json() middlaware
 * 5. access data from the body: const user req.body
 * 6. const result = await userCollection.insertOne(user)
 * 7. res.send(result)
 */
