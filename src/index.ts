import { MarkovGenerator } from "./markov/generator";

const mg = new MarkovGenerator();

mg.parse("Hello world!\nThis is some input text!");

console.log(mg.prefixes);
console.log(mg.suffixes);

console.log(mg.generate(15));