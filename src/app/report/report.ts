/**
 * Created by jianggk on 2017/2/17.
 */
export  class Report{
   sql:string;
   fields:ReportField[];
   params:Param[];
   chart:Chart;
   dblClkReport:Report;
   dblClkReportParamFiledName:{fieldName:string,paraName:string};//参数值的字段名，参数名
   parentReport:Report;//如果是子报表，指向上层报表，用于返回。
   isShow:boolean;//是否可以直接显示。
}

export class Param{
  name:string;
  label:string;
  type:string;//number,string.
  optionUrl:string;//优先
  optionSql:string;
  //getOptions():Map{  return null;  }
}

export class ReportField{
    header:string;
    fieldName:string;
    footer:string;//sum,count,formula,const
    rank:{red:number,blue:number};//是否安排名标红标红绿，负数表示倒排。
}

export class Chart{

}
