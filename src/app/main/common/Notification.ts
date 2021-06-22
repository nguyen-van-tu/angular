import Notiflix from "notiflix";

export class Notification {
  static showWaiting(title = "Please wait..."): void {
    Notiflix.Loading.Circle(title);
  }

  static showWaitingBlock(selector: string, title = "Please wait..."): void {
    Notiflix.Block.Init({
      backgroundColor: "rgba(0,0,0,0.8)",
      messageColor: "#dcdcdc",
      svgColor: "#38c785",
    });
    Notiflix.Block.Circle(selector, title);
  }

  static showSuccess(title, content = "", nameButton = "click"): void {
    Notiflix.Loading.Remove();
    Notiflix.Report.Success(title, content, nameButton);
  }

  static showErrorStatus(err): void {
    Notiflix.Loading.Remove();
    Notiflix.Report.Failure(err.status + " " + err.error, "Ok");
  }

  static showErrorMessage(err, message): void {
    Notiflix.Loading.Remove();
    Notiflix.Report.Failure(err, message);
  }

  static clearWaitNoMessage(): void {
    Notiflix.Loading.Remove();
  }

  static clearWaitBlockNoMessage(selector: string): void {
    Notiflix.Block.Remove(selector);
  }
}
