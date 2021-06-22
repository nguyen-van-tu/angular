import { MatDateFormats, NativeDateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  public format(date: Date, displayFormat: string): string {
    if (displayFormat === "input") {
      let day: string = date.getDate().toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? "0" + month : month;
      const year = date.getFullYear();
      
      if (document.getElementById("languageVietnamese")) {
        return `${day}-${month}-${year}`;
      }
      if (document.getElementById("languageEnglish")) {
        return `${year}-${month}-${day}`;
      } 
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};
