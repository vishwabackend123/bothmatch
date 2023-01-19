import { Component, OnInit } from '@angular/core';
// import jsPDF from 'jspdf';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-matched-coaches',
  templateUrl: './view-matched-coaches.component.html',
  styleUrls: ['./view-matched-coaches.component.scss']
})
export class ViewMatchedCoaches implements OnInit {
  headers: any = ["name", "Position Title", "Position URL", "Organization Name", "Department Name", "Position Start Date", "Position End Date", "Publication Start Date", "Application Close Date"];
  rows: any = ["name", "Position Title", "Position URL", "Organization Name", "Department Name", "Position Start Date", "Position End Date", "Publication Start Date", "Application Close Date"];
  tableHeading : string = "Top Job Matches";
  constructor() { }

  ngOnInit(): void {
  }

  // downloadAsPdf() {
  //   this.exportAsPDF(this.rows);
  // }
  // exportAsPDF(selectedRows: any[] = []) {
  //   let col = this.headers;
  //   let field = this.headers;
  //   let logoImg = environment.imgBaseUrl + "/assets/images/creditcard-logo.jpg";
  //   this.newDownloadPdfFunction(logoImg, 'Your Selection', this.rows, field, col, 'Selcted_Jobs');
  // }
  // newDownloadPdfFunction(logoImg: string, reportTitle: string, reportData: any, selectedFieldName: any, selectedColumn: any, reportName: string) {
  //   let allColumns: any = [];
  //   if (reportData && reportData.length > 0) {
  //     allColumns = Object.keys(reportData[0]);
  //   }
  //   let rows = JSON.parse(JSON.stringify(reportData));
  //   allColumns.forEach((key: any) => {
  //     if (!selectedFieldName.includes(key)) {
  //       rows.forEach((element: any) => {
  //         delete element[key];
  //       });
  //     }
  //   });
  //   let selectedColumns = [];
  //   selectedColumns.push(selectedColumn);

  //   let tblData: any = [];
  //   rows.forEach((row: any) => {

  //     let data: any = [];
  //     selectedFieldName.forEach((key: any) => {
  //       data.push(row[key]);
  //     });
  //     tblData.push(data);
  //   });
  //   let genratedOnDate = new Date().toLocaleString();
  //   var pdf = new jsPDF("landscape")

  //   var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
  //   var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

  //   pdf.setFillColor(51, 204, 204);
  //   pdf.roundedRect(5, 5, (pageWidth - 10), 30, 3, 3, 'F');

  //   pdf.addImage(logoImg, 'jpg', 8, 9, 80, 15);

  //   pdf.text(reportTitle, 12, 30);
  //   pdf.text(this.tableHeading, 130, 18);

  //   pdf.setFontSize(12);
  //   pdf.text("Generated On:", 250, 15);
  //   pdf.setFontSize(10);
  //   pdf.text(genratedOnDate, 250, 20);
  //   (pdf as any).autoTable({
  //     head: selectedColumns,
  //     body: tblData,
  //     startY: 40,
  //     tableWidth: 'auto',
  //     margin: {
  //       top: 5,
  //     },
  //     styles: {
  //       fontSize: 7,
  //       overflow: 'linebreak',
  //     },
  //     theme: 'grid'
  //   });
  //   pdf.save(reportName + '_export_' + new Date().getTime() + '.pdf');
  // }
}
