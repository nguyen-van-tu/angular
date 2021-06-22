import { Sort } from "./sort";
import * as dayjs from "dayjs";

export class FuncHelper {
  public static getArraySort(sort: Sort[], currentElement: any): Sort[] {
    let ind = sort.findIndex((elm) => elm.property === currentElement.active);
    if (ind === -1) {
      sort.push(new Sort(currentElement.active, "asc"));
    } else if (sort[ind].direction === "asc") {
      sort[ind] = new Sort(currentElement.active, "desc");
    } else {
      sort.splice(ind, 1);
    }
    if (sort.length === 0) {
      sort.push(new Sort("userName", "asc"));
    } else {
      ind = sort.findIndex((elm) => elm.property === "userName");
      if (ind !== -1) {
        sort.splice(ind, 1);
      }
    }
    return sort;
  }

  public static validate(date, format): boolean {
    return dayjs(date, format).format(format) === date;
  }
}
