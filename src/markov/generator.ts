import * as rand from "../rand";

export interface ISuffixMap {
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
    while (res.length < length) {
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
    const inp: string[] = input.replace(/\r\n/g, '\n').split(" ");
    const temp: string[] = [];
    for (let t of inp) {
      const reg = /\s/;
      if (reg.test(t)) {
        let m = reg.exec(t);
        let nm = "";
        while (m != null) {
          const a = t.substring(0, m.index);
          t = t.substring(m.index + 1);
          temp.push(nm + a);
          nm = m[0];
          m = reg.exec(t);
        }
        if (t.length > 0) temp.push(t);
      } else {
        temp.push(t);
      }
    }
    for (let i = 0; i < temp.length; i++) {
      const ix = min(temp.length - 1, i + n);
      const t = temp.slice(i, ix);
      const prefix = t.join(" ");
      if (prefix.length > 0 && t.length == n) {
        const suffix = temp[ix];
        if (this.suffixes[prefix] == undefined) this.suffixes[prefix] = [];
        this.suffixes[prefix].push(suffix);
        this.prefixes.push(prefix);
      }
    }
  }
}