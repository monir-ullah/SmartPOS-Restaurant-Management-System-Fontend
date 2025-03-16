/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import type PickerType from "antd";

const { RangePicker } = DatePicker;
import weekOfYear from "dayjs/plugin/weekOfYear";
import { historyDateFormatting } from "./historyDateFormatting";
import { useAppDispatch } from "../redux/hooks";
import { salesHistoryInfo } from "../redux/features/salesHistory/salesHistorySlice";
dayjs.extend(weekOfYear);
const { Option } = Select;

type PickerType = "date" | "week" | "month" | "year" | "range";

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
  if (type === "date") return <DatePicker onChange={onChange} />;
  if (type === "range")
    return <RangePicker onChange={onChange as any} picker="date" />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const SalesHistoryDateField = () => {
  // Setting type for
  const [type, setType] = useState<PickerType>("date");

  // dispatch function from redux
  const dispatch = useAppDispatch();

  return (
    // Selecting date, week, month, year, and date range for generating sales history. based on selected data
    <Space>
      <Select value={type} onChange={setType} style={{ width: "120px" }}>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
        <Option value="range">Range Picker</Option>
      </Select>
      <PickerWithType
        type={type}
        onChange={(_value, dateString) => {
          const salesHistoryDate = historyDateFormatting(type, dateString);
          dispatch(salesHistoryInfo(salesHistoryDate)); // Dispatching data for redux state so that i can get teh type and date in the sales history body components
        }}
      />
    </Space>
  );
};

export default SalesHistoryDateField;
