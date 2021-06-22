export class HelperRegex {
  public static readonly REG_NAME: RegExp = /^[\p{L}\s]{1,30}$/u;
  public static readonly REG_USERNAME: RegExp = /^[\w\d]{5,20}$/;
  public static readonly REG_NAME_PRODUCT: RegExp = /^[\p{L}\d.\s]{1,100}$/u;
  public static readonly REG_MID_NAME: RegExp = /^[\p{L}\s]{0,30}$/u;
  public static readonly REG_ADDRESS: RegExp = /^[\p{L}\s\d.\-,@/\\]{4,200}$/u;
  public static readonly REG_EMAIL: RegExp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static readonly REG_ID_CARD: RegExp = /^[\p{L}\s\d]{9,20}$/u;
  public static readonly REG_PHONE: RegExp = /^([+|0])(\d){8,30}$/;
  public static readonly REG_NUMBER: RegExp = /^\d+$/;
  public static readonly REG_NUMBER_FLOAT: RegExp = /^[+-]?([0-9]*[.])?[0-9]+$/;
  public static readonly REG_NUMBER_FLOAT_LARGER_OR_EQUAL_ZERO: RegExp = /^([0-9]*[.])?[0-9]+$/;
  public static readonly REG_SEARCH: RegExp = /^[\p{L}\s\d]{0,50}$/u;
  public static readonly REG_DATE: RegExp = /^([0][1-9]|[1|2][0-9]|[3][0|1])[.\\/-]([0]?[1-9]|[1][0-2])[.\\/-]([0-9]{4})$/;
  public static readonly REG_PASS: RegExp = /^([\d\w!@#]){8,20}$/;
}
