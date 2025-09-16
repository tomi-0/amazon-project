// import classes to test
import { Product, Appliance, Clothing, products} from "../../data/products.js";




describe ('class suite: Product', () => {
    let product1;

    beforeEach( () => {
        // creates new product
        product1 = new Product ({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
        })
        }
    );

    it('stores the correct porperties', () => {
        expect(product1.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product1.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product1.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product1.rating).toEqual({
            stars: 4.5,
            count: 87
        });
        expect(product1.priceCents).toEqual(1090);
    })

    it('gets the correct price', () => {
        expect(product1.getPrice()).toContain('10.90');
    })

    it('get the correct starts image url', () => {
        expect(product1.getStarsUrl()).toContain('45');
    })

    it('does not display extra info', () => {
        expect(product1.extraInfoHTML()).toEqual('');
    })
}
);



describe ('class suite: Clothing', () => {
    let clothing1;

    beforeEach( () => {
        // creates new product
        clothing1 = new Clothing ({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
            "tshirts",
            "apparel",
            "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        })
        }
    );

    it('stores the correct porperties', () => {
        expect(clothing1.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(clothing1.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
        expect(clothing1.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(clothing1.rating).toEqual({
            stars: 4.5,
            count: 56
        });
        expect(clothing1.priceCents).toEqual(799);
        expect(clothing1.sizeChartLink).toEqual('images/clothing-size-chart.png');
    })

    it('gets the correct price', () => {
        expect(clothing1.getPrice()).toContain('7.99');
    })

    it('get the correct starts image url', () => {
        expect(clothing1.getStarsUrl()).toContain('45');
    })

    it('displays size chart info', () => {
        expect(clothing1.extraInfoHTML()).toContain(`<a href="${clothing1.sizeChartLink}" target="_blank">Size chart</a>`);
    })
}
);



describe ('class suite: Appliance', () => {
    let appliance1;

    beforeEach( () => {
        // creates new product
        appliance1 = new Appliance ({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: "appliance",
        })
        }
    );

    it('stores the correct porperties', () => {
        expect(appliance1.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(appliance1.name).toEqual('2 Slot Toaster - Black');
       
        expect(appliance1.priceCents).toEqual(1899);
        expect(appliance1.instructionsLink).toEqual('images/appliance-instructions.png');
        expect(appliance1.warrantyLink).toEqual('images/appliance-warranty.png');
    })

    it('gets the correct price', () => {
        expect(appliance1.getPrice()).toContain('18.99');
    })

    it('get the correct starts image url', () => {
        expect(appliance1.getStarsUrl()).toContain('50');
    })

    it('displays instructions and warranty info', () => {
        expect(appliance1.extraInfoHTML()).toContain(` <a href="${appliance1.instructionsLink}" target="_blank">Instructions</a>`);
        expect(appliance1.extraInfoHTML()).toContain(`<a href="${appliance1.warrantyLink}" target="_blank">Warranty</a>`);
    })
}
);