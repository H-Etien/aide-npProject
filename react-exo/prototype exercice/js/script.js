function userCreator(name, score) {
    const newUser = {};
    newUser.name = name;
    newUser.score = score;
    newUser.increment = function(){
        newUser.score++;
    }

    return newUser;
}

const userFunctionStore = {
    inc : function(){
        this.score++;
    }
}

const user1 = userCreator("phil", 55);

console.log(user1)
user1.increment()
console.log(user1)
user1.inc()
console.log(user1)


