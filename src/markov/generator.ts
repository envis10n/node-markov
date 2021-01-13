import * as rand from "../rand";

interface ISuffixMap {
  [key: string]: string[];
}

function min(a: number, b: number): number {
  return a < b ? a : b;
}

export class MarkovGenerator {
  public prefixes: string[] = [];
  public suffixes: ISuffixMap = {};
  public generate(length: number): string {
    const res: string[] = [];
    let prefix: string = rand.randomElementSync(this.prefixes);
    let suffix: string;
    res.push(prefix);
    while (res.join(" ").length < length) {
      const suf = this.suffixes[prefix];
      if (suf != undefined) {
        if (suf.length > 1) {
          suffix = rand.randomElementSync(suf);
        } else {
          suffix = suf[0];
        }
        res.push(suffix);
        const t: string[] = prefix.split(" ");
        prefix = `${t[t.length - 1]} ${suffix}`;
      } else {
        prefix = rand.randomElementSync(this.prefixes);
      }
    }
    return res.join(" ");
  }
  public parse(input: string, n: number = 2) {
    const temp: string[] = input.split(/\s/);
    for (let i = 0; i < temp.length; i++) {
      const ix = min(temp.length - 1, i + n);
      const t = temp.slice(i, ix);
      const prefix = t.join(" ");
      if (prefix.length > 0) {
        const suffix = temp[ix];
        if (this.suffixes[prefix] == undefined) this.suffixes[prefix] = [];
        this.suffixes[prefix].push(suffix);
        this.prefixes.push(prefix);
      }
    }
  }
}