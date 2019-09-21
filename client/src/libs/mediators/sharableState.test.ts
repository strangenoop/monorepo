import { SharableState } from "./sharableState";

let firstName = "Joanne";

const name = new SharableState({
  first: "",
  middle: "",
  last: ""
});

// expect(name.view().first).toBe("");
// expect(firstName).toBe("Joanne");

name.subscribe(state => {
  firstName = state.first;
});

// expect(name.view().first).toBe("");
// expect(firstName).toBe("");

name.update(name => ({ ...name, first: "Justin" }));

// expect(name.view().first).toBe("Justin");
// expect(firstName).toBe("Justin");

// ********
// QUESTION: How is this different than an Observable?
