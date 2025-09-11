class Car {
    brand;
    model;
    speed = 0;
    isTrunkOpen=false;

    constructor(carDetails) {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }

    displayInfo(){
        console.log(`${this.brand} : ${this.model}, ${this.speed}km/h \nTrunck Open: ${this.isTrunkOpen}`)
    }

    go() {
        if (!this.isTrunkOpen) {
            if ( this.speed+5 <= 200 && this.speed+5 >= 0) {
                this.speed += 5;
            }
        }
    }

    brake() {
        if ( this.speed-5 <= 200 && this.speed-5 >= 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        if ( this.speed+this.acceleration <= 400 && this.speed+this.acceleration >= 0) {
            this.speed += this.acceleration;
        }
    }

    openTrunk() {}

    closeTrunk() {}

}

// Exercise 17a
const car1 = new Car({
    brand:'Toyota',
    model: 'Land Cruise',
});

const car2 = new Car({
    brand:'Mercedes',
    model: 'S Class',
});

console.log(car1);
console.log(car2);



// Exercise 17c
car1.go();
car1.go();
car1.go();
car2.brake();

// Exercise 17d
car1.openTrunk();
car2.openTrunk();

// Exercise 17b
car1.displayInfo();
car2.displayInfo();

// Exercise 17e
const car3 = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20,
});

car3.go();
car3.openTrunk();
car3.displayInfo();