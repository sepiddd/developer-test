import Loki from "lokijs";

export type Review = {
  // Name of the restaurant
  name: string;
  // Text of the actual review
  text: string;
  // Picture url
  url?: string;
  // Rating of the restaurant
  stars: 1 | 2 | 3 | 4 | 5;
};

declare global {
  var __DATABASE__: Loki;
}

export const reviewsFixture: Review[] = [
  {
    name: "Maxim's",
    text: "The façade has undergone renovations since my last visit. The food, sadly, not.",
    stars: 1,
  },
  {
    name: "Lasserre",
    text: "The facade has not changed since my last visit. The tarte alsacienne has changed. This is what matters.",
    stars: 4,
  },
  {
    name: "Lucas",
    text: "While they claim to be haute cuisine, most of what comes out of the kitchen could be eaten at every other gas station.",
    stars: 2,
  },
  {
    name: "Ledoyen",
    text: "Nice restaurant, even though the Michelin already has been throwing three stars at them.",
    stars: 5,
  },
];

const initializeDb = () => {
  if (!global.__DATABASE__) {
    global.__DATABASE__ = new Loki("duchedb");
  }
  const Review = global.__DATABASE__.addCollection<Review>("reviews");

  Review.on("insert", (input) => {
    input.id = input.$loki;
  });

  // not inserting them at once because otherwise the .on even doesn't fire
  reviewsFixture.map((fixture) => Review.insert(fixture));

  return {
    review: Review,
  };
};

export default initializeDb();
