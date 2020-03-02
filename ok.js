

var roles = require("roles");
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://kylepo99:Helpful21@test-tnjr2.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri)

var request = require("request")



const connection = client.connect() // initialized connection

const connect = connection

function test(promoter, promotee) {
    let promoter_rank = ""
    let promotee_rank = ""
    let one = promoter
    let two = promotee
    if (two == null || two == one) return


    connect.then(() => {
        const db = client.db('tests')
        let query = {
            "info.roblox_username": {
                $in: [promoter, promotee]
            }
        }

        db.collection("Copy_of_user").find(query).sort({
            "info.id": 1
        }).toArray(function(err, result) {
            if (err) console.error(err)
            if (!result.toString()) {
                throw new Error("Can't find your username please contact @kylepo99"); // If it can't find the username then it errors
            } // probs split this into two functions once gets the info the other auth's it

            if (result[0].info.roblox_username == one) {
                promoter_rank = result[0].info.id
                promotee_rank = result[1].info.id
            } else {
                promoter_rank = result[1].info.id
                promotee_rank = result[0].info.id
            }



            if (promoter_rank > promotee_rank) {
                console.log("Would have been accepted")
                } else {
                console.log("Would have been denied")

            }




        })
    })
}

//
test("123loune", "izaakxvip");
