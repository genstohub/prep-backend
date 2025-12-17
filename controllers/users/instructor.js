const instructor = require("express").Router();
const jwtAuth = require("../../middlewares/jwt");

instructor.post("/create_account", async (req, res) => {
  const {
    firstName,
    lastName,
    sex,
    email,
    phoneNumber,
    country,
    password,
    coursesDepartments,
    qualifications,
  } = req.body; //Information provided by the new user is brought in to server with req.body;
  await db.transaction((trx) => {
    //***This is to register the user to the users database */
    trx("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        email: email,
        phone_number: phoneNumber,
        category: "instructor",
        country: country,
        date_created: new Date(),
      })
      .returning("*")
      .then((credentials) => {
        const signCredentials = credentials[0];
        // As you know we dont save plain passwords to our database, we rather implement highly secured hash with the password with bcrypt,
        // beware that bcrypt hash are irrevisible, only comparable, if a hacker can reverse the hash with a high salt round, it will take approximately 2years running system.
        // Uncomment the hash function and replace the password with the hash created below ie. hash:  password ---> hash
        const hash = bcrypt.hashSync(password, 12);

        //** this transaction is mainly to register the email and password to signin table so the user can has access to the account they are creating now afterwards */
        trx("signin")
          .insert({
            email: signCredentials.email,
            phone_number: signCredentials.phone_number,
            hash: hash, // please make sure to replace the hash value with the hash defined above; password ---> hash
          })
          .returning("*")
          .then((re) => {
            //*** this transaction is to fill up the students table with the information provided */
            trx("instructors")
              .insert({
                user_id: credentials[0].user_id,
                "courses/departments": coursesDepartments,
                qualifications: qualifications,
              })
              .returning("*")
              .then((instructorDetails) => {
                let user = { ...credentials[0], ...instructorDetails[0] };
                const jwt = new jwtAuth().generatedAuthToken(user);
                res.cookie("auth", jwt, { expires: "300d" });
                res.json(user);
              })
              .finally(() => trx.commit(trx))
              .catch((err) => {
                res.status(400).json(err.detail);
                trx.rollback();
              });
          })
          .catch((err) => {
            res.status(400).json(err.detail);
            trx.rollback();
          });
      })
      .catch((err) => {
        res.status(400).json(err.detail);
        trx.rollback();
      });
  });
});

module.exports = instructor;
