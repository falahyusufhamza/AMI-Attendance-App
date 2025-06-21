import { Card } from 'antd'
import React from 'react'

export const ClassCard = ({
    classAttendanceId,
    index,
    classId,
    className,
    date,
    onClickMarkAttendance = () => {},
}) => {
  return (
    <Card key={index} title={className} extra={<div onClick={() => onClickMarkAttendance(classAttendanceId, date, classId)} >Mark Attendance</div>}>
        <p>Session Date: {date} </p>
    </Card>
  )
}

