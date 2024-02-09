const users = [{
    "_id": {
        "$oid": "65c0fceae5e23b3e7b8fe812"
    },
    "deviceId": "hha8dz6oskc",
    "name": "asdfg",
    "email": "aditya@email.com",
    "mob": "234567890",
    "address": "1234567876543",
    "__v": 0
}, {
    "_id": {
        "$oid": "65c10b0bc30c808b995e2723"
    },
    "deviceId": "i01hjhytle9",
    "name": "aditya",
    "email": "aditya@gmail.com",
    "mob": "12345678909",
    "address": "awerfghuytf",
    "__v": 0
}]
const carts = [
    {
        "_id": {
          "$oid": "65c10af4c30c808b995e2717"
        },
        "deviceId": "i01hjhytle9",
        "image": "http://res.cloudinary.com/dzugrk6ni/image/upload/v1706282305/xjaj9lecjywlm6dgvbbo.jpg",
        "name": "New Hoodie Outfit",
        "color": "Gray",
        "quantity": 2,
        "price": 899,
        "productId": "65b3cd3e43143a0bdd0bb30d",
        "__v": 0
      },
    {
        "_id": {
          "$oid": "65c10aedc30c808b995e270f"
        },
        "deviceId": "i01hjhytle9",
        "image": "https://source.unsplash.com/woman-standing-wearing-jeans-and-white-top-zDyJOj8ZXG0",
        "name": "new blue jeans",
        "color": "blue",
        "quantity": 1,
        "price": 699,
        "productId": "65ae785f0b273b3d680d91b5",
        "__v": 0
      },
    {
    "_id": {
        "$oid": "65bf918445ca5e73629320b1"
    },
    "deviceId": "klch91p4qdr",
    "image": "http://res.cloudinary.com/dzugrk6ni/image/upload/v1706282305/xjaj9lecjywlm6dgvbbo.jpg",
    "name": "New Hoodie Outfit",
    "color": "Gray",
    "quantity": 1,
    "price": 899,
    "productId": "65b3cd3e43143a0bdd0bb30d",
    "__v": 0
}, {
    "_id": {
        "$oid": "65c0e46e8ff8d23c1e05c2b2"
    },
    "deviceId": "klch91p4qdr",
    "image": "https://source.unsplash.com/man-in-white-dress-shirt-with-black-and-white-polka-dots-necktie-WdhmRPvMn7A",
    "name": "full slieve shirts",
    "color": "white",
    "quantity": 3,
    "price": 499,
    "productId": "65ae7554df41a1521b1b788b",
    "__v": 0
}, {
    "_id": {
        "$oid": "65c0ef4a8d2605790344be0e"
    },
    "deviceId": "hha8dz6oskc",
    "image": "http://res.cloudinary.com/dzugrk6ni/image/upload/v1706282305/xjaj9lecjywlm6dgvbbo.jpg",
    "name": "New Hoodie Outfit",
    "color": "Gray",
    "quantity": 1,
    "price": 899,
    "productId": "65b3cd3e43143a0bdd0bb30d",
    "__v": 0
}]
const a ={"asd":"asdf"}

const allData =[]
users.forEach(user => {
    user["cart"]=[]
    carts.forEach(cart => {
        if (user.deviceId == cart.deviceId) {
            user["cart"].push(cart)
        }
    })
    allData.push(user)
});
console.log(allData)