import React, { useEffect, useState } from 'react'

import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import StudentsTable from './students-table/StudentsTable';
import { DatePicker, FloatButton, message, Row } from 'antd';
import {Layout} from 'antd';
import './attendance-page.css'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URLS } from '../constants';
import { classStudentsSerializer, validateAttendanceCompletion } from '../helpers';

const {Header, Content} = Layout;

export default function AttendancePage({classAttendanceDetails}) {
  const [attendanceState, setAttendanceState] = useState([]);

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {    
    if (!classAttendanceDetails?.classAttendanceId) {
      return navigate('/');
    }
    setIsLoading(true);
    axios.get(API_URLS.GET_CLASS_STUDENTS,{
      params: {
        classId: classAttendanceDetails?.classId,
      }
    }).then((response) => {
      if (response?.status === 200) {
        setStudents(classStudentsSerializer(response?.data?.data || []));
      } else {
        message.error('Failed to fetch class students');
      }
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.error('Error fetching class students:', error);
      message.error('An error occurred while fetching class students. Please try again.');
    });
  }, [classAttendanceDetails, navigate]);

  useEffect(() => {
    setAttendanceState(students.map((item) => ({
      ...item,
      key: item?.id,
      status: '',
      remarks: '',
    })));
  }, [students]);

  const onUpdateAttendance = () => {
    const isComplete = validateAttendanceCompletion(attendanceState);
    if (!isComplete) {
      message.error('Please mark attendance for all students before submitting.');
      return;
    }
    const data = {
      attendance: attendanceState,
      classAttendanceId: classAttendanceDetails?.classAttendanceId, 
      classId: classAttendanceDetails?.classId,
      date: classAttendanceDetails?.date,
    };
    axios.post(API_URLS.MARK_ATTENDANCE, data).then((response) => {
      if (response?.data?.success === true) {
        message.success('Attendance marked successfully!');
        navigate('/');
      } else {
        message.error('Failed to mark attendance!');
      }
    }).catch((error) => {
      console.error('Error marking attendance:', error);
      message.error('An error occurred while marking attendance. Please try again.');
    });
  }

  return (
  <Content className='content-container'>
  <div className='attendance-date-container'><b>Submitting for: </b> &nbsp; {classAttendanceDetails?.date}</div>
  <div className='status-helpers'>
    <span className='status-helper'><CheckCircleFilled style={{color: 'green'}}/> &nbsp; Present</span>
    <span className='status-helper'><CheckCircleFilled style={{color: 'red'}}/> &nbsp; Late</span>
    <span className='status-helper'><CloseCircleFilled style={{color: 'orange'}}/> &nbsp; Leave</span>
    <span className='status-helper'><CloseCircleOutlined style={{color: 'crimson'}}/> &nbsp; Absent</span>
  </div>
    <div className='attendance-table-container'>
      <StudentsTable data={attendanceState} setAttendance={setAttendanceState} isLoading={isLoading} />
      <FloatButton
      onClick={onUpdateAttendance}
      className='save-button'
      shape="square"
      type="primary"
      style={{
        insetInlineEnd: 24,
      }}
      icon={<SaveOutlined/>}
    />
    </div>
    </Content>
  )
}
