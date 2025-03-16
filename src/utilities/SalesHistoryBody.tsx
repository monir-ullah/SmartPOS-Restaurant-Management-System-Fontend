import { Button, Col, Divider, Row, Table } from "antd";
import { useGetSalesHistoryInfoQuery } from "../redux/features/baseApi";
import { useAppSelector } from "../redux/hooks";
import SalesHistoryDateField from "./SalesHistoryDateField";
import type { TableColumnsType } from "antd";
import {
  THistoryDataType,
  TProductSaleDBResponse,
} from "../interface/interface.type";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";

const SalesHistoryBody = () => {
  const pdfExportComponent = useRef<PDFExport>(null);
  const salesQuery = useAppSelector(
    (state) => state.salesHistory.salesHistoryInfo
  );
  const {
    data: salesHistoryInfoData,
    error,
    isLoading,
  } = useGetSalesHistoryInfoQuery(salesQuery);

  if (error) {
    return <p>Something Wrong</p>;
  }

  if (isLoading) {
    return (
      <>
        <h4 style={{ marginBlock: "5px" }}>Sales History</h4>
        <SalesHistoryDateField />
      </>
    );
  }

  const mongoDBData = salesHistoryInfoData?.data[0]?.data;
  const finalTotalQuantitySold =
    salesHistoryInfoData?.data[0]?.finalTotalQuantitySold;
  const finalTotalPrice = salesHistoryInfoData?.data[0]?.finalTotalPrice;

  let dataInfo = [];

  if (mongoDBData) {
    dataInfo = mongoDBData.map((item: TProductSaleDBResponse) => ({
      key: item._id.productId,
      productName: item._id.productName,
      totalQuantitySold: item.totalQuantitySold,
      totalSoldPrice: item.totalSoldPrice.toFixed(2),
    }));
  }

  const columns: TableColumnsType<THistoryDataType> = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Total Quantity Sold",
      dataIndex: "totalQuantitySold",
      key: "totalQuantitySold",
      responsive: ["md"],
    },
    {
      title: "Total Sold Price",
      dataIndex: "totalSoldPrice",
      key: "productId",
      responsive: ["lg"],
    },
  ];

  // export pdf functionality
  const exportPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  return (
    <div>
      <PDFExport ref={pdfExportComponent} margin={20} paperSize="A4">
        <Row style={{ justifyContent: "space-between" }}>
          <Col style={{ marginBottom: "10px" }}>
            <h4 style={{ marginBlock: "5px" }}>Sales History</h4>
            <SalesHistoryDateField />
          </Col>
          <Col style={{ display: "flex", gap: 20 }}>
            <div className="total-quantity-price">
              <p>Total Quantity Sold </p>
              <h4 style={{ margin: "5% 0%" }}>
                {finalTotalPrice ? "$" + Number(finalTotalPrice).toFixed(2) : 0}
              </h4>
            </div>

            <div className="total-quantity-price">
              <p>Total Quantity Sold: </p>
              <h4 style={{ margin: "5% 0%" }}>
                {finalTotalQuantitySold ? finalTotalQuantitySold : 0}
              </h4>
            </div>
          </Col>
        </Row>

        <Divider />
        <Table
          columns={columns}
          dataSource={dataInfo}
          pagination={{ pageSize: 6 }}
        />
      </PDFExport>

      <Button type="primary" onClick={exportPDF}>
        Export PDF
      </Button>
    </div>
  );
};

export default SalesHistoryBody;
