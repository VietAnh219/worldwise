import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";
import styles from "./DatePicker.module.css"

const MyDatePicker = ({ value, onChange, disable, datePlc }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const CustomInput = React.forwardRef(({ value, onClick, disable, datePlc }, ref) => (
        <div
            className={styles.inputContainer}
            onClick={!disable ? onClick : undefined}
            ref={ref}
        >
            <input
                type="text"
                value={value}
                readOnly
                placeholder={datePlc ? datePlc : "Ngày tải tài liệu"}
                className={styles.customInput}
            />
            <IoCalendarOutline className={styles.calendarIcon} />
        </div>
    ));

    return (
        <DatePicker
            // selected={selectedDate}
            // onChange={(date) => setSelectedDate(date)}
            selected={value}
            onChange={onChange} // Truyền ngày ra ngoài
            dateFormat="dd/MM/yyyy"
            customInput={<CustomInput disable={disable} datePlc={datePlc} />}
            showYearDropdown  // Hiển thị dropdown chọn năm
            showMonthDropdown // Hiển thị dropdown chọn tháng
            dropdownMode="select" // Chế độ chọn dropdown
        />
    );
};

export default MyDatePicker;
